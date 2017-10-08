FROM seedtag/node-base:latest

WORKDIR /code

ADD package.json yarn.lock /code/

RUN mkdir build
RUN touch build/routes.ts

RUN yarn install --pure-lockfile

ADD . .

USER root
RUN chown node:dialout *

USER node
RUN yarn build

CMD ["./entrypoint.sh", "yarn start"]
