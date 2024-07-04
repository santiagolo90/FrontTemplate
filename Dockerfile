# Etapa 1: Construcción de la aplicación Angular
FROM node:18-alpine AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el código fuente de la aplicación Angular
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Etapa 2: Configuración de Nginx
FROM nginx:alpine

# Copiar la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Eliminar el contenido del directorio por defecto de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar los archivos construidos de la aplicación Angular al directorio de Nginx
COPY --from=build /app/dist/front-template/browser /usr/share/nginx/html

# Exponer el puerto en el que se servirá la aplicación
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
