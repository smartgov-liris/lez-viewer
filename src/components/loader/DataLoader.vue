<template>
	<div>
		<label v-if="label"> {{label}} : </label>
		<input
			type="file"
			accept="application/json"
			class="w3-input w3-border-0"
			v-on:change="handleChange($event.target.files[0])"
			/>
	</div>
</template>

<script lang="coffee">

	export default
		
		props:
			label:
				type: String

		data: () ->
			loadedData: {}
			file: null

		methods:
			handleChange: (file) ->
				this.file = file
				this.$emit("select", file)

			load: () ->
				self = this
				reader = new FileReader()
				reader.onload = () ->
					self.loadedData = JSON.parse(reader.result)
					self.$emit("loaded", self.loadedData)

				console.log this.file
				reader.readAsText(this.file)

			getFile: () ->
				this.file



</script>
