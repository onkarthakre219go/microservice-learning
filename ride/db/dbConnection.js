const mongoose = require('mongoose');

function connect() {
    try{
        mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log('ride service is connected to DB')
        })
    }catch(err) {
        console.log(err)
    }
}