<template>
	<div id="app">
		<header id="main_header" class="w3-bar">
			<div id="title" class="w3-bar">
				<h3 class="w3-bar-item">LEZ viewer</h3>
				<a
					class="w3-bar-item w3-button w3-hover-black w3-right w3-xlarge"
					href="https://github.com/smartgov-liris/lez-viewer"
					target="_blank">
					<i class="fab fa-github fa-lg"/>
					View source on GitHub
				</a>
			</div>
			<div id="nav-bar" class="w3-bar w3-light-grey">
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
		</header>
		<div id="main_body">
			<keep-alive>
			<lez v-if="selectedTab == 'lez'" ref="lez"/>
			<viewer v-if="selectedTab == 'viewer'" ref="viewer"/>
			</keep-alive>
		</div>
	</div>
</template>

<script lang="coffee">
import Viewer from './components/viewer/Viewer.vue'
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

#title {
	height: 60%;
}

#nav-bar {
	height: 40%;
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
