<template>
	<div v-show="false" ref="popupBody">
		<ul>
			<li> siret : {{ establishment.id }} </li>
			<li> name : {{ establishment.name }} </li>
			<li> activity : {{ establishment.activity }} </li>
		</ul>
	</div>
</template>

<script lang="coffee">

	import L from "leaflet"

	export default

		props:
			establishments:
				type: Object
				required: true
			establishment:
				type: Object
				required: true
			lmap:
				type: Object
				required: true

		data: () ->
			lines: []

		methods:
			buildRounds: () ->
				this.cleanRounds()

				self = this
				for _, round of this.establishment.rounds
					currentNode = this.establishment.location
					do (_, round) ->
						for id in round.establishments
							do (id) ->
								roundLine = L.polyline([currentNode, self.establishments[id].location])
								roundLine.addTo(self.lmap)
								self.lines.push(roundLine)

								currentNode = self.establishments[id].location
					lastLine = L.polyline([currentNode, this.establishment.location])
					lastLine.addTo(self.lmap)
					self.lines.push(lastLine)
			
			cleanRounds: () ->
				line.remove() for line in this.lines
				this.lines = []


		mounted: () ->
			self = this
			this.$watch(
				"establishment", (_, __) ->
					this.establishment.mapObject.bindPopup(this.$refs.popupBody.innerHTML)
					this.establishment.mapObject.on(
							popupclose: (event) -> self.cleanRounds()
							)
					this.establishment.mapObject.openPopup()
					this.buildRounds()
				, immediate: true
				)



</script>
