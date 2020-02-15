#!/bin/bash

eval "$(ssh-agent -s)" &&
ssh-add -k ~/.ssh/id_rsa &&
cd /var/www/lokesal-jambi-admin-fe
git checkout release
git pull

source ~/.docker-profile-jambi-admin
echo $DOCKERHUB_PASS | docker login --username $DOCKERHUB_USER --password-stdin
docker stop lokesal-jambi-admin-frontend
docker container prune -f
docker rmi wiflash/lokesal:jambi-admin-fe-latest
docker image prune -f
docker run -d --name lokesal-jambi-admin-frontend -p 3002:3002 wiflash/lokesal:jambi-admin-fe-latest
