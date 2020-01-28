const functions = require('firebase-functions')
const data = require('./people')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
	response.send(`
    <h1>Hello from Firebase</h1>
    <p>Pagina HTML from <b>Firebase Function</b></p>
  `)
})

exports.helloWorld2 = functions.https.onRequest((req, res) => {
	console.log(req.query.nome)
	res.send(`
    <h1>Ciao ${req.query.nome}</h1>
    <p>Benvenuto 😀</p>
  `)
})

exports.helloWorldJson = functions.https.onRequest((req, res) => {
	res.json({ people: data.data })
})

exports.helloName = functions.https.onCall((data, context) => {
	return {
		status: 'ok',
		messaggio: `Ciao ${data}`,
	}
})

// API a pagamento
// exports.scheduleFunction = functions.pubsub
// 	.schedule('every 1 minutes')
// 	.onRun(context => {
// 		console.log('FIRE ogni minuto')
// 		return null
// 	})
