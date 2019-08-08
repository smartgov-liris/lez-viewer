<template>
	<div id="app">
		<div id="main_header">
			<div class="w3-container">
				<h1> LEZ viewer </h1>
			</div>
			<div class="w3-bar w3-light-grey">
				<button class="w3-bar-item w3-button">Lez</button>
				<button class="w3-bar-item w3-button">Emissions</button>
			</div>
		</div>
		<div id="main_body" class="w3-container">
			<viewer v-if="selectedTab == 'viewer'" :establishments="establishments" ref="viewer"/>
		</div>
	</div>
</template>

<script lang="coffee">
import Viewer from './components/emissions/Viewer.vue'

export default
	name: 'app'
	components:
		viewer: Viewer
	
	data: () ->
		selectedTab: "viewer"
		establishments: []

	methods:
		fetchEstablishments: () ->
			url = "establishments/establishments.json"
			self = this
			
			fetch(url)
			.catch((error) ->
				console.log error
			)
			.then((response) ->
				response.json()
			)
			.then((json) ->
				# self.establishments = json

				for establishment in json
					do (establishment) ->
						self.establishments.push(establishment)
				)
			.then(() ->
				self.$refs.viewer.displayEstablishments()
				)
	
	mounted: () ->
		this.fetchEstablishments()


</script>

<style>
#app {
	height: 100%;
}

#main_header {
	height: 10%;
}

#main_body {
	height: 90%;
}

html {
	height: 100%;
}

body {
	height: 100%;
}

</style>
