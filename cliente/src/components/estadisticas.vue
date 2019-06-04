<template>
    <div class="winter-neva-gradient" style="width:100%; height:100%;">
        <mdb-container>
            <div class="col-sm-12">
                <h1>Gráfica Tareas de: {{this.localNameProject}}</h1>
                <mdb-bar-chart :position="relative" :data="barChartData" :options="barChartOptions" :width="600"
                               :height="300"></mdb-bar-chart>
            </div>
            <div class="col-sm-12">
                <h1>Gráficas Globales de Trellit</h1>
                <mdb-radar-chart :position="relative" :data="radarChartData" :options="radarChartOptions" :width="600"
                                 :height="300"></mdb-radar-chart>
            </div>
            <div class="col-sm-12">
                <h1>Gráfica mensajes en {{this.localNameProject}}</h1>
                <mdb-horizontal-bar-chart :position="relative" :data="horizontalBarChartData" :options="horizontalBarChartOptions"
                                          :width="600" :height="300"></mdb-horizontal-bar-chart>
            </div>
        </mdb-container>
    </div>
</template>

<script>
    import firebase from 'firebase'
    import {mdbBarChart, mdbContainer, mdbRadarChart, mdbHorizontalBarChart} from 'mdbvue';

    export default {
        name: "estadisticas",
        data: function () {
            return {
                barChartData: {
                    labels: ["Tareas no terminadas", "Tareas terminadas", "Total tareas"],
                    datasets: [{
                        label: 'Nº Tareas',
                        data: [0, 0, 0],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                        ],
                        borderWidth: 1,
                    }]
                },
                barChartOptions: {
                    responsive: true,
                    maintainAspectRatio: true,
                    scales: {
                        xAxes: [{
                            barPercentage: 1,
                            gridLines: {
                                display: false,
                                color: "rgba(0, 0, 0, 0.1)"
                            }
                        }],
                        yAxes: [{
                            gridLines: {
                                display: true,
                                color: "rgba(0, 0, 0, 0.1)"
                            }
                        }]
                    }
                },
                contUsers: 0,
                contAdmin: 0,
                radarChartData: {
                    labels: ["Proyectos", "Proyectos Terminados", "Usuarios", "Administradores", "Eventos Programados"],
                    datasets: [
                        {
                            label: "Proyectos",
                            backgroundColor: "rgba(255, 99, 132, 0.1)",
                            borderColor: "rgba(255, 99, 132, 1)",
                            borderWidth: 0.7,
                            data: [0, 0, 0, 0, 0]
                        },
                        {
                            label: "Proyectos Terminados",
                            backgroundColor: "rgba(54, 162, 235, 0.2)",
                            borderColor: "rgba(54, 162, 235, 1)",
                            borderWidth: 0.7,
                            data: [0, 0, 0, 0, 0]
                        },
                        {
                            label: "Usuarios",
                            backgroundColor: "rgba(153, 102, 255, 0.2)",
                            borderColor: "rgba(153, 102, 255, 1)",
                            borderWidth: 0.7,
                            data: [0, 0, 0, 0, 0]
                        },
                        {
                            label: "Administradores",
                            backgroundColor: "rgba(255, 159, 64, 0.2)",
                            borderColor: "rgba(255, 159, 64, 1)",
                            borderWidth: 0.7,
                            data: [0, 0, 0, 0, 0]
                        },
                        {
                            label: "Eventos",
                            backgroundColor: "rgba(255, 206, 86, 0.2)",
                            borderColor: "rgba(255, 206, 86, 1)",
                            borderWidth: 0.7,
                            data: [0, 0, 0, 0, 0]
                        },
                    ]
                },
                radarChartOptions: {
                    responsive: true,
                    maintainAspectRatio: true
                },
                horizontalBarChartData: {
                    labels: [''],
                    datasets: [{
                        label: 'Mensajes en el proyecto',
                        data: [],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1,
                    }]
                },
                horizontalBarChartOptions: {
                    responsive: true,
                    maintainAspectRatio: true,
                    scales: {
                        xAxes: [{
                            barPercentage: 1,
                            gridLines: {
                                display: true,
                                color: "rgba(0, 0, 0, 0.1)",
                            }
                        }],
                        yAxes: [{
                            gridLines: {
                                display: true,
                                color: "rgba(0, 0, 0, 0.1)",
                            }
                        }],
                    }
                },
                localNameProject: '',
                arrayProjects: [],
                arrayTasks: [],
                terminadas: 0,
                noTerminadas: 0,
                totalTareas: 0,
                arrayUsers: [],
                arrayCalendar: [],
                contCal: 0,
                contProjects: 0,
                arrayChatRoom: [],
                contChatRoom: 0,
                contMessage: 0
            };
        },
        components: {
            mdbBarChart,
            mdbContainer,
            mdbRadarChart,
            mdbHorizontalBarChart
        },
        methods: {
            loadProjects: function (projects) {
                this.arrayProjects = [];
                this.localNameProject = '';
                this.contProjects = 0;

                for (let key in projects) {
                    this.arrayProjects.push({
                        project: projects[key].project,
                        manager: projects[key].manager,
                        idProject: projects[key].idProject,
                        description: projects[key].description,
                    });
                    this.contProjects++;
                }
                this.radarChartData.datasets[0].data[0] = this.contProjects;

                for (let i = 0; i < this.arrayProjects.length; i++) {
                    if (this.arrayProjects[i].idProject === this.$route.params.id) {
                        this.localNameProject = this.arrayProjects[i].project;
                    }
                }
                firebase.database().ref('projects/' + this.localNameProject + '/tareas/').on('value', snapshots =>
                    this.loadTasks(snapshots.val()));
            },
            loadTasks: function (tasks) {
                this.arrayTasks = [];

                for (let key in tasks) {
                    this.arrayTasks.push({
                        nombreTarea: tasks[key].nombreTarea,
                        trabajador: tasks[key].trabajador,
                        fecha: tasks[key].fecha,
                        descripcionTarea: tasks[key].descripcionTarea,
                        terminado: tasks[key].terminado
                    });
                    if (tasks[key].terminado === true) {
                        this.terminadas += 1;
                    }
                    if (tasks[key].terminado === false) {
                        this.noTerminadas += 1;
                    }
                }
                this.totalTareas = this.arrayTasks.length;
                this.barChartData.datasets[0].data = [];
                this.barChartData.datasets[0].data.push(this.noTerminadas, this.terminadas, this.totalTareas);
            },
            loadUsers: function (users) {
                this.arrayUsers = [];
                this.contUsers = 0;
                this.contAdmin = 0;

                for (let key in users) {
                    this.arrayUsers.push({
                        user: users[key].user,
                        email: users[key].email,
                        password: users[key].password,
                        rol: users[key].rol,
                        idUniq: users[key].idUniq
                    });
                    this.contUsers++;
                    if (users[key].rol === 'admin') {
                        this.contAdmin++;
                    }
                }
                this.radarChartData.datasets[2].data[2] = this.contUsers;
                this.radarChartData.datasets[2].data[3] = this.contAdmin;
                this.radarChartData.datasets[3].data[3] = this.contAdmin;
            },
            loadCalendar: function (cal) {
                this.arrayCalendar = [];
                this.contCal = 0;

                for (let key in cal) {
                    this.arrayCalendar.push({
                        classes: cal[key].classes,
                        endDate: cal[key].endDate,
                        id: cal[key].id,
                        startDate: cal[key].startDate,
                        title: cal[key].title
                    });
                    this.contCal++;
                }
                this.radarChartData.datasets[4].data[4] = this.contCal;
            },
            loadChatRoom: function (chat) {
                this.arrayChatRoom = [];
                this.contChatRoom = 0;

                for (let key in chat) {
                    this.arrayChatRoom.push({
                        author: chat[key].author,
                        text: chat[key].text,
                    });
                    this.contChatRoom++;
                }

                for (let i = 0; i < this.arrayChatRoom.length; i++) {
                    if (this.horizontalBarChartData.labels[i] !== this.arrayChatRoom[i].author) {
                        this.horizontalBarChartData.labels[i] = this.arrayChatRoom[i].author;
                    }
                }
                this.horizontalBarChartData.labels = this.horizontalBarChartData.labels.filter(function (item, index, array) {
                    return array.indexOf(item) === index;
                });

                for (let j = 0; j < this.horizontalBarChartData.labels.length; j++) {
                    this.calcularMensajes(this.horizontalBarChartData.labels[j]);
                    this.horizontalBarChartData.datasets[0].data[j] = this.contMessage;
                }
            },
            calcularMensajes: function (usuario) {
                this.contMessage = 0;
                for (let i = 0; i < this.arrayChatRoom.length; i++) {
                    if (this.arrayChatRoom[i].author === usuario) {
                        this.contMessage++;
                    }
                }
                return this.contMessage;
            }
        },
        mounted() {
            //firebase.database().ref('projects/').on('value', snapshots => this.loadProjects(snapshots.val()));
        },
        created() {
            firebase.database().ref('projects/').on('value', snapshots => this.loadProjects(snapshots.val()));
            firebase.database().ref('users/').on('value', snapshots => this.loadUsers(snapshots.val()));
            firebase.database().ref('calendar/').on('value', snapshots => this.loadCalendar(snapshots.val()));
            firebase.database().ref('chatroom/' + this.$route.params.id).on('value', snapshots => this.loadChatRoom(snapshots.val()));
        }
    }
</script>

<style scoped>

</style>
