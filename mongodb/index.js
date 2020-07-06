const mongoose = require("mongoose")

mongoose.connect('mongodb+srv://admin:admin@cluster0.hc02q.mongodb.net/login', { useNewUrlParser: true, useUnifiedTopology: true })

const userSchema = new mongoose.Schema({
	username: String,
	email: String,
	password: String,
	confirmPassword: String
})

const User = mongoose.model('user', userSchema)

module.exports = User

