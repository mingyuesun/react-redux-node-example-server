const express = require('express')
const routers = require('./routers/index')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use('/api/users', routers.users)
app.use('/api/auth', routers.auth)

app.listen(3300, (req, res) => {
	console.log('Server listening to prot 3300.')
})