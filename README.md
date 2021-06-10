# example-project

This is a sample Project for Coyotiv School of Software Engineering

<br>

---

<br>

## Installation

`$ git clone` the project to your local machine.

Then in the directory **run**

    $ npm start

**Express.js Debug Mode:**

    $ DEBUG=example-project:* npm start

**or with Database-Variables + Express.js Debug Mode:**

    $ MONGODB_USERNAME=${yourDBUserName} \
    MONGODB_PASSWORD=${yourDBPassword} \
    MONGODB_DATABASE=${yourDatabaseName} \
    DEBUG=example-project:* npm start

Everthing in `${...}` you need to fill out yourself with the data of your actual db-server (i.e. mongodb.com).
You can also put the variables into .profile as Global Env variables, it is not recommended though.

**Initialize with test-data**

- run the above command including the database connection
- when express is runnuing go to

        http://localhost:3000/initialize

  to fill the database with test content
