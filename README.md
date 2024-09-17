# E-Commerce App - React Native / comisión 59520

App compatible con Ios y Android. Se basa en un e-commerce que apunta a ser intuitivo y visualmente amigable

## Funcionalidades Principales

<!-- ### Pantalla de Cuenta

- **Acceso seguro:** Solo los usuarios autenticados pueden acceder a la pantalla de perfil y realizar compras.
- **Información del usuario:** Muestra detalles del usuario, como nombre y dirección.

<img src="./screenshot/Screenshot_1726010585.png" width="300" >
<img src="./screenshot/Screenshot_1726010674.png" width="300" > -->


### Autenticación con Firebase

- Permite generar cuentas usando la dirección de correo electrónico, mediante Firebase Auth.

### Almacenamiento en la nube

- Cada cuenta generada se vinculará a la base de datos Real Time Data Base de Firebase, permitiendo así almacenar datos personales y órdenes de compras ya realizadas.

## Pantallas principales (a las que se accede mediante el tab inferior)

### Pantalla de Categorías

- Mediante una lista de cards, se pueden ver en la primer pantalla, las categorías del shop. Al presionar alguna, llevará al listado de los correspondientes productos.

    ##### Pantalla de Productos

    - Luego de seleccionar la categoría vamos a ver el producto en cuestión, con una vista previa de su imagen.
    - Contaremos con un buscador para aplicar un filtro.
    - Al presionar cualquier producto, seremos redirigidos al detalle del mismo.

    ##### Pantalla de Detalles del Producto

    - Aqui veremos la información completa del producto junto a su imagen.
    - Mediante un contador podremos agregar al carrito la cantidad elegida del ítem.


### Carrito

- En esta solapa veremos los productos que fuimos agregando, con su valor individual, y el total de la suma de todos.
- Podremos eliminar cualquer ítem en caso de ser necesario.
- Al poner confirmar, se simula la compra, y dicho carrito pasa a la solapa de órdenes.

### Órdenes

- Veremos el listado de compras realizadas, con su respectiva fecha.
- Podremos acceder al detalle de cada una.
- Tambien de ser necesario se pueden eliminar.

### Perfil

- En esta sección el usuario podrá almacenar en la nube su imagen de perfil, utilizando la cámara del móvil.
- Además podrá guardar también una dirección, utilizando la geo-localización del celular.
- Ambos datos se pueden borrar y/o modificar de ser necesario.
- Se guardará además un historial de las direcciónes que fueron guardadas. Dicha lista se puede eliminar


## Tecnologías Utilizadas

- **Firebase Authentication:** Implementa el sistema de autenticación de Firebase para gestionar la seguridad de la aplicación.
- **React Native Navigation Stack:** Gestiona la navegación entre pantallas.
- **React Native Navigation Buttom tab:** Gestiona la navegación entre pestañas.
- **Expo-Location:** Permite guardar la ubicación del usuario.
- **Expo-Picker-Image:** Permite guardar una foto de perfil usando la cámara.
- **Redux:** Centraliza y gestiona el estado de la aplicación.
- **RTK Query y Firebase:** Realiza operaciones de lectura/escritura en la base de datos.

## Instalación

1. Clona el repositorio: `git clone https://github.com/MauricioBuda/ProyectoCoder-Buda-RN.git`
2. Instala las dependencias: `npm install`
3. Configura las claves de API para servicios externos (Expo-Location, Firebase, etc.).
4. Configura las credenciales de Firebase en tu proyecto.
5. Ejecuta la aplicación: `npm start`

## Contacto

Cualquier tipo de consulta o sugerencia, contactar a mauricio.ariel.buda@gmail.com