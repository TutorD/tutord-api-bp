FROM library/node:14.5.0
MAINTAINER BBAILEY

RUN mkdir -p /usr/src/app
ENV PATH=/usr/src/app/node_modules/.bin:$PATH
# Everything under WORKDIR will assume your container destination is this directory
WORKDIR /usr/src/app

COPY ./.dockerignore ./.dockerignore

COPY Makefile package.json package-lock.json ./

RUN npm install --quiet && \
  rm -rf /root/.npm

EXPOSE 3001
EXPOSE 27018

COPY ./ ./

# RUN npm run test:ci
RUN npm run build

CMD ["node", "dist/server.js"]
