const express = require('express')
const routers = require('./routers/index')

const app = express()

app.use('/api/users', routers.users)

app.listen(3300, (req, res) => {
	console.log('Server listening to prot 3300.')
})