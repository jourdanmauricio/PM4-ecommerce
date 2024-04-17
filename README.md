# Henry - Proyecto Módulo 4

## e-commerce

Este proyecto es parte del bootcamp: [Desarrollo Full Stack de Henry](https://www.soyhenry.com/?gad_source=1).

## Primera aproximación entidades de la base de datos

![DER](./docs/der.webp)

## Comandos de terminal útiles

```bash
############################
##  MIGRACIONES POSTGRES  ##
############################
# Ejecutamos las migraciones
npm run migration:run

# Crea una migración vacia para incluir un sql
npm run migration:create src/migrations/<NOMBRE_MIGRACION>

# Genera una nueva migracion
npm run migration:generate src/migrations/<NOMBRE_MIGRACION>

# Revierte última migración
npm run migration:revert

# Muestra el historial de migraciones
npm run migration:show

##############################
##  REGENERAR BASE DE DATOS ##
##############################
# Warning: Se eliminarán todos los datos

# Eliminar todas los archivos dentro de la carpeta migraciones

# Eliminar migraciones de la Base de Datos
npm run migration:drop

# Creamos una migracion inicial desde 0
npm run migration:generate src/migrations/initial
npm run build

# Ejecutamos la migracion inicial
npm run migration:run

####################################
# Eliminación de datos manualmente #
####################################
delete from order_details_products;
delete from products;
delete from categories;
delete from order_details;
delete from orders;
delete from users;

##########
## TEST ##
##########
npm run test
npm run test -- user.service
npm run test:e2e
npm run test:e2e:watch

# Ejecutar pruebas de integración mock BD
npm run test:e2e -- app.integration.e2e-spec

# Ejecutar pruebas e2e -> BD test_pm4_db
npm run test:e2e -- app.e2e-spec

################################
# Carga inicial desde terminal #
################################
curl --request GET \
  --url http://localhost:3000/categories/seeder \
  --header 'Authorization: Basic am91cmRhbm1hdUBnbWFpbC5jb206MTIzNDU2Nzg='

curl --request GET \
  --url http://localhost:3000/products/seeder \
  --header 'Authorization: Basic am91cmRhbm1hdUBnbWFpbC5jb206MTIzNDU2Nzg='
```

## Clases Homework

### Clase 1 - Backend Architecture

<details>
<summary>Detalle</summary>

#### ACTIVIDAD 01

Crear y planificar el DER del proyecto a implementar tomando en cuenta la siguientes consideraciones. La aplicación consistirá en un e-commerce en el cual...

- Un Usuario podrá registrarse e ingresar a la aplicación mediante usuario y contraseña.

- El Usuario registrado puede realizar compras de productos mediante un carrito de compras (solo una unidad de cada producto) emitiendo una Orden de compra que registra la información en un Detalle de Compras.

- Las Órdenes de compras son asociadas al Usuario y estas a su vez tienen asociado un Detalle de Compra con la información de los productos adquiridos.

- Un Usuario Administrador, tendrá la posibilidad de actualizar la información de los productos cargados en la base de datos así como actualizar stock o agregar imágenes mediante un servicio de nube.

**[REQUISITOS]**:

Al finalizar este hito deberás tener la estructura básica del proyecto individual de e-commerce y una idea teórica de las entidades de la base de datos así como sus relaciones.

</details>

### Clase 2 - NestJS Fundamentals

<details>
<summary>Detalle</summary>

#### ACTIVIDAD 01

Crear un proyecto en Nest JS bajo el nombre ecommerce-<usuario de github>.

#### ACTIVIDAD 02

Crear los módulos Products, Users y Auth.

#### ACTIVIDAD 03

Crear sus respectivos controllers y services.

#### ACTIVIDAD 04

Crear los endpoints GET /products, GET /users y Get /auth.

#### ACTIVIDAD 05

Crear un middleware global que loguee la ruta, método y la fecha-hora en que se llamó al endpoint.

**TIPS ¡Bien hecho!**

- Utiliza Nest CLI para inicializar el proyecto.
- Recuerda “modularizar” el código para trabajar de forma ordenada.

**[REQUISITOS]**:

Al finalizar este hito deberás tener un proyecto de node con la estructura básica del proyecto individual de e-commerce. Los endpoints principales del proyecto deberán ser capaces de recibir solicitudes desde el cliente y activar un middleware que nos permita identificar mediante un log en la terminal la ruta invocada.

</details>

### Clase 3 - Backend Architecture

<details>
<summary>Detalle</summary>

#### ACTIVIDAD 01

Crear los repositorios para Users y Products.

#### ACTIVIDAD 02

Guardar las entidades en un array en memoria.

#### ACTIVIDAD 03

Cargar algunas entidades de prueba hardcodeadas, con las siguientes propiedades...

**Users**

- id:number
- email: string
- name: string
- password: string
- address: string
- phone: string
- country?: string | undefined
- city?: string | undefined

**Products**

- id:number
- name: string
- description: string
- price: number
- stock: boolean
- imgUrl: string

#### ACTIVIDAD 04

Modificar los endpoints GET /products y GET /users para que devuelvan el array de entidades.

**TIPS ¡Bien hecho!**

- Recuerda que los controllers sólo pueden comunicarse con el repositorio a través de los servicios.

- No olvides actualizar el array de providers.

**[REQUISITOS]**:

- Al finalizar este hito, el alumno deberá implementar de manera satisfactoria un repositorio para cada entidad del proyecto.

- Los endpoints de la aplicación deben funcionar de manera correcta y devolver la información provista por cada repositorio.

</details>

### Clase 4 - NestJS Routing

<details>
<summary>Detalle</summary>

#### ACTIVIDAD 01

Crear todos los endpoints CRUD para Products y Users (GET, GET{id}, POST, PUT{id}, DELETE{id}).

#### ACTIVIDAD 02

Desarrollar la lógica de creación, listado y eliminación desde el repository.

- GET debe devolver la lista de elementos , y httpStatus = 200.

- GET{id} debe devolver el elemento con id pedido, y httpStatus = 200.

- En el caso de Users, no devolver el password.

- POST debe devolver el id de la entidad creada, y httpStatus = 201.

- PUT{id} y DELETE{id} pueden devolver el id de la entidad editada/eliminada y httpStatus 200.

#### ACTIVIDAD 03

Validar en POST y PUT que la estructura de la entidad corresponda a la estructura de cada entidad.

#### ACTIVIDAD 04

El método GET puede recibir como query params los valores page y limit.

- Si no recibe el parámetro page, el valor por defecto es 1.

- Si no recibe el parámetro limit, el valor por defecto es 5.

- Bonus: Implementar la lógica desde el repositorio, para paginar las entradas devuelvas.

#### ACTIVIDAD 05

Crear el endpoint POST /auth/signin, que reciba email y password.

- Para el login se utilizarán las credenciales email / password.

- Inyectar el usersRepository para poder hacer consultas.

- No se procederá al login si faltan alguna de las dos credenciales.

- No se procederá con el login en caso de que no exista un usuario registrado con la dirección de email proporcionada.

- En caso de que el usuario no exista o la contraseña proporcionada no coincida con la registrada, se deberá enviar una única respuesta para cualquiera de los casos. Ej: “Email o password incorrectos”. NOTA: Por seguridad es preferible no especificar cuál de los dos datos ha fallado en su verificación.

#### ACTIVIDAD 06

Dentro de la carpeta Auth, crear una guarda AuthGuard, que debe verificar lo siguiente...

- Debe existir un header Authorization.

- Dicho header, tiene que tener una estructura como la siguiente: Basic: <email>:<password>.

- NO validaremos por ahora que sea un email y un password válido, únicamente verificar si el header es enviado y continente un email y un password.

- Todos los endpoints de Users, salvo el POST, deben utilizar esta guarda.

- Todos los endpoints de Products, salvo el GET y el GET{id} deben utilizar esta guarda.

**TIPS ¡Bien hecho!**

- No te preocupes por ahora por el manejo de errores, la ruta de autenticación puede devolver strings únicamente.

**[REQUISITOS]**:

- Al finalizar este hito el proyecto debe contar con una ruta para cada una de las acciones correspondientes al CRUD de cada entidad.
- La lógica de estas tareas deberá estar encapsulada en el repositorio correspondiente.
- Los endpoints deberán ser validados para asegurar la integridad de la información recibida en la solicitud.
- Las rutas deberán ser protegidas por una guarda.

</details>

### Clase 5 - NestJS & TypeORM

<details>
<summary>Detalle</summary>

#### ACTIVIDAD 01

Instalar y configurar las librerías necesarias para utilizar TypeORM y postgres.

- Crear un archivo de configuración para la conexión con TypeORM.

- Los datos de conexión a la BD deben ser almacenados en variables de entorno.

- Crear el módulo de conexión de manera global.

#### ACTIVIDAD 02

Definir las siguientes entidades de typeorm con sus respectivas relaciones.

**Users**

- id: debe ser un valor único generado automáticamente en formato UUID. No puede ser nulo y actúa como la clave primaria de la entidad.
- name: debe ser una cadena de texto de máximo 50 caracteres y no puede ser nulo.
- email: debe ser una cadena de texto de máximo 50 caracteres, único y no puede ser nulo.
- password: debe ser una cadena de texto de máximo 20 caracteres y no puede ser nulo.
- phone: debe ser un número entero.
- country: debe ser una cadena de texto de máximo 50 caracteres.
- address: debe ser un texto.
- city: debe ser una cadena de texto de máximo 50 caracteres.
- orders_id: Relación 1:N con orders.

**Products**

- id: debe ser un valor único generado automáticamente en formato UUID. No puede ser nulo y actúa como la clave primaria de la entidad.
- name: debe ser una cadena de texto de máximo 50 caracteres y no puede ser nulo.
- description: debe ser un texto y no puede ser nulo.
- price: debe ser un número decimal con una precisión de 10 dígitos y una escala de 2 dígitos. No puede ser nulo.
- stock: debe ser un valor numérico. No puede ser nulo.
- imgUrl: debe ser una cadena de texto, en caso de no recibir un valor debe asignar una imagen por defecto.
- category_id (Relación 1:N).
- Relación N:N con orderDetails.

**Categories**

- id: debe ser un valor único generado automáticamente en formato UUID. No puede ser nulo y actúa como la clave primaria de la entidad.
- name: debe ser una cadena de texto de máximo 50 caracteres y no puede ser nulo.
- Relación 1:1 con products.

**Orders**

- id: debe ser un valor único generado automáticamente en formato UUID. No puede ser nulo y actúa como la clave primaria de la entidad.
- user_id: (Relación 1:N) con users.
- date.
- Relación 1:1 con orderDetails.

**OrderDetails**

- id: debe ser un valor único generado automáticamente en formato UUID. No puede ser nulo y actúa como la clave primaria de la entidad.
- price: debe ser un número decimal con una precisión de 10 dígitos y una escala de 2 dígitos. No puede ser nulo.
- order_id: Relación 1:1 con orders.
- Relación N:N con products.

**[REQUISITOS]**:

- Al terminar el hito el alumno debe haber realizado la correcta configuración de la base de datos en el proyecto.
- Los servicios deben trabajar con los repositorios de cada entidad para gestionar la información en la base de datos.
- Las relaciones entre tablas deben funcionar correctamente al realizar el proceso de compra.
- Debe estar configurada la implementación de migraciones para monitorear futuros cambios en la base de datos.

</details>

### Clase 6 - NestJS Pipes

<details>
<summary>Detalle</summary>

#### ACTIVIDAD 01

Implementar el global pipe de Class-Validator.

#### ACTIVIDAD 02

Crear los DTOs CreateUserDto y CreateOrderDto, e implementarlos en los POST y PUT correspondientes

**CreateUserDto**

- name: Se requiere que el nombre no esté vacío, sea una cadena de al menos 3 caracteres y no supere los 80 caracteres de longitud.
- email: El correo electrónico debe tener una estructura válida según el estándar de direcciones de correo electrónico.
- password: La contraseña debe cumplir con los siguientes criterios:
- Debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&\*
- Debe tener una longitud mínima de 8 caracteres y una longitud máxima de 15 caracteres.
- address: La dirección debe tener una longitud mínima de 3 caracteres y no superar los 80 caracteres de longitud.
- phone: El número de teléfono debe estar presente y ser un número.
- country: El país debe ser una cadena de texto de al menos 5 caracteres y no superar los 20 caracteres de longitud.
- city: La ciudad debe ser una cadena de texto de al menos 5 caracteres y no superar los 20 caracteres de longitud.

**CreateOrderDto**

- Validar que el email tenga una estructura válida
- Validar que el password contenga:
  - al menos una minúscula
  - al menos una mayúscula
  - al menos un caracter numérico
  - un largo mínimo de 8 caracteres
  - un largo máximo de 15 caracteres
  - al menos uno de los siguientes caracteres = !@#$%^&\*
- Validar para el resto de campos, que se condigan con el dato de la BD, y que los campos string no superen el largo definido en la entidad

#### ACTIVIDAD 03

Crear el dto LoginUserDto, e implementarlo en POST /auth/signin

#### ACTIVIDAD 04

Extra: Agrega el manejo de errores que creas correspondiente para cada ruta

#### ACTIVIDAD 05

Validar en todos los endpoints que lo requiera, que el id tenga el formato especificado (UUID) recibido por parámetros o query.

**[Requisitos]**:

- Al terminar el hito el alumno debe haber implementado correctamente la validación de solicitudes HTTP por medio de Pipes
- Las validaciones deben ser implementadas en aquellos endpoints que utilicen información proveniente de la solicitud según corresponda

</details>

### Clase 7 - NestJS File Upload

<details>
<summary>Detalle</summary>

#### ACTIVIDAD 01

Configurar una cuenta en Cloudinary y generar las credenciales de acceso correspondientes.

#### ACTIVIDAD 02

Crear la conexión dentro de la aplicación mediante un archivo de configuración.

#### ACTIVIDAD 03

Crear el módulo, servicio, controlador y repositorio correspondientes para la gestión de archivos.

#### ACTIVIDAD 04

Desarrollar la lógica para la carga de imágenes a Cloudinary y la actualización de imágenes de los productos en la DB. Este proceso será realizado por medio del endpoint /files/uploadImage/:id que recibe por parámetros el id del producto cuya imagen queremos actualizar y el archivo a emplear en el cuerpo de la solicitud.

#### ACTIVIDAD 05

La DB debe reflejar los cambios efectuados en el campo imgUrl

#### ACTIVIDAD 06

Implementar pipes para la validación del tamaño de imagen (no mayor a 200kb) así como los tipos de imagen permitidos.

**[Requisitos]**:

- Al terminar este hito el alumno debe haber implementado la actualización de productos para utilizar la carga de imágenes al servicio de cloudinary.
- Las imágenes deben tener una validación de tamaño y tipo antes de ser cargadas en el servicio de Cloudinary

</details>

### Clas 8 - NestJS Auth

<details>
<summary>Detalle</summary>

#### ACTIVIDAD 01

**Sign Up**

- Sustituir el endpoint POST /users por el endpoint POST /auth/signup que será creado dentro del controlador de autenticación.

- Este endpoint recibirá la misma estructura que recibia el endpoint anterior y adicionalmente recibirá una propiedad de confirmación de contraseña, debes validar que ambas contraseñas sean recibidas y coincidan o devolver una excepción.

- Debe registrar al usuario dentro de la base de datos con una contraseña hasheada

- Debe retornar al usuario sin contraseña

#### ACTIVIDAD 02

**Sign In**

- Modificar la funcionalidad de signIn para que valide el password encriptado con el provisto en la solicitud.

- Enviar un error genérico en caso de existir algún error ya sea por que el usuario no es encontrado o por que el password es incorrecto

- Crear un token de acceso para el usuario registrado con una validez de 1 hora

#### ACTIVIDAD 03

**Auth Guard**

- Modificar la funcionalidad del guardián de autenticación para la validación de tokens.

- Enviar un error en caso de no recibir el token o en caso de que este o sea un token válido con código de error 401

- El token debe ser verificado por medio de una clave secreta que no debe ser mostrada directamente en el código (Variables de entorno).

- Una vez validado el token debes adjuntar la información correspondiente al tiempo de expiración de dicho token

#### ACTIVIDAD 04

Los endpoints protegidos por este guardián serán los siguientes

- POST /uploadImage/:productId
- POST /orders
- GET /orders/:id
- PUT /products/:id
- GET /users
- GET /users/:id
- PUT /users/:id
- DELETE /users/:id

**¡Bien hecho! TIPs:**

- Recuerda modificar el DTO para la creación de usuarios.
- Puedes utilizar decoradores personalizados para la validación.

**[Requisitos]**

- Al finalizar el alumno tendrá que haber implementado un sistema de autenticación por medio de la encriptación de contraseñas y la validación por medio de la gestión de tokens de JWT
- El proyecto deberá contar con rutas protegidas particulares y rutas públicas accesibles sin la necesidad de un token.

</details>

### Clase 9 - NestJS Auth II

<details>
<summary>Detalle</summary>

#### ACTIVIDAD 01

Definir un guardián para la validación del rol de administrador en usuarios para el control de acceso.

#### ACTIVIDAD 02

Modificar Entidad y Dtos para implementar el campo de administrador:

- Todos los registros serán considerados usuarios por default.

- El campo admin no debe ser recibido dentro de la solicitud.

- El campo admin no debe ser mostrado en las rutas que devuelven un usuario (únicamente en la ruta GET /users/).

#### ACTIVIDAD 03

Definir los roles de la aplicación (únicamente es necesario el rol de administrador).

#### ACTIVIDAD 04

Asignar y verificar de rol junto con el proceso de firma de JWT.

#### ACTIVIDAD 05

Implementar de control de Acceso en las rutas:

- GET /users/
- PUT /products/:id

**TIPs: ¡Bien hecho!**

- No olvides utilizar un custom decorator para la definición de roles.

**[Requisitos]**:

Al terminar este hito la aplicación deberá contar con rutas protegidas por medio del Control de acceso basado en roles.

</details>

### Clase 10 - NestJS Testing

<details>
<summary>Detalle</summary>

#### ACTIVIDAD 01

Crear e implementar pruebas unitarias en los diferentes módulos de la aplicación.

#### ACTIVIDAD 02

Crear e implementar pruebas de integración en la aplicación.

**TIPs: ¡Bien hecho!**

- La implementación de pruebas es un extra credit para el proyecto integrador.

**[Requisitos]**:

Para tomar el extra credit de este hito el alumno deberá haber creado:

- 5 pruebas unitarias de al menos 5 funcionalidades diferentes dentro de la aplicación.
- Validar mediante pruebas de integración el funcionamiento de al menos 5 rutas de la aplicación.

</details>

### Clase 11 - Nest Open API Integration

<details>
<summary>Detalle</summary>

#### Actividad 01

- Integrar Swagger a la aplicación para la generación dinámica de la documentación en la ruta /API.

- Cada controlador debe tener su propia etiqueta para facilitar la legibilidad.

#### Actividad 02

- Mantener la protección de rutas que utilicen JWT, las rutas con control de acceso mediante roles únicamente pueden ser testeadas para validar errores.

- Los DTOs y entidades deben estar detallados en la documentación

- Las pruebas de la aplicación de forma integral en la interfaz de Open API deben ser funcionales.

#### TIPs

- Puedes utilizar el formato con comentarios o decoradores para la definición y personalización de los DTOs y entidades.

**[REQUISITOS]**:

- Al finalizar el hito la aplicación debe mostrar la documentación completa de la aplicación donde se desglosen las rutas, DTOs y entidades disponibles para el correcto uso de la API.

</details>
