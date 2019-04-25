<template>
    <div id="app">
        <keep-alive>
            <router-view/>
        </keep-alive>
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
