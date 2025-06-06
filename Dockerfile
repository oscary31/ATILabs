# Se usa la imagen oficial de Apache en Ubuntu
FROM httpd:2.4

# Copia todos los archivos y carpetas del proyecto al directorio raíz de Apache
COPY . /usr/local/apache2/htdocs/

# Asegura los permisos correctos para los archivos estáticos
RUN chmod -R 755 /usr/local/apache2/htdocs

# Expone el puerto 80 para acceder al sitio
EXPOSE 80


# Para construir y correr el contenedor:
# docker build -t nombre_imagen .
# docker run -d -p 8080:80 --name nombre_contenedor nombre_imagen
# Luego acceda a http://localhost:8080