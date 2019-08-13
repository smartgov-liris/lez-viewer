<template>
	<div>
		<button 
			v-on:click="show = !show" class="w3-button w3-large w3-block w3-left-align w3-light-grey">
			<i
				class="fas chevron"
				v-bind:class="[ show ? 'fa-chevron-down' : 'fa-chevron-up']">
			</i>
			{{ label }}
		</button>

		<div class="w3-container" v-bind:class="[show ? 'w3-show' : 'w3-hide']">
			<slot></slot>
		</div>
	</div>
</template>

<script lang="coffee">

	export default
		props:
			label:
				type: String
				required: true
			expand:
				type: Boolean
				required: false
				default: false

		data: () ->
			show: false

		mounted: () ->
			this.show = this.expand

</script>

<style>
.chevron {
	margin-left: 4px;
}
</style>
