<template>

	<div id="map-container">
		<div id="lez-map"/>

		<tile-popup v-if="selectedTile" v-bind:tile="selectedTile">
		</tile-popup>
	</div>

</template>

<script lang="coffee">

import L from "leaflet"
import "leaflet/dist/leaflet.css"

import TilePopup from "./map/TilePopup"

export default

	components:
		"tile-popup": TilePopup

	data: () ->
		lmap: null
		pollutant: "NOx"
		pollutionPeeks: {}
		establishments: []
		selectedEstablishment: null
		tiles: {}
		selectedTile: null

	methods:
		buildMap: () ->
			this.lmap = L.map('lez-map').setView([0, 0], 1)
			console.log this.lmap
			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(this.lmap)

			L.control.scale().addTo(this.lmap)

		fetchTiles: () ->
			url = "tiles/tiles.json"
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
									fillColor: "blue"
									fillOpacity: tile.pollution[self.pollutant] / self.pollutionPeeks[self.pollutant]
									)
								if !tile.pollution[self.pollutant]
									if !(tile.pollution[self.pollutant] == 0)
										console.log tile
								lRectangle.on({
									click: () -> self.selectedTile = tile
								})
								tile.lRectangle = lRectangle
			)

		fetchEstablishments: () ->
			url = "establishments/establishments.json"
			self = this
			
			fetch(url)
			.catch((error) ->
				console.log error
			)
			.then((response) ->
				response.json()
			)
			.then((json) ->
				# self.establishments = json

				for establishment in json
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
						self.establishments.push(establishment)
						

				self.selectedEstablishment = self.establishments[0].mapObject
				)






	mounted: () ->
		this.buildMap()
		this.fetchTiles()
		this.fetchEstablishments()

</script>

<style>
#map-container {
	width: 90%;
	height: 800px;
	margin-left: auto;
	margin-right: auto;
}

#lez-map {
	width: 100%;
	height: 100%;
}
</style>
