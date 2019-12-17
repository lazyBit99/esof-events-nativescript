const InformationViewModel = require('./information-view-model')

function onNavigatingTo(args) {
	const component = args.object
	component.bindingContext = new InformationViewModel()
}

function onTap(args) {
	const button = args.object
	const page = button.page
	page.frame.navigate({
		moduleName: 'information/credits/credits-page',
		clearHistory: true,
	})
}

exports.onNavigatingTo = onNavigatingTo
exports.onTap = onTap
