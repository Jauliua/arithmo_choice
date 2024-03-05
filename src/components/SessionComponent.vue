<template>
    <div>
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">

              <div class="modal-header">
                <slot name="header">
                  <h3> please enter your name</h3>
                </slot>
              </div>

              <div class="modal-body">
                    <input type="text" id="sessionName" name="sessionName" v-model="sessionID">
              </div>

              <div class="modal-footer">
                <slot name="footer">

                  <button class="modal-default-button" @click="enter">
                    Enter
                  </button>
                  <br>
                </slot>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
let usedTime
let achievedPoints
let missionPoints
let nextPoints
export default {
        name: 'SessionComponent',
        
        data() {
            return {
                sessionID: null
            }
        },
        computed:{
          past_achieved_points: function(){
              return this.$store.state.past_achieved_points
          },
          past_response_times: function(){
              return this.$store.state.past_response_times
          },
        },
        methods: {
            enter() {
                this.$store.commit('setSessionID', this.sessionID)
                fetch('https://taskdifficulty.robert-spang.de/next_task', {
                // fetch('http://127.0.0.1:5051/next_task', {

                  method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "session_id": this.sessionID,
                        "get_session_data": "true"
                    })
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('data after initial session_id')
                        console.log(data)
                        // 'session_id': data['session_id'],
                        // 'nth_mission': 0,
                        // 'mission_time': 0,
                        // 'success': 0,
                        // 'points_achieved': 0,
                        // 'response_time': 0,
                        // 'rank_now': 1,
                        // 'successes_in_a_row_now': 0,
                        // 'successes_overall': 0,
                        // 'saved_points_now': 0
                        this.$store.commit('setRank', data['rank_now'])
                        this.$store.commit('setSuccessesInARow', data['successes_in_a_row_now'])
                        this.$store.commit('setPastMissions', data['past_missions'])
                        this.$store.commit('setPastSuccesses', data['past_successes'])
                        this.$store.commit('setPastAchievedPoints', data['past_achieved_points'])
                        this.$store.commit('setPastResponseTimes', data['past_response_times'])
                        this.$store.commit('setSkips', data['skips'])
                        this.$store.commit('setNthMission', data['nth_mission'])
                        usedTime = data['past_response_times'][data['past_response_times'].length-1]
                        achievedPoints = data['past_achieved_points'][data['past_achieved_points'].length-1]
                        missionPoints = data['past_missions'][data['past_missions'].length-1]

                        if (achievedPoints >= missionPoints) {
                          nextPoints = (usedTime<=30)? 15 : (usedTime<=60)? 10: (usedTime<=90)? 5: 0;
                          missionPoints = missionPoints + nextPoints; 
                        } 
                        else {
                            nextPoints = (missionPoints-achievedPoints>=20) ? 15 : (missionPoints-achievedPoints>=10) ? 10 : 0;
                            missionPoints = Math.max(15, missionPoints - nextPoints);
                        }
                        if(missionPoints){
                          this.$store.commit('setStartMissionPoints', missionPoints)
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    })
                this.$emit('close')
                }
            }
    }
</script>

<style lang="css" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>