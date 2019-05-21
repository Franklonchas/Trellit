<template>
    <div id="cal">
        <div class="calendar-controls">
            <div v-if="message" class="notification is-success">{{ message }}</div>

            <div class="box">
                <div class="field">
                    <label class="label">Title</label>
                    <div class="control">
                        <input v-model="newEventTitle" class="input" type="text">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Start date</label>
                    <div class="control">
                        <input v-model="newEventStartDate" class="input" type="date">
                    </div>
                </div>

                <div class="field">
                    <label class="label">End date</label>
                    <div class="control">
                        <input v-model="newEventEndDate" class="input" type="date">
                    </div>
                </div>

                <button class="button is-info" @click="clickTestAddEvent">Add Event</button>
            </div>
        </div>
        <div class="calendar-parent">
            <calendar-view
                    :events="events"
                    :show-date="showDate"
                    :startingDayOfWeek="1"
                    :time-format-options="{hour: 'numeric', minute:'2-digit'}"
                    :enable-drag-drop="true"
                    :disable-past="disablePast"
                    :disable-future="disableFuture"
                    :show-event-times="showEventTimes"
                    :display-period-uom="displayPeriodUom"
                    :display-period-count="displayPeriodCount"
                    :starting-day-of-week="startingDayOfWeek"
                    :class="themeClasses"
                    :period-changed-callback="periodChanged"
                    :current-period-label="useTodayIcons ? 'icons' : ''"
                    @drop-on-date="onDrop"
                    @click-date="onClickDay"
                    @click-event="onClickEvent">
                <calendar-view-header
                        slot="header"
                        slot-scope="{ headerProps }"
                        :header-props="headerProps"
                        @input="setShowDate"/>
            </calendar-view>
        </div>
    </div>
