const express = require('express');
const app = require('./app');

app.listen(3002, () => {
    console.log('captain service is running on port 3001');
})
