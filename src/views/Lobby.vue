<template>
    <div class="Lobby">
        <Navbar></Navbar>
        <Homelobby></Homelobby>
    </div>
</template>

<script>
    import Homelobby from '../components/homelobby'
    import Navbar from '../components/navbar'

    export default {
        name: "Lobby",
        data: function () {
            return {}
        },
        components: {Navbar, Homelobby},
        methods: {},
        mounted() {
        }
    }
</script>

<style scoped>

</style>
