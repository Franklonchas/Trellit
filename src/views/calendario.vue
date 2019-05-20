<template>
    <div class="calendario">
        <Navbar></Navbar>
        <Calendar></Calendar>
    </div>
</template>

<script>
    import Calendar from '../components/calendar'
    import Navbar from '../components/navbar'

    export default {
        name: "calendario",
        components: {
            Calendar, Navbar
        },
    }
</script>

<style scoped>

</style>
