<template>
    <v-app class="lel" id="dayspan" v-cloak>
        <ds-calendar-app :calendar="calendar"></ds-calendar-app>
    </v-app>
</template>

<script>

    import {Calendar} from 'dayspan';

    export default {
        name: "calendar",
        data: () => ({
            calendar: Calendar.months()
        }),
    }
</script>

<style scoped>

</style>
