# obligatorio-sisdis

  

## **Estructura base dockerizada con 5 servicios y 4 endpoints**

- **db-votos-mongo**

- **db-auth-redis**

- **db-sessions-redis**

***Para votar:***

- **loadbalancer-ningx**

- http://localhost:80/login

- http://localhost:80/votar

- http://localhost:80/partidos

***Para la corte:***
- **backend-corte-node**:

- http://localhost:8081/login

- http://localhost:8081/votos

Si se desea utilizar algun servidor de votos especifico se pueden usar:
(Pensado solo para testing)
- **backend-voto-node-1:**

- http://localhost:8080/login 

- http://localhost:8080/votar

- http://localhost:8080/partidos

- **backend-voto-node-2:**

- http://localhost:8090/login

- http://localhost:8090/votar

- http://localhost:8090/partidos



  

### Para consumir los endpoints

Utilizar postman e importar el archivo: **obligatorio-sisdis/POSTMAN REQUESTS**
O utilizar los frontends proporcionados.

  

### Usuarios válidos:

1000000 - contrasenia0

1000001 - contrasenia1

...

1000049 - contrasenia49

### Credenciales Corte:

CorteElectoral - CorteElectoral

  
  
  

## Para correr por 1era vez✨

  

1) Tener nodejs instalado https://nodejs.org/es/download/

  

2) Instalar las dependencias necesarias en los 2 backends y 2 frontends

correr comando: `npm install --include=dev` en las carpetas

- obligatorio-sisdis\backend-voto-node-1\app

- obligatorio-sisdis\backend-voto-node-2\app

- obligatorio-sisdis\backend-corte-node\app

- obligatorio-sisdis\frontend-corte

- obligatorio-sisdis\frontend

  
  

3) Correr `docker compose up` en la carpeta raiz del proyecto.

Esto levanta todos los servicios y monta las carpetas en los contenedores,

de esta manera los cambios hechos se refrescan automaticamente.



4) Levantar ambos frontends, Correr `npm run start` en las carpetas:

- obligatorio-sisdis\frontend-corte

- obligatorio-sisdis\frontend

  
  

Para correr por segunda vez ya no es necesario instalar dependencias.