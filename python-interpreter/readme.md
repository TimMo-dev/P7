> [!CAUTION]
> Use port 5000 for the docker port when running the image!
> It is the only port that the container is currently listening on (will be changed when moving to Kubernetes).

Example (run inside the python-interpreter directory):
```
docker build -t python-interpreter .
docker run -p 5000:5000 python-interpreter
```
In a new terminal, while the container is still running:
```
python apiRouter.py
```