</template>
<script>
    import firebase from 'firebase'

    require("vue-simple-calendar/static/css/default.css");
    require("vue-simple-calendar/static/css/holidays-us.css");
    import {CalendarView, CalendarViewHeader, CalendarMathMixin,} from "vue-simple-calendar"

    export default {
        name: "App",
        components: {
            CalendarView,
            CalendarViewHeader,
        },
        mixins: [CalendarMathMixin],
        data() {
            return {
                showDate: this.thisMonth(1),
                message: "",
                startingDayOfWeek: 0,
                disablePast: false,
                disableFuture: false,
                displayPeriodUom: "month",
                displayPeriodCount: 1,
                showEventTimes: true,
                newEventTitle: "",
                newEventStartDate: "",
                newEventEndDate: "",
                useDefaultTheme: true,
                useHolidayTheme: true,
                useTodayIcons: false,
                colorsList: [],
                events: [],
            }
        },
        computed: {
            userLocale() {
                return this.getDefaultBrowserLocale
            },
            dayNames() {
                return this.getFormattedWeekdayNames(this.userLocale, "long", 0)
            },
            themeClasses() {
                return {
                    "theme-default": this.useDefaultTheme,
                    "holiday-us-traditional": this.useHolidayTheme,
                    "holiday-us-official": this.useHolidayTheme,
                }
            },
        },
        mounted() {
            this.newEventStartDate = this.isoYearMonthDay(this.today());
            this.newEventEndDate = this.isoYearMonthDay(this.today());
            firebase.database().ref('calendar/').on('value', snapshots => this.loadCalendar(snapshots.val()));
        },
        methods: {
            periodChanged(range, eventSource) {
                //console.log(eventSource);
                //console.log(range);
            },
            thisMonth(d, h, m) {
                const t = new Date();
                return new Date(t.getFullYear(), t.getMonth(), d, h || 0, m || 0)
            },
            onClickDay(d) {
                this.message = `You clicked: ${d.toLocaleDateString()}`
            },
            onClickEvent(e) {
                this.message = `You clicked: ${e.title}`
            },
            setShowDate(d) {
                this.message = `Changing calendar view to ${d.toLocaleDateString()}`
                this.showDate = d
            },
            onDrop(event, date) {
                this.message = `Has modificado ${event.title} a ${date.toLocaleDateString()}`
                const eLength = this.dayDiff(event.startDate, date);
                event.originalEvent.startDate = this.addDays(event.startDate, eLength);
                event.originalEvent.endDate = this.addDays(event.endDate, eLength);

                let month1 = event.originalEvent.startDate.getUTCMonth() + 1; //months from 1-12
                let day1 = event.originalEvent.startDate.getUTCDate();
                let year1 = event.originalEvent.startDate.getUTCFullYear();

                let newdate = year1 + "/" + month1 + "/" + day1;

                let month2 = event.originalEvent.endDate.getUTCMonth() + 1; //months from 1-12
                let day2 = event.originalEvent.endDate.getUTCDate();
                let year2 = event.originalEvent.endDate.getUTCFullYear();

                let newdate2 = year2 + "/" + month2 + "/" + day2;


                for (let i = 0; i < this.events.length; i++) {
                    if (this.events[i].id === event.id) {
                        firebase.database().ref('calendar/' + this.events[i].clave).set({
                            startDate: newdate,
                            endDate: newdate2,
                            title: this.events[i].title,
                            id: this.events[i].id,
                            classes: this.events[i].classes
                        }).then(() => {
                            this.$notify({
                                group: 'foo',
                                title: 'Evento cambiado!',
                                text: 'Compruebe su agenda',
                                type: 'success',
                                position: 'top left',
                                duration: 3500,
                                speed: 1500
                            });
                        });
                        i = this.events.length;
                    }
                }
            },
            clickTestAddEvent() {
                //Aqui se añaden las tareas
                firebase.database().ref('calendar/').push({
                    startDate: this.newEventStartDate,
                    endDate: this.newEventEndDate,
                    title: this.newEventTitle,
                    id:
                        "e" +
                        Math.random()
                            .toString(36)
                            .substr(2, 10),
                    classes: this.colorRandom(),
                }).then(() => {
                    this.$notify({
                        group: 'foo',
                        title: 'Evento añadido al calendario!',
                        text: 'Compruebe la agenda',
                        type: 'success',
                        position: 'top left',
                        duration: 3500,
                        speed: 1500
                    });
                });
            },
            colorRandom: function () {
                let random;
                this.colorsList = ['purple', 'green', 'red', 'blue', 'yellow', 'grey', 'orange', 'brown'];
                random = Math.floor(Math.random() * this.colorsList.length);
                return this.colorsList[random];
            },
            loadCalendar: function (cal) {
                // classes: birthday
                this.events = [];

                for (let key in cal) {
                    this.events.push({
                        startDate: cal[key].startDate,
                        endDate: cal[key].endDate,
                        title: cal[key].title,
                        id: cal[key].id,
                        classes: cal[key].classes,
                        clave: key
                    })
                }
            }
        },
    }
</script>

<style>

    #cal {
        display: flex;
        flex-direction: row;
        font-family: Calibri, sans-serif;
        width: 100vw;
        min-width: 35rem;
        max-width: 105rem;
        min-height: 45rem;
        margin-left: auto;
        margin-right: auto;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-right: 30px;
    }


    .calendar-controls {
        margin-right: 1rem;
        min-width: 14rem;
        max-width: 14rem;
    }

    .calendar-parent {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        overflow-x: hidden;
        overflow-y: hidden;
        max-height: 80vh;
        background-color: white;
    }

    .cv-wrapper.period-month.periodCount-2 .cv-week,
    .cv-wrapper.period-month.periodCount-3 .cv-week,
    .cv-wrapper.period-year .cv-week {
        min-height: 6rem;
    }

    .theme-default .cv-event.birthday {
        background-color: #e0f0e0;
        border-color: #d7e7d7;
    }

    .theme-default .cv-event.birthday::before {
        content: "\1F382";
        margin-right: 0.5em;
    }
</style>
