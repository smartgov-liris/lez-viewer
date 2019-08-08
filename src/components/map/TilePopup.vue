<template>
	<div v-show="false" ref="popupBody">
		<ul>
			<li v-for="pollutant in pollutants">
				{{pollutant}} : {{tile.pollution[pollutant]}}
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
			pollutants: ["NO2", "NOx", "NH3", "VOC", "PM", "CH4", "CO", "FC"]

		watch:
			tile: (newTile, oldTile) ->
				console.log newTile
				console.log self.tile
				newTile.lRectangle.bindPopup(this.$refs.popupBody.innerHTML).openPopup()
				self.tile = newTile
</script>
