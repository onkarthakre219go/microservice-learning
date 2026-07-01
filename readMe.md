# MicroServices with Node js

Axios is a popular open-source JavaScript library used to make HTTP requests from web browsers or Node.js environments.

RabbitMQ library (amqplib)
Asynchronous communication
-----------------------------------
amqplib is a Node.js client library and implementation for the Advanced Message Queuing Protocol (AMQP) 0-9-1, primarily designed for interacting with message brokers like RabbitMQ.

CloudAMQP (website)
login and create instances and copy the RABBIT_URL and config in .env file.

# Postman api test
user
----
1. POST register       -> {{base}}/user/register
2. POST login          -> {{base}}/user/login
3. GET profile         -> {{base}}/user/profile
4. GET logout          -> {{base}}/user/logout

ride
-----
1. POST create-ride         -> {{base}}/ride/create-ride

Captain
-------
1. POST register             -> {{base}}/captain/register
2. GET profile               -> {{base}}/captain/profile
3. POST login                -> {{base}}/captain/login
4. GET logout                -> {{base}}/captain/logout
5. PATCH toggle-availability -> {{base}}/captain/toggle-availability
6. GET new-ride              -> {{base}}/captain/new-ride


using long polling and RabbitMQ (captain service calls it (publish))

1. PUT accepted-ride        -> {{base}}/user/accepted-ride
2. GET accept-ride           -> {{base}}/ride/accept-ride?rideId=3453634634