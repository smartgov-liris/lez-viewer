<template>
	<div class="w3-container">
		<div v-for="(label, critair) in critairs">
			<input class="w3-check" type="checkbox" v-bind:value="critair" v-model="allowed">
			<label> {{label}} </label>
		</div>
	</div>
</template>

<script lang="coffee">
	
	import CritAir from "./CritAir"

	export default
		critairEnum:
			critair1: "CRITAIR_1"
			critair2: "CRITAIR_2"
			critair3: "CRITAIR_3"
			critair4: "CRITAIR_4"
			critair5: "CRITAIR_5"

		critairEnumReversed:
			"CRITAIR_1" : "critair1"
			"CRITAIR_2" : "critair2"
			"CRITAIR_3" : "critair3"
			"CRITAIR_4" : "critair4"
			"CRITAIR_5" : "critair5"

		data: () ->
			critairs:
				critair1: "CRIT'air 1"
				critair2: "CRIT'air 2"
				critair3: "CRIT'air 3"
				critair4: "CRIT'air 4"
				critair5: "CRIT'air 5"
			allowed: []

		methods:
			getAllowedCritAirs: () ->
				this.allowed

			load: (allowed) ->
				this.allowed = []
				self = this
				for critair in allowed
					do (critair) ->
						self.allowed.push(CritAir.critairEnumReversed[critair])

</script>
