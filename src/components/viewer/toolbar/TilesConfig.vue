<template>
	<div class="w3-margin">
		<label> Minimum pollution hue </label>
		<div class="w3-cell-row">
			<div class="w3-cell color-input">
				<input class="w3-input" type="number" min="0" max="360" v-model.number="minHue" v-on:change="updateTilesColors"/>
			</div>
			<div
				class="color-preview w3-cell"
				v-bind:style="{'background-color': minColor}"/>
		</div>
		<label> Maximum pollution hue </label>
		<div class="w3-cell-row">
			<div class="w3-cell color-input">
				<input class="w3-input" type="number" min="0" max="360" v-model.number="maxHue" v-on:change="updateTilesColors"/>
			</div>
			<div
				class="color-preview w3-cell"
				v-bind:style="{'background-color': maxColor}"/>
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
		<p>
		<input class="w3-check" type="checkbox" v-model="displayLegend"	v-on:change="handleLegendDisplay($event.target.checked)">
		<label> Display Legend </label>
		</p>

		<color-scale
			ref="colorScale"
			v-bind:map="lmap"
			v-bind:pollutionPeeks="pollutionPeeks[this.pollutionPeeksOrigin]"
			v-bind:minHue="minHue"
			v-bind:maxHue="maxHue"
			v-bind:pollutant="pollutant"
			/>
	</div>
</template>

<script lang="coffee">

	import ColorScale from "../map/ColorScale"

	export default

		components:
			"color-scale": ColorScale

		props:
			# leaflet map
			lmap:
				required: true
			# tiles data dictionnary
			tiles:
				required: true
				type: Object
			# pollution peeks dictionnaries by file
			pollutionPeeks:
				required: true
				type: Object

		data: () ->
			# Maximum hue color
			maxHue: 0
			# Maximum color
			maxColor: "rgb(0,0,0)"
			# Minimum hue color
			minHue: 200
			# Minimum color
			minColor: "rgb(0,0,0)"
			# Tiles opacity
			opacity: 0.5
			# Available pollutants
			pollutants:
				["CH4", "FC", "PM", "NOx", "VOC", "CO", "N2O", "NH3"]
			# Selected pollutant
			pollutant: "NOx"
			# Name of the selected file from which pollution peeks should be
			# used
			pollutionPeeksOrigin: null
			# Legend display
			displayLegend: true


		watch:
			# Listen to selected pollutant
			pollutant: (old, newVal) ->
				this.updateTilesColors()

			# Select the first pollutionPeeks file if none is selected
			pollutionPeeks: (old, newVal) ->
				if !this.pollutionPeeksOrigin
					this.pollutionPeeksOrigin = Object.keys(newVal)[0]

			# Listen to selected pollutionPeeks
			pollutionPeeksOrigin: (old, newVal) ->
				this.updateTilesColors()
			# Listen minHue selections to upate color preview
			minHue: (old, newVal) ->
				this.minColor = this.$refs.colorScale.color(0)
			# Listen maxHue selections to upate color preview
			maxHue: (old, newVal) ->
				this.maxColor = this.$refs.colorScale.color(1)

		methods:
			# Updates tiles colors
			updateTilesColors: () ->
				if this.pollutionPeeksOrigin
					self = this
					for tileLine in Object.values(this.tiles)
						do (tileLine) ->
							for tile in Object.values(tileLine)
								do (tile) ->
									tile.mapObject.setStyle(
										stroke: false
										fillColor: self.$refs.colorScale.color(
											Math.min(1, tile.pollution[self.pollutant] / self.pollutionPeeks[self.pollutionPeeksOrigin][self.pollutant])
											)
										fillOpacity: self.opacity
										)

			# Hides or displays the legend
			handleLegendDisplay: (display) ->
				if display
					this.$refs.colorScale.buildControl()
				else
					this.$refs.colorScale.hide()

		mounted: () ->
			this.$nextTick(() ->
				# Initializes color preview once the colorScale component has
				# been built
				this.minColor = this.$refs.colorScale.color(0)
				this.maxColor = this.$refs.colorScale.color(1)
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
