const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')


const newUserSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
    },
    username: {
        type: String,
        // required: true,
    },
    password:
    {
        type: String,
        // required: true,
    },
    phoneno:
    {
        type: Number,
        // required: true,
    }
});

newUserSchema.methods.generateAuthToken = async () => {
    const token = jwt.sign({ _id: this._id}, 'mykey');
    console.log(token);
    return token;
}
const newUser = mongoose.model('newUser', newUserSchema);


module.exports = { newUser }