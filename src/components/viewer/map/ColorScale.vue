<template>
	<div v-show="false" ref="scaleControlBody">
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
			map:
				required: true
			minHue:
				type: Number
				required: true
			maxHue:
				type: Number
				required: true
			pollutant:
				type: String
				required: true
			pollutionPeeks:
				required: true

		data: () ->
			scaleControl: null

		computed:
			pollutionPeek: () ->
				if this.pollutionPeeks
					this.pollutionPeeks[this.pollutant]

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
				console.log ranges
				return ranges

		methods:
			color: (value) ->
				currentTreshold = 0
				while value > currentTreshold
					currentTreshold += 0.2
				"hsl(#{this.minHue + currentTreshold * (this.maxHue - this.minHue)},100%,50%)"

			buildControl: (newVal, oldVal) ->
				if this.scaleControl
					this.scaleControl.remove()
				this.scaleControl = L.control(
					position: "bottomright"
					)

				body = L.DomUtil.create("div")
				body.innerHTML = this.$refs.scaleControlBody.innerHTML

				this.scaleControl.onAdd = (map) ->
					body
					
				this.scaleControl.addTo(this.map)


		mounted: () ->
			self = this
			this.$nextTick(() ->
				self.$watch(
					"ranges",
					self.buildControl,
					immediate: true
					)
				self.$watch(
					"pollutionPeeks",
					self.buildControl,
					immediate: true
					)
				)


</script>
