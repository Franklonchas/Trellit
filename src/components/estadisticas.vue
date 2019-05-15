<template>
    <div class="winter-neva-gradient">
        <mdb-container>
            <mdb-bar-chart :data="barChartData" :options="barChartOptions" :width="600" :height="300"></mdb-bar-chart>
        </mdb-container>
    </div>
</template>

<script>
    import firebase from 'firebase'
    import {mdbBarChart, mdbContainer} from 'mdbvue';

    export default {
        name: "estadisticas",
        data: function () {
            return {
                barChartData: {
                    labels: ["Tareas terminadas", "Tareas no terminadas", "Total tareas"],
                    datasets: [{
                        label: 'Nº Tareas',
                        data: [],
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
                    responsive: false,
                    maintainAspectRatio: false,
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
                localNameProject: '',
                arrayProjects: [],
                arrayTasks: [],
                terminadas: 0,
                noTerminadas: 0,
                totalTareas: 0
            };
        },
        components: {
            mdbBarChart,
            mdbContainer
        },
        methods: {
            loadProjects: function (projects) {
                this.arrayProjects = [];
                this.localNameProject = '';

                for (let key in projects) {
                    this.arrayProjects.push({
                        project: projects[key].project,
                        manager: projects[key].manager,
                        idProject: projects[key].idProject,
                        description: projects[key].description,
                    })
                }
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
                this.barChartData.datasets[0].data.push(this.terminadas, this.noTerminadas, this.totalTareas);
            },
        },
        mounted() {
            firebase.database().ref('projects/').on('value', snapshots => this.loadProjects(snapshots.val()));

        }
    }
</script>

<style scoped>

</style>
