<template>
	<div id="app">
		<div class="w3-container w3-center">
			<h1> LEZ viewer </h1>
		</div>
		<viewer/>
	</div>
</template>

<script lang="coffee">
import Viewer from './components/Viewer.vue'

export default
	name: 'app'
	components:
		viewer: Viewer


</script>

<style>

</style>
