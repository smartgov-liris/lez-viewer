<template>
	<div class="w3-margin">
		<data-loader
			ref="establishmentsLoader"
			label="Establishments"
			v-on:select="establishmentsSelected=true"
			v-on:loaded="handleEstablishmentsLoaded"
			/>
		<data-loader
			ref="tilesLoader"
			label="Tiles"
			v-on:select="tilesSelected=true"
			v-on:loaded="handleTilesLoaded"
			/>

		<button
			class="w3-green w3-button w3-block w3-round"
			v-on:click="load"
			v-bind:disabled="!(establishmentsSelected&&tilesSelected)"
			>
			<i class="fa fa-upload fa-lg"></i>
			Load data
		</button>
	</div>

</template>

<script lang="coffee">
	
	import DataLoader from "../../loader/DataLoader.vue"

	export default

		components:
			"data-loader": DataLoader
		
		data: () ->
			establishmentsSelected: false
			establishmentsLoaded: false
			tilesSelected: false
			tilesLoaded: false
			loadedData: {}

		methods:
			load: () ->
				this.$refs.establishmentsLoader.load()
				this.$refs.tilesLoader.load()

			handleEstablishmentsLoaded: (data) ->
				this.establishmentsLoaded = true
				this.loadedData.establishments = data
				if this.tilesLoaded
					this.$emit("loaded", this.loadedData)

			handleTilesLoaded: (data) ->
				this.tilesLoaded = true
				this.loadedData.tiles = data
				if this.establishmentsLoaded
					this.$emit("loaded", this.loadedData)

			getTilesFile: () ->
				this.$refs.tilesLoader.getFile()

			getEstablishmentsFile: () ->
				this.$refs.establishmentsLoader.getFile()




</script>
