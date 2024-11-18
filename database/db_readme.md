Database is setup as a containerized database.
It is currently configured to run at localhost: 5431

First build the image:

- cd to P7/database

Then run this command:

```sh
docker build -t testdb .
```

The image can then be run:

```sh
docker run -p 5431:5431 -v .\init.sql:/docker-entrypoint-initdb.d/init.sql testdb
```
