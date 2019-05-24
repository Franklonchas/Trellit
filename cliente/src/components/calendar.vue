<template>
    <div class="winter-neva-gradient">
        <h1 style="text-align: center; padding-top: 30px"> Roadmap Global</h1>
        <mdb-container style="text-align: center;">
            <mdb-alert v-if="message" color="success">{{ message }}</mdb-alert>
            <div v-if="modifyEvent">
                <mdb-btn rounded color="default" @click="removeEve">Eliminar</mdb-btn>
                <mdb-btn rounded color="default" @click="setTrue">Modificar</mdb-btn>
                <mdb-modal :show="login2" @close="login2 = false">
                    <mdb-modal-header class="text-center">
                        <mdb-modal-title class="w-100" tag="h4" bold>
                            Modificar evento de Roadmap
                        </mdb-modal-title>
                    </mdb-modal-header>
                    <mdb-modal-body class="mx-3 grey-text">
                        <mdb-input style="text-align: left;" v-model="newEventTitle" label="Nuevo nombre..." icon="edit"
                                   type="text"
                                   class="mb-5"/>
                        <p>Seleccione una fecha de inicio:</p>
                        <date-picker v-model="date1" :config="options"></date-picker>
                        <br>
                        <p>Seleccione una fecha de finalización:</p>
                        <date-picker v-model="date2" :config="options"></date-picker>
                        <br>
                    </mdb-modal-body>
                    <mdb-modal-footer center>
                        <mdb-btn @click="modifyEve">Modificar Evento</mdb-btn>
                    </mdb-modal-footer>
                </mdb-modal>
            </div>
            <mdb-btn rounded color="default" @click="login=true">Añadir tarea</mdb-btn>
            <mdb-modal :show="login" @close="login = false">
                <mdb-modal-header class="text-center">
                    <mdb-modal-title class="w-100" tag="h4" bold>
                        Añadir evento a Roadmap
                    </mdb-modal-title>
                </mdb-modal-header>
                <mdb-modal-body class="mx-3 grey-text">
                    <mdb-input style="text-align: left;" v-model="newEventTitle" label="Evento..." icon="edit"
                               type="text" class="mb-5"/>
                    <p>Seleccione una fecha de inicio:</p>
                    <date-picker v-model="date1" :config="options"></date-picker>
                    <br>
                    <p>Seleccione una fecha de finalización:</p>
                    <date-picker v-model="date2" :config="options"></date-picker>
                    <br>
                </mdb-modal-body>
                <mdb-modal-footer center>
                    <mdb-btn @click="clickTestAddEvent">Añadr tarea</mdb-btn>
                </mdb-modal-footer>
            </mdb-modal>
        </mdb-container>

        <div id="cal">
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
    </div>
</template>
<script>
    import firebase from 'firebase'

    require("vue-simple-calendar/static/css/default.css");
    require("vue-simple-calendar/static/css/holidays-us.css");
    import {CalendarView, CalendarViewHeader, CalendarMathMixin} from "vue-simple-calendar"
    import DatePicker from "vue-bootstrap-datetimepicker/src/component";
    import {
        mdbContainer,
        mdbBtn,
        mdbModal,
        mdbModalHeader,
        mdbModalBody,
        mdbModalFooter,
        mdbInput,
        mdbModalTitle,
        mdbAlert
    } from 'mdbvue';

    export default {
        name: "App",
        components: {
            DatePicker,
            CalendarView,
            CalendarViewHeader,
            mdbContainer,
            mdbBtn,
            mdbModal,
            mdbModalHeader,
            mdbModalBody,
            mdbModalFooter,
            mdbInput,
            mdbModalTitle,
            mdbAlert
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
                date1: new Date(),
                date2: new Date(),
                options: {
                    format: 'YYYY/MM/DD',
                    useCurrent: true,
                },
                login: false,
                login2: false,
                modifyEvent: false,
                localEvento: '',
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
            removeEve: function () {
                for (let i = 0; this.events.length; i++) {
                    if (this.events[i].id === this.localEvento) {
                        firebase.database().ref('calendar/' + this.events[i].clave).remove().then(() => {
                            this.$notify({
                                group: 'foo',
                                title: 'Evento Eliminado.',
                                text: 'Compruebe su agenda',
                                type: 'warning',
                                position: 'top left',
                                duration: 3500,
                                speed: 1500
                            });
                        });
                        i = this.events.length;
                    }
                }
            },
            setTrue: function () {
                this.login2 = true;
            },
            modifyEve: function () {

                for (let i = 0; this.events.length; i++) {
                    if (this.events[i].id === this.localEvento) {
                        firebase.database().ref('calendar/' + this.events[i].clave).set({
                            startDate: this.date1,
                            endDate: this.date2,
                            title: this.newEventTitle,
                            id: this.events[i].id,
                            classes: this.events[i].classes
                        }).then(() => {
                            this.$notify({
                                group: 'foo',
                                title: 'Evento modificado!',
                                text: 'Compruebe su agenda',
                                type: 'success',
                                position: 'top left',
                                duration: 3500,
                                speed: 1500
                            });
                        });
                        i = this.events.length;
                        this.newEventTitle = '';
                        this.login2 = false;
                    }
                }
            },
            thisMonth(d, h, m) {
                const t = new Date();
                return new Date(t.getFullYear(), t.getMonth(), d, h || 0, m || 0)
            },
            onClickDay(d) {
                this.message = `Has seleccionado: ${d.toLocaleDateString()}`
                this.modifyEvent = false;
            },
            onClickEvent(e) {
                this.message = `Has seleccionado el evento: ${e.title}`
                this.localEvento = e.id;
                this.modifyEvent = true;
            },
            setShowDate(d) {
                this.modifyEvent = false;
                this.message = `Has cambiado a: ${d.toLocaleDateString()}`
                this.showDate = d
            },
            onDrop(event, date) {
                this.modifyEvent = false;
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
                    startDate: this.date1,
                    endDate: this.date2,
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
                this.login = false;
                this.newEventTitle = '';
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
        padding-left: 10px;
        padding-right: 26px !important;
        padding-bottom: 25px !important;
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

    .theme-default .cv-header, .theme-default .cv-header-day {
        background-color: rgba(76, 175, 80, 0.1);
    }
</style>
