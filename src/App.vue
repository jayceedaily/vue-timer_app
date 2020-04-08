<template>
	<div id="app">
		<div class="container" style="margin-top:50px">
			
			
				<div class="row">
					<div class="col s12">
						<div class="card" style="padding-top:50px">
							<div class="card-content">
								<form action="" @submit.prevent="addTimer">
									<div class="row">
										<div class="col s12">
											<input type="text" v-model="name" class="mytimename">
										</div>
									</div>
									<div class="row">
										<div class="col s4 input-field">
											<input type="number" max="99" name="" id="" class="col mytime" v-model="hours" placeholder="00">
										</div>
										<div class="col s4 input-field">
											<input type="number" max="99" name="" id="" ref="minutes" class="col mytime" v-model="minutes" placeholder="00">
										
										</div>
										<div class="col s4 input-field">
											<input type="number" max="99" name="" id="" ref="seconds" class="col mytime" v-model="seconds" placeholder="00">
										</div>
									</div>
									<div class="row" style="margin-bottom:0">

									<button type="submit" class="btn deep-purple accent-3 col s12" style="">Add</button>
									</div>
								</form>
							</div>
	
						</div>
					</div>
				</div>
			
			
			<div class="row">
				<transition-group name="list" tag="">

					<time-card class="list-item col s12 " v-for="item in timers" :key="item.id" :timer=item></time-card>
				

				</transition-group>
			</div>

		</div>
	</div>
</template>

<script>
import M from 'materialize-css';

import TimeCard from  './components/TimeCard'

export default {
	name: 'App',
	components: {
		TimeCard,
	},
	data: ()=> {
		return {

			showAddForm: false,

			name: 'Timer',
			hours: null,
			minutes: null,
			seconds: null,
		

			timers: [
				{
					id:1,
					name: "Laundry",
					duration: {
						hours: 0,
						minutes: 30,
						seconds: 0,
					},
					start_at: {},
				},
			]
		}
	},

	watch: {
		hours : function() {
			if(this.hours != null && this.hours.length == 2) {
				this.$refs.minutes.focus()
			}
		},
		minutes : function() {
			

			if(this.minutes != null && this.minutes.length == 2) {
				this.$refs.seconds.focus()
			}
		}
	},
	created: function() {
	
	},

	methods: {
		addTimer() {

			if(this.hours == null) {
				this.hours = 0;
			}

			if(this.minutes == null) {
				this.minutes = 0;
			}

			if(this.seconds == null) {
				this.seconds = 0;
			}

			if(this.hours == 0 && this.minutes == 0 && this.minutes == 0)
			{
				this.hours = null;

				this.minutes = null;

				this.seconds = null;


				M.toast({html:"What's a timer without the time?"})

				return
			} else {

				this.timers.unshift({
					id: this.timers.length + 1,
					name: this.name,
					duration: {
						hours: this.hours,
						minutes: this.minutes,
						seconds: this.seconds
					},
				})

			}

			this.hours = null;

			this.minutes = null;

			this.seconds = null;


		},
		

		prettyTime(time){
			if(time < 10 && time[0] != "0") {
				return '0' + time
			}

			return time;
		},
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
	/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

input:focus{
	border-bottom: 2px solid #651fff!important;
	box-shadow: 0 1px 0 0 #651fff!important ;
}
	

input.mytime {
	font-size: 4em!important;
	height: 100px!important;
	font-weight: bold;
	color: #651fff;
}

input.mytimename {
	font-size: 2em!important;
	height: 50px!important;
	font-weight: bold;
	color: #651fff;
}

.card {
	border-radius:20px!important ; padding: 10px 0px; box-shadow:none!important
}


	.slide-fade-enter-active {
	transition: all .3s ease;
	}
	.slide-fade-leave-active {
	transition: all .3s ease;
	}
	.slide-fade-enter, .slide-fade-leave-to
	/* .slide-fade-leave-active below version 2.1.8 */ {
	transform: translateY(10px);
	opacity: 0;
	}
</style>