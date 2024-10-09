# FROM mysql
FROM mariadb

ADD ../db/schema /docker-entrypoint-initdb.d/
ADD ../db/scripts /docker-entrypoint-initdb.d/

EXPOSE ${MYSQL_PORT}

