<template>
	<div class="w3-container">
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
	</div>
</template>

<script lang="coffee">

	redIcon = L.icon({
		iconUrl: 'red_marker.png',
		iconSize: [30, 30],
		iconAnchor: [15, 15],
	})

	export default

		props:
			lmap:
				required: true

		data: () ->
			ctrlPressed: false
			points: []
			lines: []
			polygon: null
			closeLine: null
			mode: "view"


		methods:
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
						self.buildPoint(event.latlng)
					)

			closeLineMoveHandler: (event) ->
				this.closeLine.setLatLngs([
					event.latlng,
					this.closeLine.getLatLngs()[1]
				])

			buildPoint: (coordinates) ->
					point = L.marker(
						coordinates,
						icon: redIcon
						draggable: true
						autoPan: true
					)
					point.addTo(this.lmap)
					this.points.push(point)


					if this.points.length > 1
						startPoint = this.points[this.points.length - 2]
						line = L.polyline([
							startPoint.getLatLng(),
							point.getLatLng()
							])
						line.addTo(this.lmap)
						this.lines.push(line)

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

					if this.points.length == 3
						this.closeLine = L.polyline([
							this.points[2].getLatLng(),
							this.points[0].getLatLng(),
							]).addTo(this.lmap)

						self = this
						this.points[0].on("move", (event) ->
								self.closeLine.setLatLngs([
									self.closeLine.getLatLngs()[0],
									event.latlng
								])
							)
						this.points[2].on("move", this.closeLineMoveHandler)

					if this.points.length > 3
						this.closeLine.setLatLngs([
							this.points[this.points.length - 1].getLatLng(),
							this.points[0].getLatLng()
							])

						this.points[this.points.length - 2].off("move", this.closeLineMoveHandler)
						this.points[this.points.length - 1].on("move", this.closeLineMoveHandler)



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

			load: (perimeter) ->
				this.clear()

				self = this
				for coordinates in perimeter
					do (coordinates) ->
						self.buildPoint(L.latLng(coordinates[0], coordinates[1]))

				self.viewMode()


			getPoints: () ->
				this.points

		###
		mounted: () ->
			self = this
			this.$nextTick(() ->
				self.buildMode()
				)
		###


</script>
