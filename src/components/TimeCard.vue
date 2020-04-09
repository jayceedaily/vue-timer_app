<template>
<div class="">
	<div class="card col s12" style="border-radius:20px!important ;  box-shadow:none; "  :class="start ? 'deep-purple accent-3 white-text' : 'deep-purple-text text-accent-3'">
		<div class="card-content " style=" padding: 20px 25px;">
			<div class="row">

				<div class="col s12">
				<!-- <i class="material-icons right" @click="destroy(timer)">close</i> -->
					<h5 class="valign-wrapper flow-text">
						<b>{{timer.name}}</b></h5>
					<h1 style="margin-top:0; margin-bottom:0"><b>{{prettyTime(countDown.hours)}} {{prettyTime(countDown.minutes)}} {{prettyTime(countDown.seconds)}}</b></h1>
				</div>
	
			</div>
		</div>
		<hr>
		<div class="card-content center-align">
			<div class="row" style="margin-bottom:0">
				<div class="col s4"><i style="cursor:pointer" class="material-icons small" @click="destroy(timer)">delete</i></div>
				<div class="col s4"><i style="cursor:pointer" class="material-icons small" @click="restart">refresh</i></div>
				<div class="col s4"><i style="cursor:pointer" class="material-icons small" @click="start = !start">{{start ? 'pause' : 'play_arrow'}}</i></div>
			</div>
		</div>
	</div>
</div>
</template>
<script>
import M from 'materialize-css';
import {mutations} from '../store';
export default {
	name: "TimeCard",
	props: ['timer'],
	data() {
		return {
			start: false,
			countDown: {},
			realtime: {},
		}
	},

	computed: {
		timeLeft: () => {}
	},

	watch: {
		start(){

			if(this.start){
				mutations.moveToTop(this.timer)

				this.countDownTimer();
			} else {
				clearTimeout(this.realtime)
			}
		}
	},
	created() {
		this.countDown = Object.assign({}, this.timer.duration);
	},

	methods: {

		restart() {
			this.countDown = Object.assign({}, this.timer.duration);

			this.start = false;
		},

		countDownTimer() {

			this.realtime = setTimeout(() => {
				
				if(this.countDown.hours > 0 || this.countDown.minutes > 0 || this.countDown.seconds > 0) {

					if(this.countDown.seconds == 0) {

						this.countDown.seconds = 59;

						if(this.countDown.minutes == 0) {

							this.countDown.minutes = 59;

							if(this.countDown.hours  > 0){

								this.countDown.hours--;
							}

						} else {
							this.countDown.minutes--;
						}
					}
		
					else {
						this.countDown.seconds--;
					}
				}


				if(this.countDown.hours > 0 || this.countDown.minutes > 0 || this.countDown.seconds > 0){

					this.countDownTimer();
					
				} else {
					this.countDown = Object.assign({}, this.timer.duration);

					this.start = false;

					M.toast({html:this.timer.name + ' has ended'})
				}

			}, 1000)
		},

		prettyTime(time){
			if(time < 10 &&( time[0] != "0" || time[0] == "")) {
				return '0' + time
			}

			return time;
		},
		
		destroy(item) {
			mutations.destroy(item);
		}
	}
}
</script>
<style lang="scss">
	
	.card {
		transition: all 0.2s ease-in!important;
	}

	
hr {
    border-top: none;
    border-bottom: 1px solid rgba(0,0,0,0.1) ;
    margin: 0;
}
</style>