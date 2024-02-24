
<template>
    <div>
        <AbortMissionModal v-if="abort_mission_modal" @close="checkModal"></AbortMissionModal>
        <div class="navigation-bar">
            <div @click="abortMission(null)" class="exit-button">
                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.48 14.196C15.7787 14.5373 15.928 14.9 15.928 15.284C15.928 15.732 15.736 16.116 15.352 16.436C15.0533 16.692 14.7333 16.82 14.392 16.82C13.9013 16.82 13.4427 16.596 13.016 16.148L8.088 10.804L3.16 16.148C2.73333 16.5747 2.27467 16.788 1.784 16.788C1.37867 16.788 1.048 16.6707 0.792 16.436C0.429333 16.1373 0.248 15.7533 0.248 15.284C0.248 14.8573 0.397333 14.4947 0.696 14.196L5.944 8.5L1.08 3.22C0.738667 2.836 0.568 2.43067 0.568 2.004C0.568 1.53467 0.749333 1.15067 1.112 0.851999C1.41067 0.617333 1.72 0.5 2.04 0.5C2.59467 0.5 3.096 0.745333 3.544 1.236L8.088 6.164L12.632 1.236C13.08 0.745333 13.56 0.5 14.072 0.5C14.4133 0.5 14.7333 0.617333 15.032 0.851999C15.416 1.172 15.608 1.556 15.608 2.004C15.608 2.43067 15.4373 2.836 15.096 3.22L10.232 8.5L15.48 14.196Z" fill="black"/>
                </svg>
            </div>
            <div class="more-button">
                <svg width="29" height="8" viewBox="0 0 41 11" fill="none" >
                </svg>
            </div>
        </div>
        <div id="state">
            <div id="coin"><svg width="81" height="81" viewBox="0 0 81 81" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="40.5" cy="40.3954" r="24.0253" fill="white" stroke="black" stroke-width="5"/>
<path d="M43.6511 22.9462L33.2041 44.5152" stroke="black" stroke-width="3.5" stroke-linecap="round"/>
<path d="M33.204 44.5152L45.4815 36.3437" stroke="black" stroke-width="3.5" stroke-linecap="round"/>
<path d="M34.8227 55.6058C34.4234 56.486 34.8133 57.5232 35.6935 57.9225C36.5737 58.3217 37.6109 57.9318 38.0101 57.0517L34.8227 55.6058ZM43.8879 35.6208L34.8227 55.6058L38.0101 57.0517L47.0753 37.0666L43.8879 35.6208Z" fill="black"/>
<path d="M41.8691 53.2753L36.4163 56.3288" stroke="black" stroke-width="3.5" stroke-linecap="round"/>
<path d="M34.8255 50.4782L36.4163 56.3288" stroke="black" stroke-width="3.5" stroke-linecap="round"/>
                        </svg></div>
            <div id="current_points">{{ currentPoints }}</div>
            <div id="mission_points">/ {{ missionPoints }}</div>
            <div id="timer" :class="{timeCountdown: time < 5}">{{ prettyTime }}</div>
        </div>
        <transition :name="transitionName">
        <component id="game_comp" :is="currentGameComponent" v-bind="currentGameProperties"  v-on="currentGameEvents"  class="game-component"/>
        </transition>
    </div>
</template>

<script>
import {Howl} from 'howler';
import ChoiceComponent from './ChoiceComponent.vue';
import TaskComponent from './TaskComponent.vue';
import AbortMissionModal from './AbortMissionModal.vue';    
// import RateComponent from './RateComponent.vue';    

