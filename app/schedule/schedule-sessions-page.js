const ScheduleSessionsViewModel = require('./schedule-sessions-view-model')

let onNavigatingTo = (args) => {
	const component = args.object
	component.bindingContext = new ScheduleSessionsViewModel()
}

exports.onNavigatingTo = onNavigatingTo
