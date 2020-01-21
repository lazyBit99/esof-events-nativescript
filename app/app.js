const application = require('tns-core-modules/application')
const config = require('./config')
const firebase = require('nativescript-plugin-firebase/app')
const APIKey =
	config.google.map.provideAPIKey || 'AIzaSyCP6f-dKamOLNSpy2nU34Xi4aQlB-sgNRo'

// Google Maps SDK API KEY
if (application.ios) {
	GMSServices.provideAPIKey(APIKey)
}

firebase
	.initializeApp({
		iOSEmulatorFlush: false,
		persist: false,
		onAuthStateChanged: data => {
			console.log(data.loggedIn ? 'LOGGED' : 'LOGGED OUT')
			if (data.loggedIn) {
				console.log('DATA', data)
			}
		},
	})
	.then(
		() => {
			console.log('START')
		},
		error => {
			console.error('ERROR' + error)
		}
	)

application.run({ moduleName: 'app-root' })

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
