<template>
    <div>
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">

              <div class="modal-header">
                <slot name="header">
                  <p> Das war für Stufe {{ difficulty }} von 7 ... </p>
                  <div class="diff">
                    <input type="radio" id="schwer" name="bewertung" value="schwer" v-model="picked">
                    <label for="schwer">zu schwer</label>
                  </div>
                  <div class="diff">
                    <input type="radio"  id="gut" name="bewertung" value="gut" v-model="picked">
                    <label for="gut">gut</label>
                  </div>
                  <div class="diff">
                    <input type="radio" id="einfach" name="bewertung" value="einfach" v-model="picked" >
                  <label for="einfach">zu einfach</label>
                  </div>
                </slot>
              </div>

              <div class="modal-body">
                <slot name="body">
                  
      
                  

                  
                  <p>Bitte bewerte die Schwierigkeit auf einer Skala von 1-7</p>
                  <div class="diff">
                    <input type="radio"  id="ein" name="rate" value="1" v-model="rate">
                    <label for="ein">1</label>
                  </div>
                  <div class="diff">
                    <input type="radio" id="zwei" name="rate" value="2" v-model="rate">
                    <label for="zwei">2</label>
                  </div>
                  
                  <div class="diff">
                    <input type="radio" id="drei" name="rate" value="3" v-model="rate">
                    <label for="drei">3</label>
                  </div>
              
                  <div class="diff">
                    <input type="radio" id="vier" name="rate" value="4" v-model="rate">
                    <label for="vier">4</label>
                  </div>
                 
                  <div class="diff">
                    <input type="radio" id="fünf" name="rate" value="5" v-model="rate">
                    <label for="fünf">5</label>
                  </div>
                  
                  <div class="diff">
                    <input type="radio" id="sechs" name="rate" value="6" v-model="rate">
                    <label for="sechs">6</label>
                  </div>
                  
                  <div class="diff">
                    <input type="radio"  id="sieben" name="rate" value="7" v-model="rate">
                    <label for="sieben">7</label>
                  </div>
                  
             
                </slot>
              </div>

              <div class="modal-footer">
                <slot name="footer">
                  
                  <button class="modal-default-button" @click="close">
                    OK
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
    export default {
        name: 'RateComponent',
        props: { 
          difficulty: {
            type: Number,
            required: true
        }, 
        tries: {
            type: Number,
            required: true
        },
        data:
        {
            type: Object,
            required: true,
  
        }
        },
        data() {
            return {
                picked: null,
                rate: null
            }
        },
        computed: {
            sessionID() {
              return this.$store.state.sessionID
            }
        },
        methods: {
            close() {
                // console.log('close')
                // console.log(this.picked)
                this.$emit('close', this.picked, this.rate)
            }
        }
    }
</script>

<style lang="css" scoped>

.diff {
  display: inline;
  margin-left: 2%;
  margin-right: 2%;
}
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