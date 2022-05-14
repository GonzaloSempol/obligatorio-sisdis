# obligatorio-sisdis

Para correr por 1era vez:  
1) Tener nodejs instalado https://nodejs.org/es/download/  

2) Instalar las dependencias necesarias en los 2 backends  
    correr comando: npm install --include=dev   
       en la carpeta: obligatorio-sisdis\backend-voto-node\app    
    correr comando: npm install --include=dev   
       en la carpeta obligatorio-sisdis\backend-corte-node\app  
 
3) Correr docker compose up en la carpeta raiz del proyecto.  
Esto levanta todos los servicios y monta las carpetas en los contenedores,  
de esta manera los cambios hechos se refrescan automaticamente.  

Para correr por segunda vez ya no es necesario instalar dependencias.  


Estructura base dockerizada con 4 servicios y 2 endpoints  
db-votos-mongo  
db-cache-redis  
backend-voto-node: http://localhost:8080/votar  
backend-corte-node: http://localhost:8081/leerVotos  
