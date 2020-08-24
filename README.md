# MISO4208_PWA_Taller_uno
## Angela Suárez.
## Código : 201612007

## 1. Link de Demo

https://miso-4208-angela-taller-1.web.app/

## 2. Parte 2

### 2.1 Reporte de Lighthouse antes de implementar funcionalidades.
A continuación, se muestran las imágenes del reporte creado por Lighthouse antes de hacerle alguna modificación al código

#### Aplicación funcionando: 
![](https://github.com/amsuarezp18/MISO4208_PWA_Taller_uno/blob/master/support/Screenshot%20from%202020-08-19%2021-09-38.png)
***
#### Reporte de Lighthouse, vista general
![](https://github.com/amsuarezp18/MISO4208_PWA_Taller_uno/blob/master/support/Screenshot%20from%202020-08-19%2021-23-35.png)
***
#### Reporte de Lighthouse, Performance
![](https://github.com/amsuarezp18/MISO4208_PWA_Taller_uno/blob/master/support/Screenshot%20from%202020-08-19%2021-23-47.png)
***
#### Reporte de Lighthouse, Accessibility
![](https://github.com/amsuarezp18/MISO4208_PWA_Taller_uno/blob/master/support/Screenshot%20from%202020-08-19%2021-23-59.png)
![](https://github.com/amsuarezp18/MISO4208_PWA_Taller_uno/blob/master/support/Screenshot%20from%202020-08-19%2021-24-14.png)
***
#### Reporte de Lighthouse, Best Practices
![](https://github.com/amsuarezp18/MISO4208_PWA_Taller_uno/blob/master/support/Screenshot%20from%202020-08-19%2021-24-26.png)
***
#### Reporte de Lighthouse, SEO
![](https://github.com/amsuarezp18/MISO4208_PWA_Taller_uno/blob/master/support/Screenshot%20from%202020-08-19%2021-24-36.png)
***
#### Reporte de Lighthouse, Progressive Web App
![](https://github.com/amsuarezp18/MISO4208_PWA_Taller_uno/blob/master/support/Screenshot%20from%202020-08-19%2021-24-49.png)
![](https://github.com/amsuarezp18/MISO4208_PWA_Taller_uno/blob/master/support/Screenshot%20from%202020-08-19%2021-24-58.png)
![](https://github.com/amsuarezp18/MISO4208_PWA_Taller_uno/blob/master/support/Screenshot%20from%202020-08-19%2021-25-10.png)

***

### 2.2. Reporte de Lighthouse después de implementar funcionalidades
A continuación, se muestran los resultados obtenidos luego de implementar las funcionalidades requeridas. Sin embargo, los reportes de "Perfomance" y "Best practices" no se añaden debido a que antes de realizar alguna modificación al código, estos ya se encontraban en el 100% como se puede observar en las imagenes de "Reporte de Lighthouse antes de implementar funcionalidades".

#### Reporte de Lighthouse, vista general
![](https://github.com/amsuarezp18/MISO4208_PWA_Taller_uno/blob/master/support/Screenshot%20from%202020-08-21%2018-51-21.png)
***
La imagen no se observa bien, sin embargo dice: Fast and reliable 3/3, installable 3/3, PWA optimizade 8/8 
![](https://github.com/amsuarezp18/MISO4208_PWA_Taller_uno/blob/master/support/Screenshot%20from%202020-08-21%2018-53-24.png)
#### Reporte de Lighthouse, Accessibility
![](https://github.com/amsuarezp18/MISO4208_PWA_Taller_uno/blob/master/support/Screenshot%20from%202020-08-21%2018-59-36.png)

#### Reporte de Lighthouse, SEO
![](https://github.com/amsuarezp18/MISO4208_PWA_Taller_uno/blob/master/support/Screenshot%20from%202020-08-21%2017-40-47.png)
***
#### Reporte de Lighthouse, Progressive Web App
![](https://github.com/amsuarezp18/MISO4208_PWA_Taller_uno/blob/master/support/Screenshot%20from%202020-08-21%2018-51-47.png)
![](https://github.com/amsuarezp18/MISO4208_PWA_Taller_uno/blob/master/support/Screenshot%20from%202020-08-21%2018-51-39.png)


### 3. Funcionalidades PWA

#### F1: Agregue el código necesario para inyectar datos en el primer reload del cliente (provenientes del API mencionado anteriormente). Recuerde diferenciar el primer reload al resto.
La primera vez que se hace reload la información proviene del API y no del cache. En este ejemplo, el usuario tiene guardada la estación Châtelet, al momento del primer reload las estación se actualiza con la información del del api y no la del cache, como se muestran en las dos imágenes a continuación.<br>

![](https://github.com/amsuarezp18/MISO4208_PWA_Taller_uno/blob/master/support/Screenshot%20from%202020-08-21%2017-28-56.png)

#### F2: Cada vez que el usuario agrega una nueva estación, esta debe ser guardada con IndexDB
Para hacer uso de IndexedDB se realizó el tutorial de MDN, que se puede encontrar en [este enlace](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB)

![](https://github.com/amsuarezp18/MISO4208_PWA_Taller_uno/blob/master/support/prueba1.gif)
***
![](https://github.com/amsuarezp18/MISO4208_PWA_Taller_uno/blob/master/support/caindex.gif)

#### F3: ServiceWorker para guardar en el cache la App Shell.
El primer paso para completar esta funcionalidad fue registrar el serviceWorker. Posteriormente, se creó un ServiceWorker en una clase llamada service-worker.js con el fin de almacenar en caché el shell de la aplicación y los datos de la aplicación, de modo que estén disponibles incluso cuando la red no lo esté. 
![](https://github.com/amsuarezp18/MISO4208_PWA_Taller_uno/blob/master/support/cacheoff.gif)

### F4: ServiceWorker para guardar en cache los datos de los horarios de cada estación
![](https://github.com/amsuarezp18/MISO4208_PWA_Taller_uno/blob/master/support/final.gif)

#### F5: Realice las modificaciones necesarias para integrar nativamente las aplicaciones a Android y iOS.
* Android : <br>
![](https://github.com/amsuarezp18/MISO4208_PWA_Taller_uno/blob/master/support/android.jpg)
* iOS : <br>
![](https://github.com/amsuarezp18/MISO4208_PWA_Taller_uno/blob/master/support/Screenshot%20from%202020-08-21%2018-12-21.png)

#### F6: Despliegue su aplicación en Glitch o Firebase.
La aplicación fue desplegada en firebase.
***
![](https://github.com/amsuarezp18/MISO4208_PWA_Taller_uno/blob/master/support/Screenshot%20from%202020-08-21%2017-28-25.png)



