FROM postgres:latest

ENV POSTGRES_USER=user
ENV POSTGRES_PASSWORD=password
ENV POSTGRES_DB=database
ENV PGDATA /var/lib/postgresql/data

RUN chown -R postgres:postgres /var/lib/postgresql/data

RUN chmod -R 700 /var/lib/postgresql/data

EXPOSE 5431

RUN echo "host all all 0.0.0.0/0 md5" >> /var/lib/postgresql/data/pg_hba.conf
RUN echo "listen_addresses='*'" >> /var/lib/postgresql/data/postgresql.conf

CMD ["postgres", "-p", "5431"]
