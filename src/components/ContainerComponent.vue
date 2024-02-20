<template>
    <div ontouchstart="" class="container">
    <!-- <KeepAlive :exclude="['GameComponent']"> -->
        <component :is="currentComponent" v-bind="currentProperties" v-on="currentEvents" class="main-component"/>
    <!-- </KeepAlive> -->
    </div>
</template>

<script>
import HomeComponent from './HomeComponent.vue';
import GameComponent from './GameComponent.vue';
let nextPoints = 0;
let last_digit = 0;

let average_achieved_points
let average_response_times
let data_points
export default {
    name: 'ContainerComp',
    components: {
        HomeComponent,
        GameComponent
    },
    data() {
        return {
            currentComponent: 'HomeComponent',
            missionPoints: 15,
            prev_success_in_a_row: 5
        };
    },
    computed: {
        success_in_a_row: function(){
            return this.$store.state.success_in_a_row
        },
        rank_now : function(){
            return this.$store.state.rank
        },
        
        currentProperties: function() {
            if(this.currentComponent === 'GameComponent'){
                return{ missionPoints: this.missionPoints, missionTime: 120}
            }
            else{
                return { missionPoints: this.missionPoints, missionTime: 120, 'prev_success_in_a_row': this.prev_success_in_a_row}
            }
            // return { missionPoints: this.missionPoints }
        },
        currentEvents: function() {
            if (this.currentComponent === 'HomeComponent') {
                return { 'start-game': this.startMission, 'return-landing': this.returnLanding }
            }
            if (this.currentComponent === 'GameComponent') {
                return { 'return-home': this.returnHome }
            }
            return {};
        }
    },
    methods: {
        startMission() {
            this.currentComponent = 'GameComponent';
        },
        returnHome(missionPoints, achievedPoints, missionTime, usedTime) {
            console.log('after mission')
            console.log(this.success_in_a_row)
            console.log(this.$store.state.success_in_a_row)
            this.prev_success_in_a_row = this.success_in_a_row;
            
            if (missionPoints){
                console.log('achievedPoints >= missionPoints')
                console.log(achievedPoints >= missionPoints)
                console.log('achievedPoints')
                console.log(achievedPoints)
                this.$store.commit('setPastAchievedPoints', achievedPoints)
                this.$store.commit('setPastResponseTimes', usedTime)
                data_points = Math.min(this.$store.state.past_achieved_points.length,4)
                console.log('data_points')
                console.log(data_points)
                console.log('this.$store.state.past_achieved_points')
                console.log(this.$store.state.past_achieved_points)
                average_achieved_points = (this.$store.state.past_achieved_points.slice(-4).reduce((a, b) => a + b, 0))/data_points
                average_response_times = (this.$store.state.past_response_times.slice(-4).reduce((a, b) => a + b, 0))/data_points
                console.log('average_achieved_points')
                console.log(average_achieved_points)
                if (achievedPoints >= missionPoints) {
                    console.log('mission success')
                    this.$store.commit('setSuccessesInARow', this.prev_success_in_a_row+1==3? 0: this.prev_success_in_a_row+1)
                    // nextPoints = parseInt(achievedPoints*1.05);
                    nextPoints = parseInt(average_achieved_points);
                    console.log('nextPoints')
                    console.log(nextPoints)
                    console.log('usedTime')
                    console.log(usedTime)
                    nextPoints += (usedTime<=60)? 11: (usedTime<=90)? 6: (usedTime<=105)? 3: 0;
                    console.log('nextPoints')
                    console.log(nextPoints)
                    last_digit = nextPoints % 10;
                    if (last_digit <= 5) {
                        console.log('last_digit1')
                        console.log(nextPoints - last_digit+5);
                        this.missionPoints = nextPoints - last_digit + 5
                    } 
                    else {
                        console.log('last_digit2')
                        console.log(nextPoints - last_digit+10);
                        this.missionPoints = nextPoints - last_digit + 10
                    }

                } 
                else {
                    this.$store.commit('setSuccessesInARow', this.prev_success_in_a_row-1<=0? 0: this.prev_success_in_a_row-1)
                    // nextPoints = parseInt(achievedPoints*0.95);
                    console.log('mission fail')
                    nextPoints = parseInt(average_achieved_points-10);
                    last_digit = nextPoints % 10;
                    if (last_digit <= 5) {
                        console.log('last_digit1')
                        console.log(nextPoints - last_digit+5);
                        this.missionPoints = nextPoints - last_digit + 5
                    } 
                    else {
                        console.log('last_digit2')
                        console.log(nextPoints - last_digit+10);
                        this.missionPoints = nextPoints - last_digit + 10
                        
                    }
                }

                fetch('http://127.0.0.1:5051/next_task', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "session_id": this.$store.state.sessionID,
                        "log_mission_data": "true",
                        "nth_mission": 0,
                        "mission_time": missionTime,
                        "mission_points": missionPoints,
                        "success": achievedPoints >= missionPoints,
                        "points_achieved": achievedPoints,
                        "response_time": usedTime,
                        "rank_now": this.prev_success_in_a_row+1==3 ? this.rank_now+1 : this.rank_now,
                        "successes_in_a_row_now": this.$store.state.success_in_a_row,
                        "successes_overall": 0,
                        "saved_points_now": 0
                    })
                })
                .then(response => response.json())
                .then(data => {
                    console.log('response from server to log_mission_data')
                    console.log(data)
                })
                .catch((error) => {
                    console.error('Error:', error);
                });


            }
            this.currentComponent = 'HomeComponent';
        },

        returnLanding() {
            console.log('returnLanding ContainerComp');
            this.$emit('return-landing');
        }
    }
};
</script>

<style>
.container {
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.navigation-bar{
    height: 5vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    padding-top: 5px;
    padding-bottom: 2px;
}
.exit-button,
.more-button {
    cursor: pointer;
    padding: 5px;
}

.main-component {
    flex-grow: 1;
}





</style>
