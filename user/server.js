const express = require('express');
const app = require('./app');

app.listen(3001, () => {
    console.log('user service is running on port 3001');
})
