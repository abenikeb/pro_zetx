

<template>
  <div
    class="
      z-50
      fixed
      top-0
      left-0
      w-full
      h-full
      bg-white bg-opacity-50
      flex
      justify-center
      items-center
    "
  >
    <div class="loadingio-spinner-ellipsis-wsclip50o6q z-50">
      <div class="ldio-zejxqo2x1aq">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes ldio-zejxqo2x1aq {
  0% {
    transform: translate(12px, 80px) scale(0);
  }
  25% {
    transform: translate(12px, 80px) scale(0);
  }
  50% {
    transform: translate(12px, 80px) scale(1);
  }
  75% {
    transform: translate(80px, 80px) scale(1);
  }
  100% {
    transform: translate(148px, 80px) scale(1);
  }
}
@keyframes ldio-zejxqo2x1aq-r {
  0% {
    transform: translate(148px, 80px) scale(1);
  }
  100% {
    transform: translate(148px, 80px) scale(0);
  }
}
@keyframes ldio-zejxqo2x1aq-c {
  0% {
    background: #529a2e;
  }
  25% {
    background: #cec721;
  }
  50% {
    background: #589324;
  }
  75% {
    background: #ffc21b;
  }
  100% {
    background: #529a2e;
  }
}
.ldio-zejxqo2x1aq div {
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  transform: translate(80px, 80px) scale(1);
  background: #529a2e;
  animation: ldio-zejxqo2x1aq 1s infinite cubic-bezier(0, 0.5, 0.5, 1);
}
.ldio-zejxqo2x1aq div:nth-child(1) {
  background: #ffc21b;
  transform: translate(148px, 80px) scale(1);
  animation: ldio-zejxqo2x1aq-r 0.25s infinite cubic-bezier(0, 0.5, 0.5, 1),
    ldio-zejxqo2x1aq-c 1s infinite step-start;
}
.ldio-zejxqo2x1aq div:nth-child(2) {
  animation-delay: -0.25s;
  background: #529a2e;
}
.ldio-zejxqo2x1aq div:nth-child(3) {
  animation-delay: -0.5s;
  background: #ffc21b;
}
.ldio-zejxqo2x1aq div:nth-child(4) {
  animation-delay: -0.75s;
  background: #589324;
}
.ldio-zejxqo2x1aq div:nth-child(5) {
  animation-delay: -1s;
  background: #cec721;
}
.loadingio-spinner-ellipsis-wsclip50o6q {
  width: 200px;
  height: 200px;
  display: inline-block;
  overflow: hidden;
  background: transparent;
}
.ldio-zejxqo2x1aq {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.ldio-zejxqo2x1aq div {
  box-sizing: content-box;
}
</style>