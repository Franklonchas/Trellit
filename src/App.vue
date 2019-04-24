<template>
    <div id="app">
        <router-view/>
        <myfooter></myfooter>
    </div>
</template>

<script>
    import myfooter from './components/my-footer'

    export default {
        components: {
            myfooter
        }
    }
</script>

<style>

</style>
