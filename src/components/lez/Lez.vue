<template>

	<div id="lez-container" class="w3-cell-row">
		<div id="lez-toolbar" class="w3-cell w3-cell-top">
			<accordion label="Perimiter" expand>
			<perimeter
				class="w3-margin"
				ref="perimeter"
				v-bind:lmap="lmap"
				/>
			</accordion>

			<accordion label="Allowed vehicles" expand>
			<crit-air
				ref="critAir"
				/>
			</accordion>
			
			<accordion label="Download" expand>
			<button
				class="w3-green w3-button w3-round w3-margin"
				v-on:click="downloadJson">
				<i class="fa fa-download fa-lg"></i>
				Download JSON
			</button>
			</accordion>

			<accordion label="Import" expand>
			<div class="w3-margin">
			<data-loader
				ref="lezLoader"
				v-on:select="lezFileReady = true"
				v-on:loaded="handleLoadedLez"
				/>

			<button
				class="w3-green w3-button w3-round"
				v-bind:disabled="!lezFileReady"
				v-on:click="loadLez">
				<i class="fa fa-upload fa-lg"></i>
				Load JSON
			</button>
			</div>
			</accordion>

		</div>
		<div id="lez-map-container" class="w3-cell">
			<div id="lez-map"/>
		</div>
	</div>



</template>

<script lang="coffee">

import L from "leaflet"
import download from "downloadjs"
import "leaflet/dist/leaflet.css"

import Perimeter from "./toolbar/Perimeter"
import CritAir from "./toolbar/CritAir"
import DataLoader from "../loader/DataLoader"
import Accordion from "../utils/Accordion"

export default

	components:
		"perimeter": Perimeter
		"crit-air": CritAir
		"data-loader": DataLoader
		"accordion": Accordion

	props:
		establishments:
			required: true
			type: Array
	
	data: () ->
		lmap: null
		lezFileReady: false

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

		downloadJson: () ->
			lez =
				perimeter: []
				allowed: []

			console.log CritAir
			lez.perimeter.push([point.getLatLng().lat, point.getLatLng().lng]) for point in this.$refs.perimeter.getPoints()
			lez.allowed.push(CritAir.critairEnum[critair]) for critair in this.$refs.critAir.getAllowedCritAirs()

			download(JSON.stringify(lez, null, "\t"), "lez.json", "application/json")

		loadLez: () ->
			this.$refs.lezLoader.load()

		handleLoadedLez: (lez) ->
			this.$refs.perimeter.load(lez.perimeter)
			this.$refs.critAir.load(lez.allowed)
	
	mounted: () ->
		this.buildMap()

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
