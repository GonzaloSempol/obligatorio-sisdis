# obligatorio-sisdis

## **Estructura base dockerizada con 5 servicios y 3 endpoints** 

  - **db-votos-mongo**  
  - **db-auth-redis**
  - **db-sessions-redis**
  - **backend-voto-node:** 
       - http://localhost:8080/login   
       - http://localhost:8080/votar 
  - **backend-corte-node**: 
    - http://localhost:8081/leerVotos


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


