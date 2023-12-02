
### Descripción:
Tener una aplicación web en lugar de usar hojas de Excel para administrar pedidos es una decisión inteligente para cualquier empresa. Primero, mejora la eficiencia: una aplicación web puede automatizar procesos, reducir errores humanos y procesar datos más rápido que el manejo manual en Excel. Ofrece mejor accesibilidad y colaboración; los empleados pueden acceder y actualizar la información en tiempo real desde cualquier lugar lo que es crucial en el mundo conectado de hoy. 

También, una aplicación web permite una mejor integración con otros sistemas y bases de datos, facilitando la expansión y adaptación a medida que crece la empresa. 

Por último, mejora la seguridad de los datos, algo crítico en la era digital, ya que ofrece mejores herramientas para controlar el acceso y proteger la información sensible. En resumen, pasar de Excel a una aplicación web es un paso esencial para modernizar y optimizar las operaciones de una empresa.

### Problema Identificado:
 Actualmente la empresa tiene 3 personas que llevan el control de todos los pedidos en una hoja de cálculo en Google Sheets. En esta hoja actualizan el estado, los montos, el número de la factura, entre otros datos.
 
El principal problema de esto es que es difícil para quienes lo manejan poder identificar de manera sencilla cosas como: cuantos pedidos están pendientes, los montos de IVA que tienen que pagar cada mes, descargar la lista a Excel, supervisar los pedidos pendientes que han sido creados hace más de 7 días para darles prioridad, entre otro tipo de métricas.


### Solución propuesta:

La solución para la problemática de Pins de México es una aplicación web en la que se pueda llevar el manejo de las ordenes que se van generando.

En esta aplicación se pueden dar de alta nuevas órdenes, editarlas y llevar un control mediante métricas de el estatus y los ingresos de los últimos 30 días.

También se pueden exportar los datos a Excel fácilmente desde un botón.

### Arquitectura

La aplicación esta desarrollada con Angular para el lado del cliente y con .NET 6 para el backend. 

Para la autenticación tiene integración con el servicio de Auth0 para que el usuario pueda entrar con su cuenta de Google. 

Del lado del servidor esta utilizando Microsoft Azure como infraestructura, así mismo Azure SQL para la base de datos.

![image](https://github.com/davidsalazar6/webapp-pinsdemexico/assets/47126270/f26c2205-a35b-41d9-b023-4a002786449a)


## Requerimientos:

La infraestructura de la aplicación utiliza Microsoft Azure, tanto el servidor como la base de datos.

Para el desarrollo de la aplicación es necesario instalar el SDK de .NET, así como el Angular CLI, una versión LTS de Node y un IDE como puede ser VS Code o Visual Studio.

Se puede usar Windows, MAC o Linux.


## Instalación:
**¿Cómo instalar el ambiente de desarrollo?**
- Instalar VS Code, y Visual Studio.
- Instalar Node y Angular CLI.
- Clonar el repositorio desde Github el branch de develop o main.
- Para el proyecto de Angular es necesario ejecutar el npm install para que se instalen los node_modules.
- Para el proyecto de .NET es necesario tener instalado el SDK de .NET que pueden ser descargados del instalador de Visual Studio al momento de instalar.

**¿Cómo implementar la solución en producción en un ambiente local o en la nube como Heroku?**

Al momento de hacer un commit al repositorio, se dispara una acción en el pipeline de CI/CD y esto hara que la aplicación desplegada en Azure se actualice con los últimos cambios.

## Configuración:
**Configuración del producto (archivos de configuración).** N/A

**Configuración de los requerimientos.** N/A

## Uso:

Para usar la aplicación es necesario acceder a https://red-glacier-0eeeea010.3.azurestaticapps.net/home y contar con una cuenta de Google o de Microsoft.

Una vez hecho el login con alguno de estos métodos, tendrá acceso a la aplicación, donde se pueden comenzar a crear o editar pedidos desde el listado de pedidos.

Al hacer click en el botón de 'Nuevo pedido' se mostrará un formulario para dar de alta una nueva orden.

Para editar un pedido, es necesario hacer click en el nombre del pedido correspondiente en el listado de pedidos.

Al hacer click en el botón de 'Exportar a Excel' se podrá visualizar en una hoja de Excel el detalle del listado de pedidos.

En la parte superior del dashboard, se pueden ver 6 métricas que calculan el estatus y ciertos parámetros de los últimos 30 días.

## Contribución:
Guía de contribución para usuarios.
Debe contar con pasos específicos para clonar repositorio, crear un nuevo branch, enviar el pull request, esperar a hacer el merge.


**Clonar Repositorio**: 

Para descargar una copia del repositorio existente en tu máquina local y comenzar a trabajar en el proyecto, puedes hacerlo haciendo click en Clone en el repositorio del proyecto. Existen diversos IDE's que permiten clonar el repositorio si provees el link del mismo.

**Crear un Nuevo Branch**: 

Crear una rama aparte del branch principal para realizar cambios específicos. Esto ayuda a mantener organizado el trabajo y separa tus cambios de la línea principal de desarrollo.

**Enviar el Pull Request**:

Una vez que terminas los cambios en tu branch, envía un pull request al repositorio original para que revisen y potencialmente integren tus cambios en el branch principal.

**Esperar a hacer el Merge**: 

Tras enviar el pull request, debes esperar a que el equipo de desarrollo revise tus cambios. Si todo está correcto y aprueban los cambios, se realizará el merge, integrando tus aportes en el branch principal.

## Roadmap:

- Se tiene planeado que en el futuro esa aplicación sea capaz de generar reportes más complejos como por ejemplo, para el cálculo de los impuestos a pagar por los ingresos del último mes.

- También se planea soportar la carga de imágenes para que el empleado pueda subir imágenes el producto que esta dando de alta o editando.
