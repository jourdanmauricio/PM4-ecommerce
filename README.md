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
delete from orders;
delete from users;

################################
# Carga inicial desde terminal #
################################
curl --request POST \
  --url http://localhost:3000/categories/seeder \
  --header 'Authorization: Basic am91cmRhbm1hdUBnbWFpbC5jb206MTIzNDU2Nzg='

curl --request POST \
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

</details>
