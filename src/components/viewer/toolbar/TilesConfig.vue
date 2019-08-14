<template>
	<div class="w3-margin">
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

		<label> Pollutant </label>
		<select class="w3-select" v-model="pollutant">
			<option v-for="pollutant in pollutants"> {{pollutant}} </option>
		</select>

		<label> Pollution Peeks </label>
		<select class="w3-select" v-model="pollutionPeeksOrigin">
			<option v-for="(values, name) in pollutionPeeks" v-bind:value="name"> {{name}} </option>
		</select>
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
			pollutants:
				["CH4", "FC", "PM", "NOx", "VOC", "CO", "N2O", "NH3"]
			pollutant: "NOx"
			pollutionPeeksOrigin: null

		watch:
			pollutant: (old, newVal) ->
				this.updateTilesColors()

			pollutionPeeks: (old, newVal) ->
				if !this.pollutionPeeksOrigin
					this.pollutionPeeksOrigin = Object.keys(newVal)[0]

			pollutionPeeksOrigin: (old, newVal) ->
				this.updateTilesColors()

		methods:
			###
			value in [0, 1]
			###
			linearHueGradient: (value) ->
				"hsl(#{this.minHue + value * (this.maxHue - this.minHue)},100%,50%)"

			updateTilesColors: () ->
				if this.pollutionPeeksOrigin
					self = this
					for tileLine in Object.values(this.tiles)
						do (tileLine) ->
							for tile in Object.values(tileLine)
								do (tile) ->
									tile.mapObject.setStyle(
										stroke: false
										fillColor: self.linearHueGradient(
											Math.min(1, tile.pollution[self.pollutant] / self.pollutionPeeks[self.pollutionPeeksOrigin][self.pollutant])
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
