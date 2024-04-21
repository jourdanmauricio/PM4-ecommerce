# Henry - Proyecto Módulo 4

## e-commerce

Este proyecto es parte del bootcamp: [Desarrollo Full Stack de Henry](https://www.soyhenry.com/?gad_source=1).

## Primera aproximación entidades de la base de datos

![DER](./docs/der.webp)

## Instalación desde el repositorio

```bash
git clone https://github.com/jourdanmauricio/PM4-ecommerce.git

cd PM4-ecommerce
```

Configuración de variables de entorno. Debemos generar dos archivos de configuración: .env.development y .env.test

```bash
# .env.example

##########
# Server #
##########
HOST=
PORT=
JWT_SECRET=

#################
# Base de datos #
#################
DB_HOST=
DB_NAME=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=

###########
# Docker  #
###########
POSTGRES_PASSWORD=
POSTGRES_DB=
POSTGRES_USER=
PGADMIN_DEFAULT_EMAIL=
PGADMIN_DEFAULT_PASSWORD=

##############
# Fake Users #
##############
USERS_PASSWORD=

##############
# cloudinary #
##############
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_SECRET=
CLOUDINARY_API_KEY=

```

Crear base de datos local

```bash
psql -h localhost -U postgres
password:

CREATE DATABASE pm4-ecommerce
CREATE DATABASE test-pm4-ecommerce
```

Instalación de dependecias

```bash
npm install
```

Ejecución del servidor

```bash
npm run start

```

Consulta de endpoints

https://localhost:3000/health
https://localhost:3000/products

## Instalación desde imagen docker

Creamos una carpeta que solo contendrá dos archivos: <code>docker-compose.yml</code> y <code>.env.development</code>

```bash
# Creamos el directorio
mkdir pm4-ecommerce-from-image
cd pm4-ecommerce-from-image

# Creamos los dos archivos
touch docker-compose.yml
touch .env.development

# Abrimos VSCode en el proyecto
code .
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  nestapp:
    image: jourdanmau/pm4-ecommerce:latest
    ports:
      - '3001:3000'
    env_file:
      - .env.development
    depends_on:
      - postgresdb

  postgresdb:
    image: postgres
    volumes:
      - pgdata:/var/lib/postgresql/data
    env_file:
      - .env.development

  pgadmin:
    image: dpage/pgadmin4
    env_file:
      - .env.development
    ports:
      - '5050:80'

volumes:
  pgdata:
```

El archivo .env.devepment posee la mismas estruectura que para la instalación local.

Como vemos en el archivo docker-compose.yml, se crean tres contenedores:

- **nestapp**: contine la imagen de la aplicación alojada en dockerhub (jourdanmau/pm4-ecommerce:latest)

- **postgresdb**: imagen de la base de datos postgres

- **pgadmin**: imagen de pgadmin (interfaz gráfica para gestinar bases de datos)

```bash
# Levantamos los contedores
docker compose up -d
```

## Links

[Presentación](https://docs.google.com/presentation/d/1nZCmpqtboes694rj4yN9AldWAzB0kDujevs8yNqgR_8/edit#slide=id.p)

[Deploy](https://pm4-ecommerce-latest.onrender.com/health)

[Documentación de la API](https://pm4-ecommerce-latest.onrender.com/api)

## Comandos de terminal útiles

[Comandos útiles](./docs/commands)

## Test

[Comandos para la ejecución de pruebas](./docs/test)

## Clases Homework

[Detalle de las Homeworks](./docs/homeworks)

Carpeta con imagen de prod

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
