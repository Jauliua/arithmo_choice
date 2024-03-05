// import { createApp } from 'vue'
import App from './App.vue'
import "./global.css";

// createApp(App).mount('#app')


// import Vue from 'vue'
// import store from './store'
// import App from './App.vue'
// import "./global.css";
// new Vue({
//     store,
//     render: h => h(App),
//   }).$mount('#app')



import { createApp } from 'vue'
import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      sessionID: null,
      rank: null,
      success_in_a_row: null,
      nth_mission: null,
      start_mission_points: 15,
      skips: null,
      past_missions: [],
      past_successes: [],
      past_achieved_points: [],
      past_response_times: []
    }
  },
    mutations: {
        setSessionID(state, id) {
        state.sessionID = id
        },
        setRank(state, rank) {
            console.log('setting rank to: ' + rank)
            state.rank = rank
        },
        setSuccessesInARow(state, successes) {
            state.success_in_a_row = successes
        },
        setPastMissions(state, past_missions) {
          if (past_missions != -1) {
            if (Array.isArray(past_missions)) {
              state.past_missions = past_missions
            } else {
              state.past_missions.push(past_missions)
            }
          }
        },
        setPastSuccesses(state, past_successes) {
          if (past_successes != -1) {
            if (Array.isArray(past_successes)) {
              state.past_successes = past_successes
            } else {
              state.past_successes.push(past_successes)
            }
          }
        },
        setPastAchievedPoints(state, past_achieved_points) {
          console.log('past_achieved_points: ' + past_achieved_points)
          console.log(Array.isArray(past_achieved_points))
          
          if (past_achieved_points != -1) {
            if (Array.isArray(past_achieved_points)) {
              console.log('settingArray past_achieved_points to: ' + past_achieved_points)
              state.past_achieved_points = past_achieved_points
            } else {
              console.log('appending Array past_achieved_points with: ' + past_achieved_points)
              state.past_achieved_points.push(past_achieved_points)
            }
          }
        },
        setPastResponseTimes(state, past_response_times) {
          console.log('past_response_times: ' + past_response_times)
          console.log(Array.isArray(past_response_times))
          if (past_response_times != -1) {
            if (Array.isArray(past_response_times)) {
              console.log('settingArray past_response_times to: ' + past_response_times)
              state.past_response_times = past_response_times
            } else {
              console.log('appending Array past_response_times with: ' + past_response_times)
              state.past_response_times.push(past_response_times)
            }
          }
        },
        setStartMissionPoints(state, start_mission_points) {
          state.start_mission_points = start_mission_points
        },
        setSkips(state, skips) {
          console.log('setting skips to: ' + skips)
          state.skips = skips
        },
        setNthMission(state, nth_mission) {
          state.nth_mission = nth_mission
        }
    }
})

const app = createApp(App)

// Install the store instance as a plugin
app.use(store)
app.mount('#app')