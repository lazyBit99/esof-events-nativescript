const MapViewModel = require('./map-view-model')
const Image = require('tns-core-modules/ui/image').Image
const ImageSource = require('tns-core-modules/image-source')
const mapsModule = require('nativescript-google-maps-sdk')
const geoJson = require('./data')

function onNavigatingTo(args) {
	const component = args.object
	component.bindingContext = new MapViewModel()
}

function onMapReady(args) {
	const mapView = args.object

	geoJson.features.forEach(feature => {
		console.log('feature', feature.geometry.coordinates[0])

		const marker = new mapsModule.Marker()
		marker.position = mapsModule.Position.positionFromLatLng(
			feature.geometry.coordinates[1],
			feature.geometry.coordinates[0],
		)

        marker.title = feature.properties.name

       

        // marker.icon = myIcon
		marker.color = 254 // hue value
		marker.userData = { index: 1 }
		mapView.addMarker(marker)
	})
}

exports.onMapReady = onMapReady
exports.onNavigatingTo = onNavigatingTo
