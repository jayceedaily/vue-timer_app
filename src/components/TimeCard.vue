<template>
<div>
	<div class="card" @click="start = !start" style="border-radius:20px!important ;  box-shadow:none; cursor: pointer"  :class="start ? 'deep-purple accent-3 white-text' : 'deep-purple-text text-accent-3'">
		<div class="card-content " style=" padding: 20px 35px;">
			<div class="row">

				<div class="col s11">
					
					<h5 class="valign-wrapper flow-text">
		
						
						<b>{{timer.name}}</b></h5>
					<h1 style="margin-top:0; margin-bottom:0"><b>{{prettyTime(countDown.hours)}} {{prettyTime(countDown.minutes)}} {{prettyTime(countDown.seconds)}}</b></h1>
				</div>
	
			</div>
		</div>
		<!-- <hr style="border-top: none;
        border-bottom:1px solid rgba(0, 0, 0, 0.1) ;
        margin: 0;">
		<div class="card-content">
			<div class="row" style="margin-bottom:0">
				<div class="col s12 center">
					<i v-if="!start" class="material-icons small" @click="start = !start">play_arrow</i>
					<i v-if="start" class="material-icons small" @click="start = !start">pause</i>
				</div>
			</div>
		</div> -->
	</div>
</div>
</template>
<script>
import moment from 'moment';
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

		moment() {
			return moment();
		},
		countDownTimer() {

			this.realtime = setTimeout(() => {
				
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

				if(this.countDown.hours > 0 || this.countDown.minutes > 0 || this.countDown.seconds > 0){

					this.countDownTimer();
					
				} else {
					this.countDown = Object.assign({}, this.timer.duration);

					this.start = false;

				}

			}, 1000)
		},

		prettyTime(time){
			if(time < 10) {
				return '0'+time
			}

			return time;
		},
	}

}
</script>
<style lang="scss">
	
	.card {
		transition: all 0.2s ease-in!important;
	}


</style>