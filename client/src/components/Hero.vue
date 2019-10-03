<template>
    <div class="hero">

    </div>
</template>

<script>
export default {
  name: "Hero"
}
</script>

<style lang="scss">

    .hero {
        height: calc(50vh - 30px);
        background: linear-gradient(0deg,rgba(0,0,0,0.4),rgba(0,0,0,0.5)), url('../assets/img/slide_01.jpg') center/cover no-repeat;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        display: block;
    }
    
</style>