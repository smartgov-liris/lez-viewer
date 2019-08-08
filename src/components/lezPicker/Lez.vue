<template>

	<div id="map-container">
		<div id="lez-map"/>
	</div>


</template>

<script lang="coffee">

import L from "leaflet"
import "leaflet/dist/leaflet.css"

export default

	props:
		establishments:
			required: true
			type: Array

	methods:
		buildMap: () ->
			this.lmap = L.map('lez-map').setView([0, 0], 1)
			console.log this.lmap
			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(this.lmap)

			L.control.scale().addTo(this.lmap)

</script>



<style>
#map-container {
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
