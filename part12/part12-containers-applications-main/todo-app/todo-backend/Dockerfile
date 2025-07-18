# Usa una imagen oficial de Node como base
FROM node:20

# Directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia package.json y package-lock.json primero (para aprovechar cache de npm install)
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la app
COPY . .

# Expone el puerto en el que corre la app (por defecto 3000)
EXPOSE 3000

# Comando para ejecutar la app
CMD ["npm", "start"]
