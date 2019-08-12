<template>

	<div id="viewer-map-container">
		<div id="lez-map"/>

		<tile-popup v-if="selectedTile" v-bind:tile="selectedTile">
		</tile-popup>
	</div>

</template>

<script lang="coffee">

import L from "leaflet"
import "leaflet/dist/leaflet.css"

import TilePopup from "./map/TilePopup"

###
value in [0, 1]
###
linearHueGradient = (min, max, value) ->
	"hsl(#{min + value * (max - min)},100%,50%)"

export default

	components:
		"tile-popup": TilePopup

	props:
		establishments:
			required: true
			type: Array

	data: () ->
		lmap: null
		pollutant: "NOx"
		pollutionPeeks: {}
		selectedEstablishment: null
		tiles: {}
		selectedTile: null

	methods:
		buildMap: () ->
			this.lmap = L.map('lez-map').setView([0, 0], 1)
			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(this.lmap)

			L.control.scale().addTo(this.lmap)

		displayEstablishments: () ->
			self = this
			for establishment in this.establishments
				do (establishment) ->
					circle = L.circle(establishment.location).addTo(self.lmap)
					if Object.keys(establishment.rounds).length
						circle.setStyle(
							color: "black"
							)
					else
						circle.setStyle(
							color: "red"
							)
					establishment.mapObject = circle
			this.selectedEstablishment = self.establishments[0].mapObject


		fetchTiles: () ->
			url = "tiles/no_lez_tiles_1000.json"
			self = this

			fetch(url)
			.catch((error) ->
				console.log error
			)
			.then((response) ->
				response.json()
			)
			.then((json) ->
				console.log json.tiles
				self.tiles = json.tiles

				simulatedZone = L.rectangle(json.bounds)
				simulatedZone.setStyle(
					fill: false
					color: "black"
					)
				simulatedZone.addTo(self.lmap)

				self.lmap.flyToBounds(json.bounds)

				self.pollutionPeeks = json.pollutionPeeks

				for tileLine in Object.values(json.tiles)
					do (tileLine) ->
						for tile in Object.values(tileLine)
							do (tile) ->
								lRectangle = L.rectangle(tile.bounds)
									.addTo(self.lmap)

								lRectangle.setStyle(
									stroke: false
									fillColor: linearHueGradient(200, 0, Math.min(1, tile.pollution[self.pollutant] / self.pollutionPeeks[self.pollutant]))
									fillOpacity: 0.5
									)
								lRectangle.on(
									click: () -> self.selectedTile = tile
								)
								tile.lRectangle = lRectangle
			)


	mounted: () ->
		this.buildMap()
		this.fetchTiles()

</script>

<style>
#viewer-map-container {
	width: 100%;
	height: 100%;
	margin-left: auto;
	margin-right: auto;
}

#lez-map {
	width: 100%;
	height: 100%;
}
</style>
