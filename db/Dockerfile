# FROM mysql
FROM mariadb

ADD schema /docker-entrypoint-initdb.d/
ADD scripts /docker-entrypoint-initdb.d/

EXPOSE ${MYSQL_PORT}

