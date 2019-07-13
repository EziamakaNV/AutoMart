[![Build Status](https://travis-ci.org/EziamakaNV/AutoMart.svg?branch=develop)](https://travis-ci.org/EziamakaNV/AutoMart) [![Coverage Status](https://coveralls.io/repos/github/EziamakaNV/AutoMart/badge.svg?branch=develop)](https://coveralls.io/github/EziamakaNV/AutoMart?branch=develop)

### Project Overview
Auto Mart is an online market place for automobiles of diverse makes, model or body type. With Auto Mart , users can sell their cars or buy from trusted dealerships or private sellers

### Technology Stack Used
- Coveralls
- Travis CI
- NodeJs
- Express
- ESLint
- Babel
- Mocha
- Chai
- Postgres SQL

### Feature Requirements
- User can sign up.
- User can login.
- User (seller) can post a car sale advertisement.
- User (buyer) can make a purchase order.
- User (buyer) can update the price of his/her purchase order.
- User (seller) can mark his/her posted AD as sold.
- User (seller) can update the price of his/her posted AD.
- User can view a specific car.
- User can view all unsold cars.
- User can view all unsold cars within a price range.
- Admin can delete a posted AD record.
- Admin can view all posted ads whether sold or unsold.

### Requirements and Installation
Before running the project, install the following
- Node JS
- Git

#### To run
- git clone https://github.com/EziamakaNV/AutoMart.git
- cd AutoMart
- npm install
- npm start

#### To Test
- npm test

### Pivotal Tracker stories
[https://www.pivotaltracker.com/n/projects/2345861](https://www.pivotaltracker.com/n/projects/2345861)

### UI Template
[https://eziamakanv.github.io/AutoMart](https://eziamakanv.github.io/AutoMart)

### Hosted App API Doc
[https://automobile-mart.herokuapp.com/api/v1/docs](https://automobile-mart.herokuapp.com/api/v1/docs)

### Hosted FrontEnd App
[https://eziamakanv.github.io/AutoMartFrontEnd](https://eziamakanv.github.io/AutoMartFrontEnd)

## API Endpoints
POST 'https://automobile-mart.herokuapp.com/api/v1/auth/signup' - Create a user account

POST 'https://automobile-mart.herokuapp.com/api/v1/auth/signin' - Login a user

GET 'https://automobile-mart.herokuapp.com/api/v1/car' - View all car ads whether sold or available (Admins only)

POST 'https://automobile-mart.herokuapp.com/api/v1/car' - Create new car ads

PATCH 'https://automobile-mart.herokuapp.com/api/v1/car/{car_id}/status' - Update the status of a car ad

PATCH 'https://automobile-mart.herokuapp.com/api/v1/car/{car_id}/price' - Update the price of a car ad

GET 'https://automobile-mart.herokuapp.com/api/v1/car/{car_id} - View a specific car ad

DELETE 'https://automobile-mart.herokuapp.com/api/v1/car/{car_id} - Delete a specific car ad

GET 'https://automobile-mart.herokuapp.com/api/v1/car?status=available - View all unsold cars

GET 'https://automobile-mart.herokuapp.com/api/v1/car?status=available&min_price={minPrice}&max_price={maxPrice} - View unsold cars within a price range

POST 'https://automobile-mart.herokuapp.com/api/v1/order' - Create new purchase orders

PATCH 'https://automobile-mart.herokuapp.com/api/v1/order/{orderId}/price - Update the price of a purchase order

## Author

Nnaemeka Valentine Eziamaka