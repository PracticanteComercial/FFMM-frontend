## Para correr la aplicación 
Estando dentro la carpeta frontend:
```npm install```
```npm run dev```

## Conexión con backend a través de endpoint
En varios archivos se conecta con el backend, se espera poner URL de backend con nombre de variable como "VITE_BACKEND_URL" en .env


## Docker
docker build -t ffmm-clients .
docker run -p 3002:3002 ffmm-clients
docker tag ffmm-clients 10.0.1.8:5000/ffmm-clients:1.0
docker push 10.0.1.8:5000/ffmm-clients:1.0


#### El proyecto se creó usuando React + Vite
npm create vite@latest



