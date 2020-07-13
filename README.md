# chat-websocket-kubernetes
Build Docker image\
docker build -t saurabh7verma/chat-demo .\
docker push saurabh7verma/chat-demo:latest\
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.34.0/deploy/static/provider/cloud/deploy.yaml\
kubectl apply -f kubeconfigs/
