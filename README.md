#### Create a repo
```
aws ecr create-repository --repository-name "artana-server" --profile personal --region us-east-1
```

#### Docker build
```
docker build -t node_app .
```

#### Docker tag
```
docker tag node_app 017801987097.dkr.ecr.us-east-1.amazonaws.com/artana-server
```

#### Login
```
aws ecr get-login-password --profile personal --region us-east-1 | docker login --username AWS --password-stdin 017801987097.dkr.ecr.us-east-1.amazonaws.com 
```

#### Docker push
```
docker push 017801987097.dkr.ecr.us-east-1.amazonaws.com/artana-server
```
