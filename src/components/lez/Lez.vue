<template>

	<div id="lez-container" class="w3-cell-row">
		<div id="lez-toolbar" class="w3-cell">

		</div>
		<div id="map-container" class="w3-cell">
			<div id="lez-map"/>
		</div>
	</div>



</template>

<script lang="coffee">

import L from "leaflet"
import "leaflet/dist/leaflet.css"

redIcon = L.icon({
    iconUrl: 'red_marker.png',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
})

export default

	props:
		establishments:
			required: true
			type: Array
	
	data: () ->
		lmap: null
		ctrlPressed: false
		perimeter: []
		points: []

	methods:
		buildMap: () ->
			this.lmap = L.map('lez-map').setView([0, 0], 1)
			console.log this.lmap
			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(this.lmap)

			L.control.scale().addTo(this.lmap)

		centerMap: () ->
			topLeft = [-Infinity, Infinity]
			bottomRight = [Infinity, -Infinity]

			for establishment in this.establishments
				do (establishment) ->
					if establishment.location[0] > topLeft[0]
						topLeft[0] = establishment.location[0]

					if establishment.location[1] < topLeft[1]
						topLeft[1] = establishment.location[1]

					if establishment.location[0] < bottomRight[0]
						bottomRight[0] = establishment.location[0]

					if establishment.location[1] > bottomRight[1]
						bottomRight[1] = establishment.location[1]

			console.log topLeft
			console.log bottomRight
			this.lmap.fitBounds([topLeft, bottomRight])

		buildMode: () ->
			self = this
			this.lmap.on("keydown", (event) ->
				if event.originalEvent.code == "ControlLeft"
					self.ctrlDown = true
				)
			this.lmap.on("keyup", (event) ->
				if event.originalEvent.code == "ControlLeft"
					self.ctrlDown = false
				)

			this.lmap.on("click", (event) ->
				if self.ctrlDown
					self.perimeter.push(event.latlng)
					point = L.marker(
						event.latlng,
						icon: redIcon
						draggable: true
						autoPan: true
					)
					self.points.push(point)
					point.addTo(self.lmap)

					if self.points.length > 1
						startPoint = self.points[self.points.length - 2]
						line = L.polyline([
							startPoint.getLatLng(),
							point.getLatLng()
							])
						line.addTo(self.lmap)

						point.on("move", (event) ->
							line.setLatLngs([
									line.getLatLngs()[0]
									event.latlng
								])
							)

						startPoint.on("move", (event) ->
							line.setLatLngs([
									event.latlng
									line.getLatLngs()[1]
								])
							)

				)

	
	mounted: () ->
		this.buildMap()
		this.buildMode()

</script>



<style>
#lez-container {
	height: 100%;
}

#lez-toolbar {
	width: 25%;
	height: 100%;
}

#map-container {
	width: 75%;
	height: 100%;
	margin-left: auto;
	margin-right: auto;
}

#lez-map {
	width: 100%;
	height: 100%;
}
</style>
