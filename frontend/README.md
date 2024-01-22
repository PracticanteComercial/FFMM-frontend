## Para correr la aplicación 
Estando dentro la carpeta frontend:
```npm install```
```npm run dev```

## Conexión con backend a través de endpoint
En línea 16 de ```src/MutualFundsPage.jsx``` hay un request de tipo GET para hacer fetch a todos los fondos mutuos en la base de datos. Al obtener este dato, se puede visualizar los distintos fondos en la web. Actualmente está haciendo fetch a http://localhost:3001/FFMMs ya que ese es el URL de backend en localhost. Además en ```src/PopOverInvert.jsx``` está este endpoint: http://localhost:3001/sendEmailToExecutive.

#### El proyecto se creó usuando React + Vite
npm create vite@latest



