# Henry - Proyecto Módulo 4

## e-commerce

Este proyecto es parte del bootcamp: [Desarrollo Full Stack de Henry](https://www.soyhenry.com/?gad_source=1).

## Primera aproximación entidades de la base de datos

![DER](./docs/der.webp)

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

<style>
  h1 { color: #713f12; }
  h2 { color: #2563eb; }
  h3 { color: #a855f7; }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  pre {
    padding: 10px;
  }
</style>
