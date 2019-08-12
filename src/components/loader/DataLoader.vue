<template>
	<div>
		<label> {{label}} : </label>
		<input
			type="file"
			class="w3-input w3-border-0"
			v-on:change="file = $event.target.files[0]"
			/>
	</div>
</template>

<script lang="coffee">

	export default
		
		props:
			label:
				type: String
				required: true

		data: () ->
			loadedData: {}
			file: null

		methods:
			load: () ->
				self = this
				reader = new FileReader()
				reader.onload = () ->
					self.loadedData = JSON.parse(reader.result)
					self.$emit("loaded", self.loadedData)

				reader.readAsText(this.file)



</script>
