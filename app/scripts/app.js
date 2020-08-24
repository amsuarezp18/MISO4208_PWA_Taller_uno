(function () {
    'use strict';

    var app = {
        isLoading: true,
        visibleCards: {},
        selectedTimetables: [],
        spinner: document.querySelector('.loader'),
        cardTemplate: document.querySelector('.cardTemplate'),
        container: document.querySelector('.main'),
        addDialog: document.querySelector('.dialog-container')
    };

    
    var DB_NAME = 'metro-indexeddb';
	var DB_VERSION = 2;
	var DB_STORE_NAME = 'metro';
    var db;
    

    /*****************************************************************************
     *
     * Event listeners for UI elements
     *
     ****************************************************************************/

    document.getElementById('butRefresh').addEventListener('click', function () {
        // Refresh all of the metro stations
        app.updateSchedules();
    });

    document.getElementById('butAdd').addEventListener('click', function () {
        // Open/show the add new station dialog
        app.toggleAddDialog(true);
    });

    document.getElementById('butAddCity').addEventListener('click', function () {


        var select = document.getElementById('selectTimetableToAdd');
        var selected = select.options[select.selectedIndex];
        var key = selected.value;
        var label = selected.textContent;
        if (!app.selectedTimetables) {
            app.selectedTimetables = [];
        }
        app.getSchedule(key, label);
        app.selectedTimetables.push({key: key, label: label});
        app.saveTimeTables({key: key, label: label});
        app.toggleAddDialog(false);
    });

    document.getElementById('butAddCancel').addEventListener('click', function () {
        // Close the add new station dialog
        app.toggleAddDialog(false);
    });


    /*****************************************************************************
     *
     * Methods to update/refresh the UI
     *
     ****************************************************************************/

    // Toggles the visibility of the add new station dialog.
    app.toggleAddDialog = function (visible) {
        if (visible) {
            app.addDialog.classList.add('dialog-container--visible');
        } else {
            app.addDialog.classList.remove('dialog-container--visible');
        }
    };

    // Updates a timestation card with the latest weather forecast. If the card
    // doesn't already exist, it's cloned from the template.

    app.updateTimetableCard = function (data) {
        var key = data.key;
        var dataLastUpdated = new Date(data.created);
        var schedules = data.schedules;
        var card = app.visibleCards[key];

        if (!card) {
            var label = data.label.split(', ');
            var title = label[0];
            var subtitle = label[1];
            card = app.cardTemplate.cloneNode(true);
            card.classList.remove('cardTemplate');
            card.querySelector('.label').textContent = title;
            card.querySelector('.subtitle').textContent = subtitle;
            card.removeAttribute('hidden');
            app.container.appendChild(card);
            app.visibleCards[key] = card;
        }
        card.querySelector('.card-last-updated').textContent = data.created;

        var scheduleUIs = card.querySelectorAll('.schedule');
        for(var i = 0; i<4; i++) {
            var schedule = schedules[i];
            var scheduleUI = scheduleUIs[i];
            if(schedule && scheduleUI) {
                scheduleUI.querySelector('.message').textContent = schedule.message;
            }
        }

        if (app.isLoading) {
            app.spinner.setAttribute('hidden', true);
            app.container.removeAttribute('hidden');
            app.isLoading = false;
        }
    };

    /*****************************************************************************
     *
     * Methods for dealing with the model
     *
     ****************************************************************************/


    app.getSchedule = function (key, label) {
        var url = 'https://api-ratp.pierre-grimaud.fr/v3/schedules/' + key;

        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState === XMLHttpRequest.DONE) {
                if (request.status === 200) {
                    var response = JSON.parse(request.response);
                    var result = {};
                    result.key = key;
                    result.label = label;
                    result.created = response._metadata.date;
                    result.schedules = response.result.schedules;
                    app.updateTimetableCard(result);
                }
            } else {
                // Return the initial weather forecast since no data is available.
                app.updateTimetableCard(initialStationTimetable);
            }
        };
        request.open('GET', url);
        request.send();
    };

    // Iterate all of the cards and attempt to get the latest timetable data
    app.updateSchedules = function () {
        var keys = Object.keys(app.visibleCards);
        keys.forEach(function (key) {
            app.getSchedule(key);
        });
    };

    /*
     * Fake timetable data that is presented when the user first uses the app,
     * or when the user has not saved any stations. See startup code for more
     * discussion.
     */

    var initialStationTimetable = {

        key: 'metros/1/bastille/A',
        label: 'Bastille, Direction La Défense',
        created: '2017-07-18T17:08:42+02:00',
        schedules: [
            {
                message: '0 mn'
            },
            {
                message: '2 mn'
            },
            {
                message: '5 mn'
            }
        ]


    };

    //Using INDEXDB 

	var openDb = (function() {
        // Opening the database
        var req = indexedDB.open(DB_NAME, DB_VERSION);
        
        //Generating handlers
		req.onsuccess = function (evt) {
			db = this.result;
			getDataIndexDB();
        };
        //Handling Errors
		req.onerror = function (evt) {
			console.error("openDb:", evt.target.errorCode);
		};

        // Updating the version of the database
		req.onupgradeneeded = function (evt) {
			var store = evt.currentTarget.result.createObjectStore(
				DB_STORE_NAME, { keyPath: 'id', autoIncrement: true }
			);
			store.createIndex('key', 'key', { unique: false });
			store.createIndex('label', 'label', { unique: false });
		};
	})();
	
	var getDataIndexDB = function() {
		var store = objectsToSave(DB_STORE_NAME, 'readonly');
		var req;
		req = store.count();
		req.onsuccess = function(evt) {
			console.log('There are ' + evt.target.result +' record(s) in the object store.');
		};
		req.onerror = function(evt) {
			console.error("add error", this.error);
		};
		
		var i = 0;
		req = store.openCursor();
		req.onsuccess = function(evt) {
			var cursor = evt.target.result;
			if (cursor) {
				req = store.get(cursor.key);
				req.onsuccess = function (evt) {
					var value = evt.target.result;
					app.selectedTimetables.push({
						key: value.key, label: value.label
					});
				};
				cursor.continue();
				i++;
			} else {
				if(i === 0) {
                    app.updateTimetableCard(initialStationTimetable);
                    app.selectedTimetables = [
                        {key: initialStationTimetable.key, label: initialStationTimetable.label}
                    ];
					app.saveTimeTables(
						{key: initialStationTimetable.key, label: initialStationTimetable.label}
					);
				}
				else {
					console.log(app.selectedTimetables);
					app.selectedTimetables.forEach(function(schedule) {
                        app.getSchedule(schedule.key, schedule.label);
					});
				}
			}
		};
	};
	
	function objectsToSave(store_name, mode) {
		var tx = db.transaction(store_name, mode);
		return tx.objectStore(store_name);
    }

    app.saveTimeTables = function(obj) {
		var store = objectsToSave(DB_STORE_NAME, 'readwrite');
		var req;
		try {
			req = store.add(obj);
		} catch (e) {
			if (e.name == 'DataCloneError'){
				console.log("Error en DataCloneError");
			}
		}

		req.onsuccess = function (evt) {
			console.log("The object was insert into DB");
		};
		req.onerror = function() {
			console.error("addPublication error", this.error);
		};
	};


    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
        .register('./service-worker.js')
        .then(function() { 
            console.log('Service Worker is registered'); 
        });
    }

})();
