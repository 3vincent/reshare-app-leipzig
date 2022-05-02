# reshare-app-leipzig

This is a sample Project for Coyotiv School of Software Engineering

<br>

---

<br>

## Installation

Clone the project to your local machine.

    $ git clone git@github.com:3vincent/reshare-app-leipzig.git

Add this to your `/etc/hosts` file:

    127.0.0.1 leipzigsharing.localhost

After that maybe flush the dns cash..

**Build and Run** with `docker-compose`:

    $ docker-compose up --build

or be more specific:

    $ docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build --remove-orphans

Open your browser at

    http://leipzigsharing.localhost

Per default the app now connects to the mongoDB server that is running inside the docker container.

**Test Mode** run with

    $ docker compose -f docker-compose.testing.dev.yml up

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
    DEBUG=reshare-app-leipzig:* npm start

Everthing in `${...}` you need to fill out yourself with the data of your actual db-server (i.e. mongodb.com).
You can also put the variables into .profile as Global Env variables, it is not recommended though.

## Website

https://github.com/3vincent/reshare-app-leipzig

This is open source software. Feel free to fork and share your code.

## License

MIT License

Copyright (c) 2021 Ben Sukstorf

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
