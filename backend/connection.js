const mongoose = require('mongoose');

const url = 'mongodb+srv://rairoshika201:1234@cluster0.m1ixonc.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0'

// asynchrounous function - promise object
mongoose.connect(url)
.then((result) => {
    console.log('database connected');
}).catch((err) => {
    console.log(err);
});


module.exports = mongoose;

