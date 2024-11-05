# Kubernetes cluster
> [!CAUTION]
> Use port 5000 for the docker port when running the image!
> It is the only port that the container is currently listening on (will be changed when moving to Kubernetes).
> Remeber to cd into the python-interpreter directory when building the image and applying the yaml files.

Ingress will be setup using port 8080, and is therefore the specified port on the server.ts. If usinng just a Docker container for testing purposes, the port can be mapped using:
```sh
docker run -p 8080:5000 python-interpreter
```
This will ensure port 8080 is used on the localhost and is mapped to port 5000 inside the container.


## For creating a cluster, use the following commands (assuming k3d is already installed):

Only run once.
Creating the cluster and bulding the image
```sh
k3d cluster create compileCluster --api-port 6550 --port "8080:80@loadbalancer" 
docker build -t python-interpreter .
```

Might be needed if k3d does not correctly configure the api port
```
kubectl config set-cluster k3d-compileCluster --server=https://localhost:6550
```

Import the image into the k3d cluster for creation of pods.
```sh
k3d image import python-interpreter:latest -c compileCluster
```

Apply the deploy, service and ingress yaml files.
```sh
kubectl apply -f pythonDeploy.yaml
kubectl apply -f pythonService.yaml
kubectl apply -f Ingress.yaml
```


## For starting and stopping the cluster:
```sh
k3d cluster start compileCluster
```
```sh
k3d cluster stop compileCluster
```
