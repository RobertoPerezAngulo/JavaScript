# Utilizar la imagen base de Nginx
FROM nginx:alpine

# Copiar los archivos estáticos del proyecto al directorio de Nginx
COPY static /usr/share/nginx/html/static

# Copiar el index.html y otros archivos necesarios en la raíz7
COPY index.html /usr/share/nginx/html/
COPY main.js /usr/share/nginx/html/
COPY node_modules /usr/share/nginx/html/node_modules
COPY style.css /usr/share/nginx/html/
COPY ./pages/contacto /usr/share/nginx/html/pages/contacto

# Si tienes más archivos o directorios en la raíz que necesitas copiar, repite el proceso:
# COPY path_to_your_file_or_directory /usr/share/nginx/html/path_to_your_file_or_directory

# Exponer el puerto 80
EXPOSE 80

# Ejecutar Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]