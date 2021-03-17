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
