kubectl delete -f /home/ubuntu/grupo08/frontend-e8-deploy/configmap-front.yaml --namespace=grupo-08-dev
kubectl delete -f /home/ubuntu/grupo08/frontend-e8-deploy/clusterip-front.yaml --namespace=grupo-08-dev
kubectl delete -f /home/ubuntu/grupo08/frontend-e8-deploy/loadbalancer-front.yaml --namespace=grupo-08-dev
kubectl delete -f /home/ubuntu/grupo08/frontend-e8-deploy/deployment-front.yaml --namespace=grupo-08-dev
kubectl delete -f /home/ubuntu/grupo08/frontend-e8-deploy/hpa-front.yaml --namespace=grupo-08-dev