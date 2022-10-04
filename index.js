const express = require('express')
const bodyParser = require('body-parser')
const vseval = require('./requests/apival')
const valspace = require('./requests/valspace')
const otheraddr = require('./requests/otheraddr')
const txrequest = require('./requests/txrequest')
const app = express()


app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.get('/', (req, res) => {	
	res.render('index', {valiki: false})
})
app.get('/active', async (req, res) => {
	const valiki = await vseval('active')
    var arrval = valspace(valiki)    
	res.render('index', {valiki: arrval})
})
app.get('/inactive', async (req, res) => {	
	const valiki = await vseval('inactive')
    var arrval = valspace(valiki)
	res.render('index', {valiki: arrval})
})
app.get('/etc', async (req, res) => {	
	const otheradr = await otheraddr(req.query.w)
    var arrval = valspace(otheradr)
	//res.render('index', {valiki: arrval})
	
	
	
	res.render('tx', {txres: false, tx: false, otheradr: arrval})
})
app.post('/tx', async (req, res) => {
	const { tx } = req.body
	const valiki = await txrequest(tx)
	if (valiki) {
		txres = valspace(valiki)
	}else{
		txres = false
	}
	
	res.render('tx', {txres: txres, tx: tx, otheradr: false})
}) 

app.listen(3333, () => {
	console.log('Server started on port 3333')
})
