FROM php:7.4-apache
LABEL maintainer="Nivedita Rao"
#set the working directory in the image
WORKDIR /var/www/html
#copy our public folder to working directory
COPY app /srv/app
#copy apache files to working directoory
COPY docker/apache/vhost.conf /etc/apache2/sites-available/000-default.conf