FROM node:current-alpine
MAINTAINER Wildan Firdaus "firdaus@alterra.id"
RUN mkdir -p /var/www/lokesal-jambi-admin-fe
COPY ./build /var/www/lokesal-jambi-admin-fe
WORKDIR /var/www/lokesal-jambi-admin-fe
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3002"]
