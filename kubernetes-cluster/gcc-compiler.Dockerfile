FROM gcc:latest

WORKDIR /code

COPY c-code/ .

# Install Python and Flask
RUN apt-get update && apt-get install -y python3 python3-pip python3-venv
RUN python3 -m venv /opt/venv
RUN /opt/venv/bin/pip install Flask

# Creates a new user called gccuser and sets it as the user to run the container - this is very nice for security :))
RUN groupadd -r gccgroup && useradd -r -g gccgroup gccuser

RUN chown -R gccuser:gccgroup /code

USER gccuser

EXPOSE 5000

COPY c-code .

ENV PATH="/opt/venv/bin:$PATH"

CMD ["python3", "server.py"]