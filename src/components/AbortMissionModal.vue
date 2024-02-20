<template>
    <div>
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">

              <div class="modal-header">
                <slot name="header">
                  <p> Sure you want to abort the missioin? </p>

                </slot>
              </div>



              <div class="modal-footer">
                <slot name="footer">
                  <button id="continue_btn"  @click="close(0)">
                    Continue
                  </button>
                  <button id="abort_btn"  @click="close(1)">
                    Abort Mission
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
        name: 'AbortMissionModal',
        data() {
            return {
            }
        },
        computed: {
            sessionID() {
              return this.$store.state.sessionID
            }
        },
        methods: {
            close(closeBool) {
                this.$emit('close',closeBool)
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

#abort_btn {
  margin-right: 30px;
  float: left;
}

#continue_btn {
  margin-left: 30px;
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