# merelaager

## Running locally

### Install MySQL DB
```
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
sudo systemctl enable mysql
```

Create new database
```
mysql -u root -p
```
```
CREATE DATABASE merelaager;
CREATE USER 'prisma'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON merelaager.* TO 'prisma'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

Create the tables from
[adminpanel-api](https://github.com/merelaager/adminpanel-api).
In that repository, with `DATABASE_URL` pointing to this database, run:
```
yarn prisma db push
```

> [!WARNING]
> Do not run `prisma db push` in this repository. Its Prisma schema is
> incomplete, so pushing it deletes data.

Fill in the `DATABASE_*` variables in `.env` (see `.env.template`).
`yarn install` generates the Prisma client.

### Generate SASS
```
yarn run sass
```

rebuild
```
yarn build:remix
yarn build:server
```

### Run the page
```
yarn start
```
