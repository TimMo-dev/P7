FROM python:3.13.0-slim

WORKDIR /code

COPY code/requirements.txt .

RUN pip install -r requirements.txt

COPY code/ .

# Creates a new user called pythonuser and sets it as the user to run the container - this is very nice for security :))
RUN groupadd -r pythongroup && useradd -r -g pythongroup pythonuser

RUN chown -R pythonuser:pythongroup /code

USER pythonuser

EXPOSE 5000

CMD ["python", "main.py"]