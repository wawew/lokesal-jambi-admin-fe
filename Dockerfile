FROM node:12.2.0-alpine
MAINTAINER Wildan Firdaus "firdaus@alterra.id"
RUN mkdir -p /var/www/lokesal-jambi-admin-fe
COPY . /var/www/lokesal-jambi-admin-fe
WORKDIR /var/www/lokesal-jambi-admin-fe
RUN npm install
CMD ["npm", "start"]