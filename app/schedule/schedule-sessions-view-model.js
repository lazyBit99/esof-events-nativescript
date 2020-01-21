const observableModule = require('tns-core-modules/data/observable')
const ObservableArray = require('tns-core-modules/data/observable-array')
	.ObservableArray
const firebase = require('nativescript-plugin-firebase/app')

let sessions = new ObservableArray()
const schedule = firebase.firestore().collection('schedule')

// let fetch = () => {
schedule.get().then(documents => {
	documents.forEach(document => {
		let session = document.data()
		session.subtitle = `${session.inizio} — ${session.fine} @ ${session.luogo}`
		sessions.push(session)
	})
})
// }

// fetch()

function ScheduleSessionsViewModel() {
	const viewModel = observableModule.fromObject({
		sessions: sessions,
		myGroupingFunc: session => {
			return session.group
		},
		// onPullToRefreshInitiated: args => {
		// 	console.log('> UPDATING')

		// 	sessions = new ObservableArray()

		// 	let listView = args.object

		// 	fetch()
		// 	setTimeout(() => {
		// 		listView.notifyPullToRefreshFinished()
		// 	}, 1000)

		// 	console.log('> DONE')
		// },
		isLogged: false,
	})

	return viewModel
}

module.exports = ScheduleSessionsViewModel
