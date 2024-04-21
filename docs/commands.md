```bash
###########################
##  MIGRACIONES TYPEORM  ##
###########################
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

[Volver](../README.md)
