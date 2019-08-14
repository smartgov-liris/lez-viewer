<template>
	<div id="lez-container" class="w3-cell-row">
		<div id="lez-toolbar" class="w3-cell w3-cell-top">
			<accordion label="Data">
			<div class="w3-margin">
			<data-loader
				ref="establishmentsLoader"
				label="Establishments"
				v-on:select="establishmentsFileReady = true"
				v-on:loaded="handleLoadedEstablishments"
				/>
			<button
				class="w3-green w3-button w3-round"
				v-bind:disabled="!establishmentsFileReady"
				v-on:click="loadEstablishments">
				<i class="fa fa-upload fa-lg"></i>
				Load JSON
			</button>
			<p>
			<input type="checkbox" class="w3-check" v-model="displayEstablishments" v-on:change="handleEstablishmentsDisplay"/>
			<label>Display establishments</label>
			</p>
			</div>

			</accordion>
			<accordion label="Tools" expand>
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
			<accordion label="Example">
			<button
				class="w3-button w3-margin w3-blue w3-round w3-large"
				v-on:click="loadExample"
				>
				<i class="fas fa-cloud-download-alt"></i>
				Load example
			</button>
			</accordion>

		</div>
		<div id="lez-map-container" class="w3-cell">
			<div id="lez-map"/>
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
import download from "downloadjs"
import "leaflet/dist/leaflet.css"

import Perimeter from "./toolbar/Perimeter"
import CritAir from "./toolbar/CritAir"
import DataLoader from "../loader/DataLoader"
import Accordion from "../utils/Accordion"
import EstablishmentPopup from "../emissions/map/EstablishmentPopup"

export default

	components:
		"perimeter": Perimeter
		"crit-air": CritAir
		"data-loader": DataLoader
		"accordion": Accordion
		"establishment-popup": EstablishmentPopup
	
	data: () ->
		lmap: null
		lezFileReady: false
		establishmentsFileReady: false
		establishments: {}
		selectedEstablishment: null
		displayEstablishments: true

	methods:
		buildMap: () ->
			this.lmap = L.map('lez-map').setView([0, 0], 1)
			console.log this.lmap
			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(this.lmap)

			L.control.scale().addTo(this.lmap)

		centerMap: (coordinates) ->
			topLeft = [-Infinity, Infinity]
			bottomRight = [Infinity, -Infinity]

			for coordinate in coordinates
				do (coordinate) ->
					if coordinate[0] > topLeft[0]
						topLeft[0] = coordinate[0]

					if coordinate[1] < topLeft[1]
						topLeft[1] = coordinate[1]

					if coordinate[0] < bottomRight[0]
						bottomRight[0] = coordinate[0]

					if coordinate[1] > bottomRight[1]
						bottomRight[1] = coordinate[1]

			console.log "Computed bounds : #{topLeft} #{bottomRight}"
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

		loadEstablishments: () ->
			this.$refs.establishmentsLoader.load()

		handleLoadedLez: (lez) ->
			this.$refs.perimeter.load(lez.perimeter)
			this.$refs.critAir.load(lez.allowed)
			this.centerMap(lez.perimeter)

		handleLoadedEstablishments: (establishments) ->
			self = this
			establishmentsCoordinates = []
			for establishment in establishments
				do (establishment) ->
					circle = L.circle(establishment.location)
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

					establishmentsCoordinates.push(establishment.location)
					
			this.handleEstablishmentsDisplay()
			this.centerMap(establishmentsCoordinates)

		handleEstablishmentsDisplay: () ->
			if this.displayEstablishments
				self = this
				for _, establishment of this.establishments
					do (_, establishment) ->
						establishment.mapObject.addTo(self.lmap)
			else
				for _, establishment of this.establishments
					do (_, establishment) ->
						establishment.mapObject.remove()

		loadExample: () ->
			self = this

			# LEZ example
			fetch("#{process.env.VUE_APP_PUBLIC_PATH}/examples/lez/lez.json")
			.catch((error) ->
				console.log error
			)
			.then((response) ->
				response.json()
			)
			.then((json) ->
				self.handleLoadedLez(json)
			)

			# Establishments example
			fetch("#{process.env.VUE_APP_PUBLIC_PATH}/examples/establishments/establishments.json")
			.catch((error) ->
				console.log error
			)
			.then((response) ->
				response.json()
			)
			.then((json) ->
				self.handleLoadedEstablishments(json)
			)



	
	mounted: () ->
		this.buildMap()
		this.$nextTick(() ->
			this.$refs.perimeter.buildMode()
			)

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
