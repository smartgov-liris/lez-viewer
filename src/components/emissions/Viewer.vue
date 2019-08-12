<template>
	<div id="viewer-container" class="w3-cell-row">
		<div id="viewer-toolbar" class="w3-cell w3-cell-top">
			<h3 class="w3-margin-top"> Data </h3>
			<viewer-data-loader
				v-on:loaded="handleDataLoaded"
				/>

			<h3> Display </h3>
			<display-config
				ref="displayConfig"
				v-bind:lmap="lmap"
				v-bind:boundingBox="boundingBox"
				v-bind:establishments="establishments"
				v-bind:tiles="tiles"/>

			<h3> Zoom </h3>
			<zoom-config
				v-bind:lmap="lmap"
				/>

			<h3> Color </h3>
			<color-config
				ref="colorConfig"
				v-bind:lmap="lmap"
				v-bind:tiles="tiles"
				v-bind:pollutionPeeks="pollutionPeeks"
				/>
		</div>
		<div id="viewer-map-container" class="w3-cell">
			<div id="viewer-map"/>

			<tile-popup v-if="selectedTile" v-bind:tile="selectedTile">
			</tile-popup>
		</div>
	</div>

</template>

<script lang="coffee">

import L from "leaflet"
import "leaflet/dist/leaflet.css"

import TilePopup from "./map/TilePopup"
import DisplayConfig from "./toolbar/DisplayConfig"
import ZoomConfig from "./toolbar/ZoomConfig"
import ColorConfig from "./toolbar/ColorConfig"
import ViewerDataLoader from "./toolbar/ViewerDataLoader"


export default

	components:
		"tile-popup": TilePopup
		"display-config": DisplayConfig
		"zoom-config": ZoomConfig
		"color-config": ColorConfig
		"viewer-data-loader": ViewerDataLoader

	data: () ->
		lmap: null
		mapInitialized: false # A flag to determine if we sould fly to bounds again
		boundingBox: null
		pollutionPeeks: {}
		establishments: []
		selectedEstablishment: null
		tiles: {}
		selectedTile: null

	methods:
		buildMap: () ->
			this.lmap = L.map('viewer-map').setView([0, 0], 1)
			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(this.lmap)

			L.control.scale().addTo(this.lmap)

		handleDataLoaded: (data) ->
			this.clear()
			this.buildEstablishments(data.establishments)
			this.buildTiles(data.tiles)

		buildEstablishments: (establishments) ->
			self = this
			for establishment in establishments
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
			this.selectedEstablishment = self.establishments[0].mapObject


		buildTiles: (tiles) ->
			self = this
			self.boundingBox = L.rectangle(tiles.bounds)
			self.boundingBox.setStyle(
				fill: false
				color: "black"
				)
			self.boundingBox.addTo(self.lmap)

			if !this.mapInitialized
				this.mapInitialized = true
				self.lmap.flyToBounds(tiles.bounds)

			for pollutant, peek of tiles.pollutionPeeks
				do (pollutant, peek) ->
					self.$set(self.pollutionPeeks, pollutant, peek)

			for lineIndex, tileLine of tiles.tiles
				do (lineIndex, tileLine) ->
					self.$set(self.tiles, lineIndex, {})
					for columnIndex, tile of tileLine
						do (columnIndex, tile) ->
							lRectangle = L.rectangle(tile.bounds)
								.addTo(self.lmap)

							lRectangle.on(
								click: () -> self.selectedTile = tile
							)
							tile.mapObject = lRectangle
							self.$set(self.tiles[lineIndex], columnIndex, tile)

			self.$refs.colorConfig.updateTilesColors()
			# )
		clear: () ->
			if this.boundingBox
				this.boundingBox.remove()
				this.boundingBox = null

			# this.pollutionPeeks = {}
			establishment.mapObject.remove() for establishment in this.establishments
			this.establishments = []

			for tileLine in Object.values(this.tiles)
				do (tileLine) ->
					for tile in Object.values(tileLine)
						do (tile) ->
							tile.mapObject.remove()
			# this.tiles = {}
			this.selectedEstablishment = null
			this.selectedTile = null
			this.$refs.displayConfig.refresh()


	mounted: () ->
		this.buildMap()
		# this.fetchTiles()

</script>

<style>
#viewer-container {
	height: 100%;
}

#viewer-toolbar {
	height: 100%;
}

#viewer-map-container {
	width: 75%;
	height: 100%;
	margin-left: auto;
	margin-right: auto;
}

#viewer-map {
	width: 100%;
	height: 100%;
}
</style>
