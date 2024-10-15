FROM python:3.8

WORKDIR /code

COPY code/requirements.txt .

RUN pip install -r requirements.txt

COPY code/ .

# Creates a new user called pythonuser and sets it as the user to run the container - this is very nice for security :))
RUN groupadd -r python && useradd -r -g pythonuser python

RUN chown -R pythonuser:python /code

USER pythonuser

CMD ["python", "main.py"]