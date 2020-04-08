<template>
	<div id="app">
		<div class="container" style="margin-top:50px">
			<div class="row">
				<div class="col s12">
					<a @click="addTimer">
						<div style="border-radius:20px!important ; padding: 10px 20px; box-shadow:none"  class="card">
							<div class="card-content  center-align">
								<i class="material-icons large blue-grey-text text-lighten-4">add</i>
							</div>
						</div>
					</a>
				</div>
			</div>
			<div class="row">
				<transition-group name="list" tag="">

					<time-card class="list-item col s12" v-for="item in timers" :key="item.id" :timer=item></time-card>
				

				</transition-group>
			</div>

		</div>
	</div>
</template>

<script>

import TimeCard from  './components/TimeCard'

export default {
	name: 'App',
	components: {
		TimeCard,
	},
	data: ()=> {
		return {
			timers: [
				{
					id:1,
					name: "Laundry",
					duration: {
						hours: 1,
						minutes: 1,
						seconds: 0,
					},
					length: 100,
				},
			]
		}
	},
	created: function() {
	
	},

	methods: {
		addTimer() {
			this.timers.unshift({
					id: this.timers.length + 1,
					name: "Coffee",
					duration: {
						hours: 1,
						minutes: 0,
						seconds: 5
					},
					length: 100,
				})
		}
	}
}
</script>
<style>
	.list-item {
	display: inline-block;
	margin-right: 10px;
	}
	.list-enter-active, .list-leave-active {
	transition: all 1s;
	}
	.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
	opacity: 0;
	transform: translateY(-30px);
	}
	
</style>