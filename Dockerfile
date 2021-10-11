FROM php:7.4-apache
LABEL maintainer="Nivedita Rao"
RUN docker-php-ext-install pdo_mysql
#set the working directory in the image
WORKDIR /var/www/html
#copy our public folder to working directory
COPY app /srv/app
# PHP configuration
COPY docker/php/php.ini /usr/local/etc/php/php.ini
#copy apache files to working directoory
COPY docker/apache/vhost.conf /etc/apache2/sites-available/000-default.conf