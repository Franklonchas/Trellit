<template>
    <div class="calendario">
        <Calendar></Calendar>
        <Navbar></Navbar>
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
