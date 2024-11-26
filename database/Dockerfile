FROM postgres:latest

ENV POSTGRES_USER=user
ENV POSTGRES_PASSWORD=password
ENV POSTGRES_DB=database
COPY init.sql /docker-entrypoint-initdb.d/
ENV PGDATA=/var/lib/postgresql/data/db-files/

EXPOSE 5431

RUN echo "host all all 0.0.0.0/0 md5" >> /var/lib/postgresql/data/pg_hba.conf
RUN echo "listen_addresses='*'" >> /var/lib/postgresql/data/postgresql.conf

CMD ["postgres", "-p", "5431"]