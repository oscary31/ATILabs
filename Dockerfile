# Usa una imagen base de Ubuntu
FROM ubuntu:latest

# Instala Apache, Python y pip
RUN apt-get update && apt-get install -y apache2 python3 python3-pip -y

# Instala uWSGI y el plugin de Python 3
# Añadimos un paso para verificar la instalación del plugin
RUN apt-get install -y uwsgi uwsgi-plugin-python3

# Crea el directorio de la aplicación y copia los archivos a /var/www/html/ATI/
# Esto es donde la aplicación Python se copiará dentro del contenedor.
RUN mkdir -p /var/www/html/ATI/
COPY . /var/www/html/ATI/

# Asegura los permisos correctos para los archivos 
RUN chmod -R 755 /var/www/html/ATI/

# Expone el puerto 80 para acceder al sitio (puerto HTTP estándar)
EXPOSE 80

# Configura uWSGI para ejecutar tu aplicación Python
# Creamos un archivo de configuración simple para uWSGI en /etc/uwsgi.ini.
RUN echo "[uwsgi]\nchdir = /var/www/html/ATI/\nmodule = index:app\nhttp-socket = 0.0.0.0:80\nmaster = true\nprocesses = 1\ndie-on-term = true\nplugins = python3\n" > /etc/uwsgi.ini

# Esto iniciará la aplicación Python cuando el contenedor se inicie.
CMD ["uwsgi", "--ini", "/etc/uwsgi.ini"]
