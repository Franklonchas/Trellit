<template>
    <div style="height: 80% !important" >
        <Navbar></Navbar>
        <Settings class="h-100"></Settings>
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
