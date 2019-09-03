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
					class="w3-bar-item w3-button nav-bar-item"
					v-on:click="selectLez"
					>
					Lez
				</button>
				<button
					class="w3-bar-item w3-button nav-bar-item"
					v-on:click="selectViewer"
					>
					Emissions
				</button>
				<div id="examples-dropdown" class="w3-bar-item
					w3-dropdown-hover nav-bar-item">
					<button
						id="examples-dropdown-button"
						class="w3-button">
						<i class="fas fa-caret-down"></i>
						Examples
					</button>
					<div id="examples-dropdown-content" class="w3-dropdown-content w3-bar-block w3-border">
						<button
							class="w3-bar-item w3-button"
							@click="loadExample('lez', 'no_lez_tiles')"
							>
							<i class="fas fa-download w3-margin-right"></i><b>No LEZ</b>
						</button>
						<button
							class="w3-bar-item w3-button"
							@click="loadExample('lez_1', 'lez_1_tiles')"
							>
							<i class="fas fa-download w3-margin-right"></i><b>LEZ 1</b>
						</button>
						<button
							class="w3-bar-item w3-button"
							@click="loadExample('lez_2', 'lez_2_tiles')"
							>
							<i class="fas fa-download w3-margin-right"></i><b>LEZ 2</b>
						</button>
						<a
							class="w3-button w3-bar-item"
							href="https://github.com/smartgov-liris/lez-viewer#examples" target="_blank">
							<i class="fas fa-info-circle"></i>
							examples information
						</a>

					</div>
				</div>
			</div>
		</header>
		<div id="main_body">
			<keep-alive>
			<lez
				v-if="selectedTab == 'lez'"
				v-bind:exampleLez="exampleLez"
				ref="lez"/>
			<viewer
				v-if="selectedTab == 'viewer'"
				v-bind:exampleTiles="exampleTiles"
				ref="viewer"/>
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
		exampleLez: ""
		exampleTiles: ""

	methods:
		selectLez: () ->
			this.selectedTab = "lez"

		selectViewer: () ->
			this.selectedTab = "viewer"

		loadExample: (lez, tiles) ->
			this.exampleLez = lez
			this.exampleTiles = tiles

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

.nav-bar-item {
	height: 100%;
}

#examples-dropdown {
	padding: 0!important;
}

#examples-dropdown-button {
	height: 100%;
}

#examples-dropdown-content {
	z-index: 2000;
}

#main_body {
	height: 90%;
}

html {
	height: 100vh;
}

body {
	height: 100%;
}

</style>
