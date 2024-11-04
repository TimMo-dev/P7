FROM postgres:latest

ENV POSTGRES_USER=user
ENV POSTGRES_PASSWORD=password
ENV POSTGRES_DB=database

EXPOSE 5341

COPY init.sql /docker-entrypoint-initdb.d/

