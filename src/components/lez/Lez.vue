<template>

	<div id="lez-container" class="w3-cell-row">
		<div id="lez-toolbar" class="w3-cell w3-cell-top">
			<h3>Perimiter</h3>
			<div class="w3-bar">
				<button
					v-if="mode == 'view'"
					class="w3-blue w3-button w3-round w3-margin-right"
					v-on:click="buildMode">
					<i class="fa fa-pencil-ruler fa-lg"></i>
				</button>
				<button
					v-if="mode == 'build'"
					class="w3-blue w3-button w3-round w3-margin-right"
					v-on:click="viewMode">
					<i class="fa fa-draw-polygon fa-lg"></i>
				</button>

				<button
					class="w3-red w3-button w3-round w3-margin-right"
					v-on:click="clear">
					<i class="fa fa-eraser fa-lg"></i>
				</button>
			</div>
			<p v-if="mode == 'build'">
				<i>Click on the map, and use CTRL+Click to add points.</i>
			</p>

			<h3> Allowed vehicles </h3>
			<div v-for="(label, critair) in critairs">
			<input class="w3-check" type="checkbox" v-bind:value="critair" v-model="allowed">
			<label> {{label}} </label>
			</div>

			
			<h3 class="w3-margin-top"> Download </h3>
			<button class="w3-green w3-button w3-round">
				<i class="fa fa-download fa-lg"></i>
				Download JSON
			</button>

		</div>
		<div id="lez-map-container" class="w3-cell">
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

critairEnum =
	critair1: "CRITAIR_1"
	critair2: "CRITAIR_2"
	critair3: "CRITAIR_3"
	critair4: "CRITAIR_4"
	critair5: "CRITAIR_5"

export default

	props:
		establishments:
			required: true
			type: Array
	
	data: () ->
		lmap: null
		ctrlPressed: false
		points: []
		lines: []
		polygon: null
		closeLine: null
		mode: "view"
		critairs:
			critair1: "CRIT'air 1"
			critair2: "CRIT'air 2"
			critair3: "CRIT'air 3"
			critair4: "CRIT'air 4"
			critair5: "CRIT'air 5"
		allowed: []

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
			console.log "Enter build mode"

			this.mode = "build"

			if this.polygon
				this.polygon.remove()

			_point.addTo(this.lmap) for _point in this.points
			_line.addTo(this.lmap) for _line in this.lines

			if this.closeLine
				this.closeLine.addTo(this.lmap)

			self = this

			closeLineMoveHandler = (event) ->
				self.closeLine.setLatLngs([
					event.latlng,
					self.closeLine.getLatLngs()[1]
					])

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
					point = L.marker(
						event.latlng,
						icon: redIcon
						draggable: true
						autoPan: true
					)
					point.addTo(self.lmap)
					self.points.push(point)


					if self.points.length > 1
						startPoint = self.points[self.points.length - 2]
						line = L.polyline([
							startPoint.getLatLng(),
							point.getLatLng()
							])
						line.addTo(self.lmap)
						self.lines.push(line)

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

					if self.points.length == 3
						self.closeLine = L.polyline([
							self.points[2].getLatLng(),
							self.points[0].getLatLng(),
							]).addTo(self.lmap)

						self.points[0].on("move", (event) ->
								self.closeLine.setLatLngs([
									self.closeLine.getLatLngs()[0],
									event.latlng
								])
							)
						self.points[2].on("move", closeLineMoveHandler)

					if self.points.length > 3
						self.closeLine.setLatLngs([
							self.points[self.points.length - 1].getLatLng(),
							self.points[0].getLatLng()
							])

						self.points[self.points.length - 2].off("move", closeLineMoveHandler)
						self.points[self.points.length - 1].on("move", closeLineMoveHandler)


				)
		viewMode: () ->
			this.lmap.off("keydown")
			this.lmap.off("keyup")
			this.lmap.off("click")

			this.mode = "view"
			point.remove() for point in this.points
			line.remove() for line in this.lines
			if this.closeLine
				this.closeLine.remove()

			perimeter = []
			perimeter.push(point.getLatLng()) for point in this.points
			this.polygon = L.polygon(
				perimeter,
				color: "green"
			)
			this.polygon.addTo(this.lmap)

		clear: () ->
			_point.remove() for _point in this.points
			_line.remove() for _line in this.lines
			if this.closeLine
				this.closeLine.remove()

			this.points = []
			this.lines = []
			this.closeLine = null

			if this.polygon
				this.polygon.remove()


	
	mounted: () ->
		this.buildMap()
		this.buildMode()

</script>



<style>
#lez-container {
	height: 100%;
}

#lez-toolbar {
	height: 100%;
}

#lez-map-container {
	height: 100%;
	width: 75%;
	padding-bottom: 8px;
}

#lez-map {
	width: 100%;
	height: 100%;
}
</style>
