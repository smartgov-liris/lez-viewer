<template>
	<div v-show="false" ref="popupBody">
		<ul>
			<li v-for="pollutant in pollutants">
				{{pollutant}} : {{1.e9 * tile.pollution[pollutant]}} ng.s<sup>-1</sup>.m<sup>-2</sup>
			</li>
		</ul>
	</div>
</template>

<script lang="coffee">

	export default

		props:
			tile:
				type: Object
				required: true

		data: () ->
			pollutants: ["N2O", "NOx", "NH3", "VOC", "PM", "CH4", "CO", "FC"]

		mounted: () ->
			this.$watch(
				"tile", (newTile, oldTile) ->
					newTile.mapObject.bindPopup(this.$refs.popupBody.innerHTML).openPopup()
				, immediate: true
				)

</script>
