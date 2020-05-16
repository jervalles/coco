<template>
  <div class="banner">
    <img class="banner-img" src='../images/banner.jpg'/>
    <img class="logo" src='../images/logo-main.jpg'/>
    
  </div>
</template>

<script>

export default {
  name: 'Banner'
}

</script>

<style lang="scss">

.banner {
  display: flex;
  justify-content: center;
  .banner-img {
  width: 100%;
  height: auto;
  position: relative;
  }

  .logo {
    position: absolute;
    height: 30vw;
    top: 16%;
    border-radius: 20px;
    border-color: wheat;
  }
}



</style>