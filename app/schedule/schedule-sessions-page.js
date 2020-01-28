const dialogs = require('tns-core-modules/ui/dialogs')
const ScheduleSessionsViewModel = require('./schedule-sessions-view-model')
const firebase = require('nativescript-plugin-firebase')

const viewModel = new ScheduleSessionsViewModel()

const fn = firebase.functions.httpsCallable('helloName')

let onNavigatingTo = args => {
	const component = args.object
	component.bindingContext = viewModel
}

// firebase
// 	.logout()
// 	.then(() => {
// 		console.log('LOG OUT')
// 	})
// 	.catch(e => console.error('ERROR', e))

// firebase
// 	.sendPasswordResetEmail('alex.marchi99@gmail.com')
// 	.then(() => {
// 		console.log('EMAIL SENT')
// 	})
// 	.catch(e => console.error('ERROR', e))

// let onNavigatingTo = args => {
//	const component = args.object
//	component.bindingContext = new ScheduleSessionsViewModel()
// }

let showDialog = () => {
	console.log('> LOGIN:')

	firebase
		.getCurrentUser()
		.then(user => {
			console.log('> CURRENT USER:', user)
		})
		.catch(error => console.error('> CURRENT USER:', error))

	dialogs
		.login({
			title: 'Login',
			message: 'Enter Credentials',
			okButtonText: 'Submit',
			cancelButtonText: 'Cancel',
			// userName: '',
			// password: '',
			// neutralButtonText: 'Recovery Password',
		})
		.then(dialog => {
			firebase.getCurrentUser().then(user => {
				console.log('> CURRENT USER:', user)
			})

			console.log(
				`> RESULT: ${dialog.result}, USER: ${dialog.userName}, PWD: ${dialog.password}`
			)

			if (dialog.result) {
				firebase
					.login({
						type: firebase.LoginType.PASSWORD,
						passwordOptions: {
							email: dialog.userName,
							password: dialog.password,
						},
					})
					.then(result => {
						// console.log('ok', result)
						alert({
							title: 'Success',
							message: `Hi, ${result.email}`,
							okButtonText: 'Ok',
						})

						viewModel.set('isLogged', true)

						if (!result.emailVerified) {
							console.log('> VERIFIED EMAIL: ', result.emailVerified)
						}
					})
					.catch(error => {
						alert({
							title: 'Error',
							message: error,
							okButtonText: 'Ok',
						})

						viewModel.set('isLogged', false)
						console.error('> ERROR', error)
					})
			} else {
				console.log('CANCEL')
			}
		})
}

exports.onNavigatingTo = onNavigatingTo
exports.showDialog = showDialog
exports.showFunction = () => {
	fn('Firebase from NativeScript')
		.then(myData => {
			alert({
				title: 'Firebase Functions Output',
				message: myData.messaggio,
				okButtonText: 'OK',
			})
		})
		.catch(err => {
			alert({
				title: 'Error',
				message: err,
			})
		})
}
