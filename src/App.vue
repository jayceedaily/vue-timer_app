<template>
	<div id="app">
		<div class="container" style="margin-top:50px">
		
      
			
				<div class="row">
					<div class="col s12">
						<div class="card" style="padding-top:10px" >
							<div class="card-content" style=" padding: 20px 30px;">
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
				<transition-group name="flip-list" tag="">

					<time-card class="list-item col s12 " v-for="item in timers" :key="item.id" :timer=item></time-card>
				

				</transition-group>
			</div>

		</div>
	</div>
</template>

<script>
import M from 'materialize-css';
import {store, mutations} from './store';
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
		

			// timers: localStorage.data == null? [{
			// 		id:1,
			// 		name: "Make Coffee",
			// 		duration: {
			// 			hours: 0,
			// 			minutes: 3,
			// 			seconds: 30,
			// 		},
			// 		start_at: {},
			// 	},] : JSON.parse(localStorage.data)
			
		}
	},

	computed: {
		timers() {
			return store.timers
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
		mutations.load(localStorage.data == null? [{
					id:1,
					name: "Make Coffee",
					duration: {
						hours: 0,
						minutes: 3,
						seconds: 30,
					},
					start_at: {},
				},] : JSON.parse(localStorage.data));
	},

	methods: {

		// ...{load: mutations.load},

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

			if(this.hours == 0 && this.minutes == 0 && this.seconds == 0)
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

				localStorage.data = JSON.stringify(this.timers)

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

.flip-list-move {
  transition: transform 1s;
}
	.list-item {
		display: inline-block;
		/* margin-right: 10px; */
	}
	.list-enter-active, .list-leave-active {
		transition: all 0.5s;
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



</style>