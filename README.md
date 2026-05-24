# Tarea-React-Computacion-2-ErrorCapa8

Wilder Garcia Muñoz
Melissa Ballesteros
Juan Jose Lopez
Victoria Restrepo

---

## 1. ¿Por qué conviene tener una función `request` reutilizable?

Porque evita repetir código en todas las peticiones HTTP.  
Además, permite centralizar configuraciones importantes como:

- la URL base de la API;
- los headers;
- el manejo de errores;
- el envío automático del token JWT.

Esto hace que el código sea más organizado, mantenible y fácil de modificar.

---

## 2. ¿Dónde se agrega el token JWT a cada petición?

El token JWT se agrega en el encabezado (`header`) `Authorization` dentro de la función `request`.

Ejemplo:

```js
headers: {
  Authorization: `Bearer ${token}`
}
````

De esta manera, todas las peticiones autenticadas envían automáticamente el token al backend.

---

## 3. ¿Qué pasaría si el backend responde con error 401?

El error `401 Unauthorized` indica que el usuario no está autenticado o que el token JWT es inválido o expiró.

En ese caso:

* la petición fallaría;
* el frontend debería impedir el acceso;
* normalmente se redirige al usuario al login;
* también podría eliminarse el token guardado en `localStorage`.

---

## 4. ¿Por qué usamos `localStorage.getItem('token')` dentro del cliente?

Porque el token JWT se guarda en `localStorage` después del login y necesitamos recuperarlo para enviarlo en futuras peticiones.

Usar `localStorage.getItem('token')` permite:

* mantener la sesión aunque la página se recargue;
* reutilizar el token automáticamente;
* evitar que el usuario tenga que iniciar sesión nuevamente cada vez.


