const observableModule = require('tns-core-modules/data/observable')
const data = require('./data')

const dataToSpeakers = data.map(speaker => {
	// speaker.interventocompleto = `${speaker.nome} — ${speaker.inizio} ${speaker.fine}`
	return speaker
})

const dataToInterventi = data.map(interventi => {
	// speaker.interventocompleto = `${speaker.nome} — ${speaker.inizio} ${speaker.fine}`
	return interventi
})

function SpeakerViewModel() {
	const viewModel = observableModule.fromObject({
		speakers: dataToSpeakers,
    })
    
	return viewModel
}


function InterventiViewModel() {
	const viewModel = observableModule.fromObject({
		speakers: dataToInterventi,
    })
    
	return viewModel
}

module.exports = SpeakerViewModel
module.exports = InterventiViewModel
