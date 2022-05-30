<template>
  <div
    class="
      w-full
      md:w-screen
      h-screen
      flex
      justify-center
      items-center
      fixed
      top-0
      left-0
      z-50
      bg-black bg-opacity-40
    "
  >
    <div
      class="
        w-full
        md:w-1/2
        p-10
        flex flex-col
        relative
        justify-center
        m-4
        md:m-0
        shadow-lg
        rounded-xl
        mt-2
        bg-white
        slidedown
      "
    >
      <span
        class="absolute top-2 right-4 text-3xl text-red-600 hover:text-red-800 cursor-pointer"
        @click="$emit('close-modal')"
      >
        <span class="fa fa-times"></span>
      </span>
      <div class="flex flex-col justify-center">
        <div class="text-center mb-5">
          <h6 class="text-3xl font-semibold text-center">
            Instruction
          </h6>
        </div>
         <div class="w-full flex md:w-auto items-center justify-center">
      <!-- <video-player
        src="https://firebasestorage.googleapis.com/v0/b/greencheddar-9525f.appspot.com/o/guide.mp4?alt=media&token=7a5dd40d-65d6-4ba7-aa3e-c098ba7e2e67"
      /> -->
<iframe width="560" height="315" src="https://www.youtube.com/embed/nc5kDwFlBmI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>  
<!-- <video autoplay width="1280" height="720" controls class="outline-none" src="https://firebasestorage.googleapis.com/v0/b/greencheddar-9525f.appspot.com/o/guide.mp4?alt=media&token=7a5dd40d-65d6-4ba7-aa3e-c098ba7e2e67"></video> -->
    </div>
        <div v-if="!checkboxStatus" class="form-group mt-10">
             <input id="showOption" type="checkbox" @change="showStatusChecker($event)">
             <label class="mt-5 text-sm font-bold" for="showOption">Don't show me again</label>
        </div>
        <div class="mt-5 w-auto ml-auto">
            <button class="btn btn-sm border-accent text-accent hover:text-white hover:bg-accent" @click="$emit('continue')">Continue</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {  
  data(){
    return{
      checkboxStatus: false
    }
  },

  created(){
    if(localStorage.getItem('showStatus')){
      this.checkboxStatus = true
    }
  },
  methods:{
      showStatusChecker(event){
          console.log(event.target.checked);
          this.$emit('checked-value', event.target.checked)
      }
  }
}
</script>

<style scoped>


.form-group {
  display: block;
  margin-bottom: 15px;
}

.form-group input {
  padding: 0;
  height: initial;
  width: initial;
  margin-bottom: 0;
  display: none;
  cursor: pointer;
}

.form-group label {
  position: relative;
  cursor: pointer;
}

.form-group label:before {
  content:'';
  -webkit-appearance: none;
  background-color: transparent;
  border: 2px solid #009168;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
  padding: 10px;
  display: inline-block;
  position: relative;
  vertical-align: middle;
  cursor: pointer;
  margin-right: 5px;
}

.form-group input:checked + label:after {
  content: '';
  display: block;
  position: absolute;
  top: 2px;
  left: 9px;
  width: 6px;
  height: 14px;
  border: solid #009168;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
</style>