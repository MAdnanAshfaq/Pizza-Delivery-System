const mongoose = require('mongoose');

const connectToMongoDB = () => {
    mongoose.connect("mongodb://0.0.0.0:27017/pizza")
    .then(() => console.log('Connected!'))
    .catch((err) => console.log(err.message))
}


module.exports = connectToMongoDB