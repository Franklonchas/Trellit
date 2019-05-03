<template>
    <div>
        <Navbar></Navbar>
        <Settings></Settings>
    </div>
</template>

<script>
    import Navbar from '../components/navbar'
    import Settings from '../components/settings'

    export default {
        name: "Ajustes",
        components: {
            Navbar, Settings
        }
    }
</script>

<style scoped>

</style>
