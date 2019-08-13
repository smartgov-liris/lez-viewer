<template>
	<div class="w3-margin">
		<p>
		<input class="w3-check" type="checkbox" v-model="display.boundingBox" v-on:change="handleBoxDisplay($event.target.checked)">
		<label> Bounding Box </label>
		</p>
		<p>	
		<input class="w3-check" type="checkbox" v-model="display.establishments" v-on:change="handleEstablishmentsDisplay($event.target.checked)">
		<label> Establishments </label>
		</p>
		<p>
		<input class="w3-check" type="checkbox" v-model="display.tiles" v-on:change="handleTilesDisplay($event.target.checked)">
		<label> Tiles </label>
		</p>
	</div>
</template>

<script lang="coffee">

	export default

		props:
			lmap:
				required: true
			boundingBox:
				required: true
			establishments:
				required: true
				type: Array
			tiles:
				required: true
				type: Object

		data: () ->
			display:
				boundingBox: true
				establishments: true
				tiles: true

		methods:
			handleBoxDisplay: (display) ->
				if display
					this.boundingBox.addTo(this.lmap)
				else
					this.boundingBox.remove()

			handleEstablishmentsDisplay: (display) ->
				self = this
				if display
					for establishment in this.establishments
						do (establishment) ->
							establishment.mapObject.addTo(self.lmap)
				else
					for establishment in this.establishments
						do (establishment) ->
							establishment.mapObject.remove()

			handleTilesDisplay: (display) ->
				self = this
				if display
					for tileLine in Object.values(this.tiles)
						do (tileLine) ->
							for tile in Object.values(tileLine)
								do (tile) ->
									tile.mapObject.addTo(self.lmap)
				else
					for tileLine in Object.values(this.tiles)
						do (tileLine) ->
							for tile in Object.values(tileLine)
								do (tile) ->
									tile.mapObject.remove()
			refresh: () ->
				self = this
				for option, _ of this.display
					do (option, _) ->
						self.display[option] = true


</script>

