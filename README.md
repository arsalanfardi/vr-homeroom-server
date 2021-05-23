### VR Homeroom Multiplayer Server

A Node.js server which enables multiplayer on a PlayCanvas VR application. The server is deployed on AWS Elastic Container Service, and communicates with a DynamoDB database for logging players and session durations.

<p style="text-align:center">
<img src="https://github.com/arsalanfardi/artana-server/blob/master/assets/playcanvas-image.PNG">
</p>

### Starting the Server Locally

#### Using npm
To start the server, run the following commands:
```
npm install
npm start
```

Note that this application was transpiled to ES6 syntax with Babel, simply running it with *node server.js* will not work.

#### Using Docker
First build the image and then run the container with the corresponding image ID. The first port number in the run command specifies the access port from the outside and is customizable. The second port number must correspond to the exposed port of the application as set by the Dockerfile.
```
docker build -t artana-server .
docker run -p 80:80 [image_id]
```

### AWS ECS Instructions

#### Create a repo
```
aws ecr create-repository --repository-name "artana-server" --profile default --region us-east-1
```

#### Docker build
```
docker build -t artana-server .
```

#### Docker tag
```
docker tag artana-server:latest 382088066963.dkr.ecr.us-east-1.amazonaws.com/artana-server
```

#### Login
```
aws ecr get-login-password --profile default --region us-east-1 | docker login --username AWS --password-stdin 382088066963.dkr.ecr.us-east-1.amazonaws.com/artana-server
```

#### Docker push
```
docker push 382088066963.dkr.ecr.us-east-1.amazonaws.com/artana-server
```
