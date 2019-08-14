<template>
	<div v-show="false" ref="popupBody">
		<ul>
			<li v-for="pollutant in pollutants">
				{{pollutant}} : {{tile.pollution[pollutant]}} g/s/m2
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
