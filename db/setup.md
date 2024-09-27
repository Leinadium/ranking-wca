# SETUP

```sh
docker compose exec -it ranking-wca-db sh
mysql -uroot -p
```

```sql
CREATE database app;
CREATE database datalake;
CREATE database dump;

GRANT ALL PRIVILEGES ON app.* TO 'USER'@'%';
GRANT ALL PRIVILEGES ON datalake.* TO 'USER'@'%';
GRANT ALL PRIVILEGES ON dump.* TO 'USER'@'%';
```

```sh
mysql -u USER -p
mariadb --host localhost --port 3306 --user USER --password --database dump < PATH
```
