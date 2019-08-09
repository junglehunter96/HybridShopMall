<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
//rem方案
const MAX_FONT_SIZE = 50;
window.document.addEventListener('DOMContentLoaded',()=>{
  const HTML = document.querySelector('html');
  let font_size = window.innerWidth / 10;
  font_size = font_size < MAX_FONT_SIZE ? font_size : MAX_FONT_SIZE;
  HTML.style.fontSize = font_size + "px";

})
export default {

}
</script>



