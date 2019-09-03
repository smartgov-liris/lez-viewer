<template>
	<div v-show="false" ref="scaleControlBody">
		<!-- This component is not rendered, but its "innerHTML" is used to build
	  the legend. See the script.-->
		<div class="w3-round w3-light-grey w3-padding">
			<h6> Legend - {{pollutant}} (ng.s<sup>-1</sup>.m<sup>-2</sup>) </h6>
			<table class="w3-table">
				<tr v-for="range in ranges">
					<td v-bind:style="{background: range.color}"></td>
					<td> {{range.min}} - {{range.max}} </td>
				</tr>
				<tr>
					<td v-bind:style="{background: color(0)}"></td>
					<td> 0 </td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script lang="coffee">
	
	import L from "leaflet"

	export default
		props:
			# The leaflet map
			map:
				required: true
			# Minimum hue color
			minHue:
				type: Number
				required: true
			# Maximum hue color
			maxHue:
				type: Number
				required: true
			# Selected pollutant
			pollutant:
				type: String
				required: true
			# Pollution peeks by pollutant
			pollutionPeeks:
				required: true

		data: () ->
			# The built leaflet control
			scaleControl: null

		computed:
			# Convenient property to select the current pollution peek
			pollutionPeek: () ->
				if this.pollutionPeeks
					this.pollutionPeeks[this.pollutant]

			# The 5 level color scale
			ranges: () ->
				ranges = []
				if this.pollutionPeeks
					self = this
					for i in [5..1]
						do (i) ->
							ranges.push(
								color: self.color(i * 0.2)
								min: Math.round(1e9 * (i - 1) * 0.2 *
									self.pollutionPeek)
								max: Math.round(1e9 * i * 0.2 *
									self.pollutionPeek)
								)
				return ranges

		methods:
			# Return the css representation of the color corresponding to the
			# input value. Value must be in [0, 1]
			color: (value) ->
				currentTreshold = 0
				while value > currentTreshold
					currentTreshold += 0.2
				"hsl(#{this.minHue + currentTreshold * (this.maxHue - this.minHue)},100%,50%)"

			# Builds the custom leaflet control
			buildControl: (newVal, oldVal) ->
				if this.scaleControl
					this.scaleControl.remove()
				this.scaleControl = L.control(
					position: "bottomright"
					)

				body = L.DomUtil.create("div")
				# HTML build by Vue.js. See the <template> above
				body.innerHTML = this.$refs.scaleControlBody.innerHTML

				# Must return the HTMLElement used to render the control
				this.scaleControl.onAdd = (map) ->
					body
					
				# Display the control
				this.scaleControl.addTo(this.map)

			hide: () ->
				this.scaleControl.remove()


		mounted: () ->
			self = this
			this.$nextTick(() ->
				# All changes will be reflected by Vue.js in the "ranges"
				# attribute, so we only need to listen to this one.
				# Will be triggered when pollutionPeeks, minHue, maxHue,
				# pollutant changes...
				self.$watch(
					"ranges",
					self.buildControl,
					immediate: true
					)
				)


</script>
