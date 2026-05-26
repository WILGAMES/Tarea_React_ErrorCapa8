# Backend Spring Boot

Backend REST en Java para la tarea de login y cursos.

## Endpoints locales

- `POST http://localhost:8085/api/auth/login`
- `GET http://localhost:8085/api/courses`
- `POST http://localhost:8085/api/courses`

Tambien se conservan estas rutas simples:

- `POST http://localhost:8085/login`
- `GET http://localhost:8085/courses`
- `POST http://localhost:8085/courses`

## Credenciales demo

- correo: `admin@errorcapa8.com`
- contraseña: `Admin123*`

## Ejecutar

```powershell
cd backend
gradle.bat bootRun
```

## Generar jar

```powershell
cd backend
gradle.bat clean bootJar
```

El jar queda en:

```text
backend/build/libs/tarea-react-errorcapa8-backend.jar
```

## Despliegue con Nginx

Con el archivo [xnginx.conf](C:/Users/Victoria/Desktop/universidad/202601/compunet%202/Tarea_React_ErrorCapa8/xnginx.conf), el login publico queda en:

```text
https://pi2tools.icesi.edu.co/iaslab/compu2/A00405025-api/login
```

La ruta protegida de cursos queda en:

```text
https://pi2tools.icesi.edu.co/iaslab/compu2/A00405025-api/courses
```

Ejemplo del bloque proxy:

```nginx
location /iaslab/compu2/A00405025-api/api/ {
    proxy_pass http://127.0.0.1:8085/api/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}

location /iaslab/compu2/A00405025-api/ {
    alias /home/computacion2/sites/A00405025/dist/;
    try_files $uri $uri/ /iaslab/compu2/A00405025-api/index.html;
}
```
