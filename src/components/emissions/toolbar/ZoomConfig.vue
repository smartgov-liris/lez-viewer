<template>
	<div class="w3-container">
		<label> Latitude </label>
		<input class="w3-input" type="number" step="0.1" v-bind:value="center.lat" v-on:input="updateLat($event.target.value)"/>
		<label> Longitude </label>
		<input class="w3-input" type="number" step="0.1" v-bind:value="center.lon" v-on:input="updateLon($event.target.value)"/>
		<label> Zoom level </label>
		<input class="w3-input" type="number" step="0.5" v-bind:value="zoom" v-on:input="updateZoom($event.target.value)"/>
	</div>
</template>

<script lang="coffee">

	export default
		props:
			lmap:
				required: true

		data: () ->
			center:
				lat: 0
				lon: 0
			zoom: 0

		methods:
			updateLat: (lat) ->
				this.lmap.setView(
					L.latLng(lat, this.center.lon),
					this.zoom,
					animate: false
				)

			updateLon: (lon) ->
				this.lmap.setView(L.latLng(this.center.lat, lon), this.zoom)

			updateZoom: (zoom) ->
				this.lmap.setView(L.latLng(this.center.lat, this.center.lon), zoom)

		mounted: () ->
			self = this
			this.$nextTick(() ->
				self.lmap.on(
					move: (event) ->
						self.center.lat = self.lmap.getCenter().lat
						self.center.lon = self.lmap.getCenter().lng
					zoom: (event) ->
						self.zoom = self.lmap.getZoom()
					)
				)


</script>
