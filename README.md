# example-project

This is a sample Project for Coyotiv School of Software Engineering

<br>

---

<br>

## Installation

`$ git clone` the project to your local machine.

Per default the app now connects to the mongoDB server that is running inside the docker container.
To Run the app with docker, you need to create the `docker-compose.yml` file

Example content for `docker-compose.yml`

    version: '3'
    services:
    app:
        image: example-project
        build:
        context: .
        dockerfile: Dockerfile
        environment:
        # - MONGODB_USERNAME=<your db user name>
        # - MONGODB_PASSWORD=<your db user password>
        # - MONGODB_DATABASE=<your database name>
        - MONGODB_CONNECTION_STRING=mongodb://mongo/example-project
        ports:
        - 3000:3000
        - 35729:35729
        volumes:
        - ./src:/app/src
        - ./__tests__:/app/__tests__
    mongo:
        image: mongo
        ports:
        - 27017:27017

**Run** it with `docker-compose`:

    $ docker-compose up

**Test Mode** run with

    $ docker-compose run app npm test

**Initialize with test-data**

- run the above command including the database connection
- when express is running go to

        http://localhost:3000/initialize

  to fill the database with test content

---

### Manually run with

**Database-Variables + Express.js Debug Mode:**

    $ MONGODB_USERNAME=${yourDBUserName} \
    MONGODB_PASSWORD=${yourDBPassword} \
    MONGODB_DATABASE=${yourDatabaseName} \
    DEBUG=example-project:* npm start

Everthing in `${...}` you need to fill out yourself with the data of your actual db-server (i.e. mongodb.com).
You can also put the variables into .profile as Global Env variables, it is not recommended though.
