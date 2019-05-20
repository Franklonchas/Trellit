<template>
    <div id="cal">
        <h1 style="text-align: center">Roadmap Global</h1>
        <br>
        <calendar-view
                :show-date="showDate"
                :startingDayOfWeek="1"
                class="theme-default holiday-us-traditional holiday-us-official">
            <calendar-view-header
                    slot="header"
                    slot-scope="t"
                    :header-props="t.headerProps"
                    @input="setShowDate"/>
        </calendar-view>
        <br><br>
    </div>
</template>

<script>
    import {CalendarView, CalendarViewHeader} from "vue-simple-calendar"
    require("vue-simple-calendar/static/css/default.css");
    require("vue-simple-calendar/static/css/holidays-us.css");

    export default {
        name: "calendar",
        data: function () {
            return {
                showDate: new Date(),
            }
        },
        components: {
            CalendarView,
            CalendarViewHeader,
        },
        methods: {
            setShowDate(d) {
                this.showDate = d;
            },
        },
        props: {}
    }
</script>

<style scoped>
    #cal {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        color: #2c3e50;
        height: auto;
        width: 90vw;
        margin-left: auto;
        margin-right: auto;
    }
</style>
