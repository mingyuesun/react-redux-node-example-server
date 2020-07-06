const express = require('express')
const router = express.Router()
const User = require('../mongodb/index')
const isEmpty = require('lodash/isEmpty')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const config = require('../config')

const validatorInput = (data) => {
	let errors = {}
	if (validator.isEmpty(data.username)){
		errors.username = "请输入用户名"
	}
	if (validator.isEmpty(data.password)){
		errors.password = "请输入密码"
	}
	return {
		errors,
		isValid: isEmpty(errors)
	}
}

router.post('/', (req, res) => {
	const { errors, isValid } = validatorInput(req.body)
	if (isValid) {
		const { username, password } = req.body
		User.find({"username": username, "password": password}, (err, data) => {
			if (data.length > 0) {
				const token = jwt.sign({
					id: data[0].id,
					username: data[0].username
				}, config.jwtSecret)
        res.status(200).send({success: true, token})
			} else {
				errors.message = "用户名或密码错误"
			  res.status(401).json(errors)
			}
		})
	} else {
		res.status(400).json(errors)
	}
})

module.exports = router