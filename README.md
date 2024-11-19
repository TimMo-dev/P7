## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

> [!CAUTION]
> Remember to cd into "programming-learning-tool" before running npm commands

```sh
npm install
```

### Compile and Hot-Reload for Development

Run client and server
```sh
npm run dev
```

Run client
```sh
npm run dev:client
```

Run server
```sh
npm run dev:server
```


### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

# Kubernetes cluster
> [!CAUTION]
> Use port 5000 for the docker port when running the image!
> It is the only port that the container is currently listening on (will be changed when moving to Kubernetes).
> Remeber to cd into the Kubernetes directory when building the image and applying the yaml files.

Ingress will be setup using port 8080, and is therefore the specified port on the server.ts. If using just a Docker container for testing purposes, the port can be mapped using:
```sh
docker run -p 8080:5000 python-interpreter
```
This will ensure port 8080 is used on the localhost and is mapped to port 5000 inside the container.


## For creating a cluster, use the following commands (assuming k3d is already installed):

Only run once. Run from the Kubernetes directory.
Creating the cluster and building the image
```sh
k3d cluster create compileCluster --api-port 6550 --port "8080:80@loadbalancer" 
docker build -t python-interpreter -f python.Dockerfile .
docker build -t gcc-compiler -f gcc-compiler.Dockerfile .
```

Might be needed if k3d does not correctly configure the api port
```sh
kubectl config set-cluster k3d-compileCluster --server=https://localhost:6550
```

Import the image into the k3d cluster for creation of pods.
```sh
k3d image import python-interpreter:latest -c compileCluster
k3d image import gcc-compiler:latest -c compileCluster
```

Apply the deploy, service and ingress yaml files.
```sh
kubectl apply -f pythonDeploy.yaml
kubectl apply -f pythonService.yaml
kubectl apply -f cDeploy.yaml
kubectl apply -f cService.yaml
kubectl apply -f Ingress.yaml
```

## For starting and stopping the cluster:
```sh
k3d cluster start compileCluster
```
```sh
k3d cluster stop compileCluster
```

# Database
Database is setup as a containerized database.
It is currently configured to run at localhost: 5431 

CD into the P7/database and then run this command: 
```sh
docker build -t testdb . 
```

The image can then be run: 

```sh
docker run --name test_database -p 5431:5431 testdb
```

To start an existing container
```sh
docker start test_databse -i
```