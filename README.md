# obligatorio-sisdis

## **Estructura base dockerizada con 5 servicios y 4 endpoints**
  
  - **db-votos-mongo**  
  - **db-auth-redis**
  - **db-sessions-redis**
  - **loadbalancer-ningx**
       - http://localhost:80/login   
       - http://localhost:80/votar 
       - http://localhost:80/partidos
  - **backend-voto-node-1:** 
       - http://localhost:8080/login   
       - http://localhost:8080/votar 
       - http://localhost:8080/partidos 
  - **backend-voto-node-2:** 
       - http://localhost:8090/login   
       - http://localhost:8090/votar 
       - http://localhost:8090/partidos 
  - **backend-corte-node**: 
    - http://localhost:8081/login
    - http://localhost:8081/votos

### Para consumir los endpoints 
Utilizar postman e importar el archivo:
**obligatorio-sisdis/POSTMAN REQUESTS**

### Usuarios válidos:
1000000 - contrasenia0  
1000001 - contrasenia1  
...  
1000049 - contrasenia49  
### Credenciales Corte:
CorteElectoral - CorteElectoral



## Para correr por 1era vez✨

1) Tener nodejs instalado https://nodejs.org/es/download/  

2) Instalar las dependencias necesarias en los 2 backends  
    correr comando: ***npm install --include=dev***   en las carpetas
 - obligatorio-sisdis\backend-voto-node\app     
-  obligatorio-sisdis\backend-corte-node\app

 
3) Correr ***docker compose up*** en la carpeta raiz del proyecto.  
Esto levanta todos los servicios y monta las carpetas en los contenedores,  
de esta manera los cambios hechos se refrescan automaticamente.  

Para correr por segunda vez ya no es necesario instalar dependencias.  







