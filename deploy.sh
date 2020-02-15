#!/bin/bash

eval "$(ssh-agent -s)" &&
ssh-add -k ~/.ssh/id_rsa &&
cd /var/www/lokesal-jambi-admin-fe
git checkout release
git pull

source ~/.docker-profile-jambi-admin
echo $DOCKERHUB_PASS | docker login --username $DOCKERHUB_USER --password-stdin
docker pull wiflash/lokesal:jambi-admin-fe-latest
docker stop lokesal-jambi-admin-frontend
docker rm lokesal-jambi-admin-frontend
docker rmi wiflash/lokesal:jambi-admin-fe-latest
docker run -d --name lokesal-jambi-admin-frontend -p 3000:3000 wiflash/lokesal:jambi-admin-fe-latest
