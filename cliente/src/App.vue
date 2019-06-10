<template>
    <div id="app" class="h-100">
        <router-view/>
        <myfooter></myfooter>
        <notifications group="foo"/>
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
