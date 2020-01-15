const ObservableArray = require('tns-core-modules/data/observable-array').ObservableArray
const firebase = require('nativescript-plugin-firebase/app')

let speakersObservable = new ObservableArray()
let speakers = firebase.firestore().collection('speakers')

speakers.get().then(documents => {
	documents.forEach(document => {
		let speaker = document.data()
		speakersObservable.push(speaker)
	})
})

function cardToViewModel() {
	const viewModel = {
		speakers: speakersObservable
	}

	return viewModel
}

module.exports = cardToViewModel
