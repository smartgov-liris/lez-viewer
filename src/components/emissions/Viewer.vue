<template>
	<div id="viewer-container" class="w3-cell-row">
		<div id="viewer-toolbar" class="w3-cell w3-cell-top">
			<accordion label="Data" expand>
				<viewer-data-loader
					ref="dataLoader"
					class="w3-container"
					v-on:loaded="handleDataLoaded"
					/>
			</accordion>

			<accordion label="Display">
			<display-config
				ref="displayConfig"
				v-bind:lmap="lmap"
				v-bind:boundingBox="boundingBox"
				v-bind:establishments="establishments"
				v-bind:tiles="tiles"/>
			</accordion>

			<accordion label="Zoom">
			<zoom-config
				v-bind:lmap="lmap"
				/>
			</accordion>

			<accordion label="Tiles" expand>
			<tiles-config
				ref="colorConfig"
				v-bind:lmap="lmap"
				v-bind:tiles="tiles"
				v-bind:pollutionPeeks="pollutionPeeks"
				/>
			</accordion>

		</div>
		<div id="viewer-map-container" class="w3-cell">
			<div id="viewer-map"/>

			<tile-popup v-if="selectedTile" v-bind:tile="selectedTile">
			</tile-popup>
			<establishment-popup
				v-if="selectedEstablishment"
				v-bind:lmap="lmap"
				v-bind:establishment="selectedEstablishment"
				v-bind:establishments="establishments"
				/>
		</div>
	</div>

</template>

<script lang="coffee">

import L from "leaflet"
import "leaflet/dist/leaflet.css"

import TilePopup from "./map/TilePopup"
import EstablishmentPopup from "./map/EstablishmentPopup"
import DisplayConfig from "./toolbar/DisplayConfig"
import ZoomConfig from "./toolbar/ZoomConfig"
import TilesConfig from "./toolbar/TilesConfig"
import ViewerDataLoader from "./toolbar/ViewerDataLoader"
import Accordion from "../utils/Accordion"


export default

	components:
		"tile-popup": TilePopup
		"establishment-popup": EstablishmentPopup
		"display-config": DisplayConfig
		"zoom-config": ZoomConfig
		"tiles-config": TilesConfig
		"viewer-data-loader": ViewerDataLoader
		"accordion": Accordion

	data: () ->
		lmap: null
		mapInitialized: false # A flag to determine if we sould fly to bounds again
		boundingBox: null
		pollutionPeeks: {}
		establishments: {}
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
			this.buildTiles(data.tiles)
			this.buildEstablishments(data.establishments)

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
					circle.on(
						click: () ->
							self.selectedEstablishment = establishment
						)
					establishment.mapObject = circle
					self.$set(self.establishments, establishment.id, establishment)


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

			fileName = self.$refs.dataLoader.getTilesFile().name
			self.$set(self.pollutionPeeks, fileName, {})
			for pollutant, peek of tiles.pollutionPeeks
				do (pollutant, peek) ->
					self.$set(self.pollutionPeeks[fileName], pollutant, peek)

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

		clear: () ->
			if this.boundingBox
				this.boundingBox.remove()
				this.boundingBox = null

			establishment.mapObject.remove() for _, establishment of this.establishments

			for tileLine in Object.values(this.tiles)
				do (tileLine) ->
					for tile in Object.values(tileLine)
						do (tile) ->
							tile.mapObject.remove()
			this.selectedEstablishment = null
			this.selectedTile = null
			this.$refs.displayConfig.refresh()


	mounted: () ->
		this.buildMap()

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