let missingPoints
let ticking_sound, mission_failed_sound
// let successAudio = new Audio(require('@/assets/successAudio.mp3')); // path to file
export default {
    name: 'GameComponent',
    created(){
        ticking_sound = new Howl({
            src: [require('@/assets/ticking/clock-ticking.mp3')],
          });
        mission_failed_sound = new Howl({
            src: [require('@/assets/mission_failed/mission_failed.wav')],
          });
    },
    components: {
        ChoiceComponent,
        TaskComponent,
        AbortMissionModal
        // RateComponent
    },
    props: {
        missionPoints: {
            type: Number,
            required: true
        },
        missionTime:{
            type: Number,
            required: true
        }
    },

    data() {
        return {
            abort_mission_modal: false,
            currentPoints: 0,
            time: this.missionTime,
            timerId: null,
            timeCountdown: false,
            currentDifficulty: null,
            currentGameComponent: 'ChoiceComponent',
            currentGameProperties: {},
            // successAudio: successAudio
        }
    },
    mounted(){

        this.timerId = setInterval(() => {
            // console.log(this.time)
            // console.log(this.missionTime)
            this.time -= 1
            if(this.time==5){
                ticking_sound.play()
            }
            if(this.time == 0){
                this.returnHome(this.currentPoints)
            }
        }, 1000);
    },
    unmounted(){
        clearInterval(this.timerId);
    },

    computed: {
        prettyTime: function() {
            let minutes = Math.floor(this.time / 60);
            let seconds = this.time % 60;
            if (seconds < 10) {
           
                seconds = '0' + seconds;
            }
            return minutes + ':' + seconds;
        },
        currentGameEvents: function() {
            if (this.currentGameComponent === 'ChoiceComponent') {
                return { 'task-selected': this.loadTask }
            }
            if (this.currentGameComponent === 'TaskComponent') {
                return { 'task-checked': this.updateState }
            }
            return {};
        },
        transitionName() {
            return this.currentGameComponent === 'ChoiceComponent' ? 'choice' : 'task';
        },

       
    },
    methods: {
        abortMission() {
            this.abort_mission_modal = true;
        },
        checkModal(closeBool) {
            this.abort_mission_modal = false;
            if (closeBool === 1) {
                this.returnHome()
            }
        },
        loadTask(difficulty, choiceTime) {
            console.log('loadTask');
            console.log(difficulty);
            // console.log(0.005+(0.165*(difficulty-1)))
            fetch('https://taskdifficulty.robert-spang.de/next_task', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "session_id": this.$store.state.sessionID,
                    "get_task": "true",
                    "difficulty": difficulty
                })
            })
            .then(response => response.json())
            .then(data => {
                // console.log('data')
                // console.log(data)
                // this.currentDifficulty = difficulty
                this.currentGameProperties = { difficulty: difficulty, tries: 3, currentPoints: this.currentPoints,  missionPoints: this.missionPoints, data: data, choiceTime: choiceTime};
                this.currentGameComponent = 'TaskComponent';
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            // this.currentGameComponent = 'TaskComponent';
        },

        //called when time is up or the user returns home 

        returnHome(currentPoints) {
            ticking_sound.stop()
            console.log('Current Points in returnHome (GameComponent): ', currentPoints)
            missingPoints = 0
            if(currentPoints){
                if(currentPoints >= this.missionPoints){
                    console.log('you won')
                }
                else{
                    console.log("You lost!")
                    missingPoints= this.missionPoints - currentPoints
                    mission_failed_sound.play()
                }
                let usedTime = this.missionTime - this.time
                console.log('used Time: ', usedTime)
                let achievedPoints = this.currentPoints
                this.currentGameProperties = {}
                this.currentGameComponent = 'ChoiceComponent'
                this.timeCountdown = false
                ticking_sound.stop()
                clearInterval(this.timerId);
                this.currentPoints = 0

                // fetch('https://taskdifficulty.robert-spang.de/next_task', {
                //     method: 'POST',
                //     headers: {
                //     'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify({
                //         "session_id": this.$store.state.sessionID,
                //         "log_mission_data": "true",
                //         "nth_mission": 0,
                //         "mission_time": this.missionTime,
                //         "mission_points": this.missionPoints,
                //         "success": currentPoints >= this.missionPoints,
                //         "points_achieved": achievedPoints,
                //         "response_time": usedTime,
                //         "rank_now": 0,
                //         "successes_in_a_row_now": 0,
                //         "successes_overall": 0,
                //         "saved_points_now": 0
                //     })
                // })
                // .then(response => response.json())
                // .then(data => {
                //     console.log('response from server to log_mission_data')
                //     console.log(data)
                // })
                // .catch((error) => {
                //     console.error('Error:', error);
                // });
                this.$emit('return-home', this.missionPoints, achievedPoints, this.missionTime, usedTime);
            }
            else {
                this.$emit('return-home', null, null, null, null);
            }

        },

        updateState(points){
            this.currentPoints += points
            if (this.currentPoints >= this.missionPoints){
                this.returnHome(this.currentPoints)
            }
            else{
                this.currentGameProperties = {}
                this.currentGameComponent = 'ChoiceComponent'
            }
        }
    },

};
</script>



<style scoped>
/* For ChoiceComponent */
.choice-enter-active, .choice-leave-active {
  transition: all 0.1s;
}
.choice-enter-from {
  transform: translateX(-100%);
}
.choice-leave-to {
  transform: translateX(100%);
}

/* For TaskComponent */
.task-enter-active, .task-leave-active {
  transition: all 0.1s;
}
.task-enter-from {
  transform: translateX(100%);
}
.task-leave-to {
  transform: translateX(-100%);
}
#state {
    margin-left: 3%;
    margin-right: 3%;
    /* margin-bottom: 4; */
    height: 10vh;
    /* padding: 0.3vh; */
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    justify-items: center;
    align-items: center;
    font-weight: 600;
    font-family: Kodchasan;
    color: #000;
}

#coin {
    grid-row: 1/3;
    grid-column: 1/2;
}

#current_points {
    justify-self: start;
    font-size: 30px;
    grid-row: 1/2;
    grid-column: 2/3;
}

#mission_points {
    justify-self: start;
    font-size: 30px;
    grid-row: 2/3;
    grid-column: 2/3;
}

#timer {
    font-size: 26px;
    grid-row: 1/3;
    grid-column: 4/5;
    vertical-align: middle;
    margin-top: 3%;
    margin-bottom: 3%;
    padding-right: 6px;
    justify-self: start;
}
.timeCountdown{
    color: red;
}
.game-component {
    width: 100%;
    top: 20vh;
    height: 80vh;
    position: absolute;
}

</style>
