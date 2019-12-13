const observableModule = require('tns-core-modules/data/observable')
const data = require('./data')

const redata = data.map(session => {
	session.subtitle = `${session.inizio} — ${session.fine} @ ${session.luogo}`
	return session
})

function ScheduleSessionsViewModel() {
	const viewModel = observableModule.fromObject({
		sessions: redata,
		myGroupingFunc: session => {
			return session.group
		},
	})

	return viewModel
}

module.exports = ScheduleSessionsViewModel
