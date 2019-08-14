<template>
	<div id="app">
		<div id="main_header">
			<div class="w3-container">
				<h1> LEZ viewer </h1>
			</div>
			<div class="w3-bar w3-light-grey">
				<button
					class="w3-bar-item w3-button"
					v-on:click="selectLez"
					>
					Lez
				</button>
				<button
					class="w3-bar-item w3-button"
					v-on:click="selectViewer"
					>
					Emissions
				</button>
			</div>
		</div>
		<div id="main_body">
			<keep-alive>
			<lez v-if="selectedTab == 'lez'" ref="lez"/>
			<viewer v-if="selectedTab == 'viewer'" ref="viewer"/>
			</keep-alive>
		</div>
	</div>
</template>

<script lang="coffee">
import Viewer from './components/emissions/Viewer.vue'
import Lez from './components/lez/Lez.vue'

export default
	name: 'app'
	components:
		lez: Lez
		viewer: Viewer
	
	data: () ->
		selectedTab: "lez"

	methods:
		selectLez: () ->
			this.selectedTab = "lez"

		selectViewer: () ->
			this.selectedTab = "viewer"

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
