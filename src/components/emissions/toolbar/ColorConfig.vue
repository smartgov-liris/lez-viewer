<template>
	<div class="w3-container">
		<label> Minimum pollution hue </label>
		<div class="w3-cell-row">
			<div class="w3-cell color-input">
				<input class="w3-input" type="number" min="0" max="360" v-model.number="minHue" v-on:change="updateTilesColors"/>
			</div>
			<div class="color-preview w3-cell" v-bind:style="{'background-color': linearHueGradient(0)}"/>
		</div>
		<label> Maximum pollution hue </label>
		<div class="w3-cell-row">
			<div class="w3-cell color-input">
				<input class="w3-input" type="number" min="0" max="360" v-model.number="maxHue" v-on:change="updateTilesColors"/>
			</div>
			<div class="color-preview w3-cell" v-bind:style="{'background-color': linearHueGradient(1)}"/>
		</div>
		<label> Opacity </label>
		<input class="w3-input" type="number" min="0" max="1" step="0.1" v-model.number="opacity" v-on:change="updateTilesColors"/>
	</div>
</template>

<script lang="coffee">

	export default

		props:
			lmap:
				required: true
			tiles:
				required: true
				type: Object
			pollutionPeeks:
				required: true
				type: Object

		data: () ->
			maxHue: 0
			minHue: 200
			opacity: 0.5
			pollutant: "NOx"

		methods:
			###
			value in [0, 1]
			###
			linearHueGradient: (value) ->
				"hsl(#{this.minHue + value * (this.maxHue - this.minHue)},100%,50%)"

			updateTilesColors: () ->
				self = this
				for tileLine in Object.values(this.tiles)
					do (tileLine) ->
						for tile in Object.values(tileLine)
							do (tile) ->
								tile.mapObject.setStyle(
									stroke: false
									fillColor: self.linearHueGradient(
										Math.min(1, tile.pollution[self.pollutant] / self.pollutionPeeks[self.pollutant])
										)
									fillOpacity: self.opacity
									)


</script>

<style>
.color-input {
	width: 75%;
}
.color-preview {
	width: 25%;
}
</style>
