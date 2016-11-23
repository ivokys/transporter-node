FROM tutum.co/hindsight/docker-base:master
RUN apk --update add bash nodejs-dev python make g++
RUN npm install -g npm@2.7.6
WORKDIR /app

ADD ./package.json /tmp/package.json
RUN cd /tmp && npm install --no-optional
RUN cp -a /tmp/node_modules .

ADD . .
RUN npm run build

EXPOSE 8080
