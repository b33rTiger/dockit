# DockIt [![Generated with](https://img.shields.io/badge/generated%20with-bangular-blue.svg?style=flat-square)](https://github.com/42Zavattas/generator-bangular) [![Travis](https://img.shields.io/travis/rust-lang/rust.svg?style=flat-square)]() [![PyPI](https://img.shields.io/pypi/status/Django.svg?style=flat-square)]()

An application for motivating people to exercise by incentivizing them with the two true incentives in life: pride and money.

## Technology Stack

* MongoDB with Mongoose
* Node with Express
* Angular

## Setup (Please follow in order)

* Git clone the repo
* Checkout the dev branch
* Make sure you are in the root folder of the dockit directory, which is 'dockit'.
* Install npm if you haven't. Follow instrucions [here](https://docs.npmjs.com/getting-started/installing-node)
* Install MongoDB, Follow instructions [here](https://www.npmjs.com/package/mongodb)
* npm install
* bower install
* Navigate to the /dockit/server folder and run `jasmine init` (this is for setting up server side specs)
* Navigate to the /dockit folder and run `gulp serve`

At this point, you should have the app setup complete.

#### Running the App

* Open a new terminal window and run the command 'mongod'.
* You should now see that Mongo server is running

![Alt text](img/Mongod.png "Mongod Server Running")

* Open another terminal window and run the command 'gulp serve' to have the server running.
* With default settings, the app should automatically pop up in a new web browser window.
* (Skip this if previous step was successful) If not, open a new web browser window and in the URL bar, type in 'localhost:3000'. This should redirect you to the landing page of the app.
* You should see the landing page as shown below:

![Eggercise Landing Page](img/LandingPage.png "Eggercise Landing Page")
