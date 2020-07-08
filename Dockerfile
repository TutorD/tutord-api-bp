FROM library/node:14.5.0
MAINTAINER BBAILEY

RUN mkdir -p /usr/src/app
CMD cd /usr/src/app
# Everything under WORKDIR will assume your container destination is this directory
WORKDIR /usr/src/app

COPY Makefile package.json package-lock.json ./

# Quiet flag improves install speed, reduces log noise, and still lets you know when something went wrong
RUN npm install --quiet && \
  rm -rf /root/.npm

EXPOSE 3001
EXPOSE 27018

COPY ./ ./

# RUN npm run test:ci
RUN npm run build

CMD ["node", "dist/server.js"]
