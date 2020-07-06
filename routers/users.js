const express = require('express')
const router = express.Router()
const isEmpty = require('lodash/isEmpty')
const validator = require('validator')
const sqlFn = require('../mysql/index')
const User = require('../mongodb/index')

const validatorInput = (data) => {
	let errors = {}
	if (validator.isEmpty(data.username)){
		errors.username = "请输入用户名"
	}
	if (!validator.isEmail(data.email)){
		errors.email = "请输入email"
	}
	if (validator.isEmpty(data.password)){
		errors.password = "请输入密码"
	}
	if (validator.isEmpty(data.confirmPassword)){
		errors.confirmPassword = "请确认密码"
	}
	if (!validator.equals(data.password, data.confirmPassword)){
		errors.confirmPassword = "两次密码不一致"
	}
	return {
		errors,
		isValid: isEmpty(errors)
	}
}

router.post('/', (req, res) => {
	const { errors, isValid } = validatorInput(req.body)
	if (isValid){
		// res.status(200).send({success: true})
		// const sql = "insert into users values (null, ?, ?, ?, ?)"
		const { username, email, password, confirmPassword } = req.body
		// const array = [username, email, password, confirmPassword]
		// sqlFn(sql, array, (data) => {
		// 	if (data.affectedRows) {
		// 		res.status(200).send({success: true})
		// 	} else {
		// 		res.status(400).json({error: "注册失败！"})
		// 	}
		// })
    User({username, email, password, confirmPassword}).save((error, data) => {
			if (error) {
				res.status(400).json({error: "注册失败！"})
			} else {
				res.status(200).send({success: true})
			}
		}) 
	} else {
    res.status(400).json(errors)
	}
})

router.get('/:username', (req, res) => {
	// const sql = "select * from users where `username`=?"
	// const array = [req.params.username]
	// sqlFn(sql, array, (data) => {
	// 	if (data) {
	// 		console.log(data)
	// 		res.send(data)
	// 	} else {
	// 		res.send({})
	// 	}
	// })
  User.find({"username": req.params.username}, (err, data) => {
		res.send(data)
	})
})

module.exports = router