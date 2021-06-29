# example-project

This is a sample Project for Coyotiv School of Software Engineering

<br>

---

<br>

## Installation

`$ git clone` the project to your local machine.

Per default the app now connects to the mongoDB server that is running inside the docker container.

Add this to your `/etc/hosts` file:

    127.0.0.1 leipzigsharing.localhost

After that maybe flush the dns cash..

**Build and Run** with `docker-compose`:

    $ docker-compose up --build

Open your browser at

    http://leipzigsharing.localhost

**Test Mode** run with

    $ docker-compose run app npm test

**Initialize with test-data**

- run the above command including the database connection
- when express is running go to

        http://leipzigsharing.localhost/api/users/initialize

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
