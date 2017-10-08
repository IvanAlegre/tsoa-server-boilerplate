# TSOA basic microservice

## Setup

Clone the repository and then choose between docker installation or the archaic old school version without containers

### With docker

[Install Docker](https://docs.docker.com/engine/installation/) and Docker Compose. Both come together in Docker for Mac and Docker for Windows but you have to [install docker-compose manually in Linux](https://docs.docker.com/compose/install/).

Then, just:

`docker-compose up`

If you have any permission issue in Linux, execute the following and then retry to `docker-compose up`:

`docker-compose exec -u root tsoa-service chown -R node:node /code`

### Without docker

If you don't want to execute it in a container, install Node.js and do

```
npm install
npm run dev # npm run start 
```

Use dev in development and start in production

## Use

Once the server is running you can explore the built API in [localhost:3000/docs](http://localhost:3000/docs)
