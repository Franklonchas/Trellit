<template>
    <div class="winter-neva-gradient">

        <div class="cabecera_proyectos">
            <mdb-container style="text-align: center;">
                <mdb-modal :show="login" @close="login = false">
                    <mdb-modal-header class="text-center">
                        <mdb-modal-title tag="h4" bold class="w-100">Añadir tarea a {{this.localNameProject}}
                        </mdb-modal-title>
                    </mdb-modal-header>
                    <mdb-modal-body class="mx-3 grey-text">
                        <mdb-input style="text-align: left;" v-model="nameTask" label="Nombre tarea" icon="edit"
                                   type="text" class="mb-5"/>
                        <mdb-input style="text-align: left;" v-model="worker" label="Quien la va a realizar (email)"
                                   icon="user-alt"
                                   type="email"/>
                        <p>Seleccione una fecha de finalización:</p>
                        <date-picker v-model="date" :config="options"></date-picker>
                        <br>
                        <mdb-input style="text-align: left;" v-model="descripcion" type="textarea" class="my-0">
                            <span class="input-group-text md-addon" slot="prepend">Descripción</span>
                        </mdb-input>
                        <mdb-input style="text-align: left;" v-model="passAdmin"
                                   label="Contraseña administrador/Jefe Proyecto" icon="lock"
                                   type="password"/>
                    </mdb-modal-body>
                    <mdb-modal-footer center>
                        <mdb-btn @click="newTask">Asignar tarea</mdb-btn>
                    </mdb-modal-footer>
                </mdb-modal>
                <h1 style="text-align: center">
                    Proyecto: {{this.localNameProject}}
                </h1>
                <mdb-btn rounded color="indigo" @click="login=true">Añadir tarea</mdb-btn>
                <div class="container">
                    <mdb-alert color="info">
                        Jefe de Proyecto: {{this.localManager}}
                    </mdb-alert>
                    <mdb-alert color="info">
                        Descripcion del proyecto: {{this.localDescription}}
                    </mdb-alert>

                </div>
            </mdb-container>
        </div>

        <div class="tareas deep-blue-gradient">
            <br>
            <mdb-row>
                <mdb-col v-for="task in arrayTasks" v-bind:key="task.nombreTarea" sm="3" style="padding-left: 30px;">
                    <mdb-card wide>
                        <mdb-view hover cascade>
                            <a href="#">
                                <mdb-card-image
                                        src="https://i2.wp.com/www.silocreativo.com/wp-content/uploads/2017/12/visual-code-portada.png?fit=666%2C370&quality=100&strip=all&ssl=1"
                                        alt="Card image cap"></mdb-card-image>
                                <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
                            </a>
                        </mdb-view>
                        <mdb-card-body class="text-center" cascade>
                            <mdb-card-title><img v-if="task.terminado===false"
                                                 @click="changeState(task.nombreTarea, task.terminado)"
                                                 src="../assets/noChecked.png">
                                <img v-if="task.terminado===true" @click="changeState(task.nombreTarea, task.terminado)"
                                     src="../assets/checked.png">
                                <strong>{{task.nombreTarea}}</strong></mdb-card-title>
                            <h5 class="blue-text"><strong>Programador: {{task.trabajador}}</strong></h5>
                            <mdb-card-text>Descripcion: {{task.descripcionTarea}}</mdb-card-text>
                            <mdb-card-text>Fecha de entrega: {{task.fecha}}</mdb-card-text>
                        </mdb-card-body>
                    </mdb-card>
                    <br>
                </mdb-col>
            </mdb-row>
        </div>
        <chatroom></chatroom>
    </div>
</template>

<script>

    import datePicker from 'vue-bootstrap-datetimepicker';
    import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';
    import firebase from 'firebase'
    import {
        mdbContainer,
        mdbBtn,
        mdbModal,
        mdbModalHeader,
        mdbModalBody,
        mdbModalFooter,
        mdbInput,
        mdbModalTitle,
        mdbCard,
        mdbCardImage,
        mdbCardBody,
        mdbCardTitle,
        mdbCardText,
        mdbView,
        mdbMask,
        mdbCol,
        mdbRow,
        mdbAlert
    } from 'mdbvue';
    import Chatroom from "./chatroom";

    export default {
        name: "proyectos",
        data: function () {
            return {
                date: new Date(),
                arrayProjects: [],
                localNameProject: '',
                login: false,
                options: {
                    format: 'DD/MM/YYYY',
                    useCurrent: false,
                },
                nameTask: '',
                worker: '',
                descripcion: '',
                passAdmin: '',
                arrayBD: [],
                localKey: '',
                flag1: false,
                flag2: false,
                flag3: false,
                arrayTasks: [],
                customTask: [],
                customIdTask: '',
                localManager: '',
                localDescription: ''
            }
        },
        components: {
            Chatroom,
            mdbContainer,
            mdbBtn,
            mdbModal,
            mdbModalHeader,
            mdbModalBody,
            mdbModalFooter,
            mdbInput,
            mdbModalTitle,
            datePicker,
            mdbCard,
            mdbCardImage,
            mdbCardBody,
            mdbCardTitle,
            mdbCardText,
            mdbView,
            mdbMask,
            mdbCol,
            mdbRow,
            mdbAlert
        },
        methods: {
            parseEmail: function (email) {
                let lel = email.split(".");
                this.worker = lel[0] + '.' + lel[1];
            },
            newTask: function () {
                firebase.database().ref('users/').on('value', snapshots => this.loadUsers(snapshots.val()));

                if (this.nameTask !== '' && this.worker !== '' && this.descripcion !== '' && this.passAdmin !== '') {
                    this.flag1 = true;
                    for (let i = 0; i < this.arrayBD.length; i++) {
                        if (this.arrayBD[i].email === this.worker) {
                            i = this.arrayBD.length;
                            this.flag2 = true;
                            this.parseEmail(this.worker);
                            this.localKey = localStorage.getItem('sesion_activa');
                            for (let j = 0; j < this.arrayBD.length; j++) {
                                if (this.arrayBD[j].idUniq === this.localKey && this.arrayBD[j].rol === 'admin'
                                    && this.arrayBD[j].password === this.passAdmin) {
                                    this.flag3 = true;
                                    j = this.arrayBD.length;
                                    for (let k = 0; k < this.arrayProjects.length; k++) {
                                        if (this.arrayProjects[k].idProject === this.$route.params.id) {
                                            firebase.database().ref('projects/' + this.localNameProject + '/tareas/').push({
                                                nombreTarea: this.nameTask,
                                                trabajador: this.worker,
                                                fecha: this.date,
                                                descripcionTarea: this.descripcion,
                                                terminado: false
                                            }).then(() => {
                                                this.$notify({
                                                    group: 'foo',
                                                    title: 'Tarea añadida correctamente al proyecto',
                                                    text: 'Desarrollo en curso.',
                                                    type: 'success',
                                                    position: 'top left',
                                                    duration: 3500,
                                                    speed: 1500
                                                });
                                            });
                                            this.$socket.emit('sentNombreTarea', JSON.stringify(this.nameTask));
                                            this.$socket.emit('sentDescripcionTarea', JSON.stringify(this.descripcion));
                                            this.$socket.emit('sentProyecto', JSON.stringify(this.localNameProject));
                                            this.$socket.emit('sentNewTask', JSON.stringify(this.worker));
                                            // restablecemos campos
                                            k = this.arrayProjects.length;
                                            this.nameTask = '';
                                            this.worker = '';
                                            this.descripcion = '';
                                            this.passAdmin = '';
                                            this.login = false;
                                            this.flag1 = true;
                                            this.flag2 = true;
                                            this.flag3 = true;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if (this.flag1 === false) {
                    this.$notify({
                        group: 'foo',
                        title: 'Comprueba que todos los campos esten rellenados',
                        text: 'Todos los campos deben estar rellenados',
                        type: 'error',
                        position: 'top left',
                        duration: 3500,
                        speed: 1500
                    });
                }
                if (this.flag2 === false) {
                    this.$notify({
                        group: 'foo',
                        title: 'El email introducido no esta registrado en Trellit.',
                        text: 'Revise los datos por favor.',
                        type: 'error',
                        position: 'top left',
                        duration: 3500,
                        speed: 1500
                    })
                }
                if (this.flag3 === false) {
                    this.$notify({
                        group: 'foo',
                        title: 'La contraseña no es correcta.',
                        text: 'Revise los datos por favor.',
                        type: 'error',
                        position: 'top left',
                        duration: 3500,
                        speed: 1500
                    })
                }
                this.flag1 = false;
                this.flag2 = false;
                this.flag3 = false;
            },
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
                        this.localManager = this.arrayProjects[i].manager;
                        this.localDescription = this.arrayProjects[i].description;
                    }
                }
            },
            loadUsers: function (users) {
                this.arrayBD = [];

                for (let key in users) {
                    this.arrayBD.push({
                        user: users[key].user,
                        email: users[key].email,
                        password: users[key].password,
                        rol: users[key].rol,
                        idUniq: users[key].idUniq
                    })
                }
            },
            changeState: function (nombreTarea, estado) {
                this.loadCustomTask(nombreTarea);
                if (estado === false) {
                    for (let i = 0; i < this.arrayTasks.length; i++) {
                        if (this.arrayTasks[i].nombreTarea === nombreTarea) {
                            firebase.database().ref('projects/' + this.localNameProject + '/tareas/' +
                                this.customIdTask).set({
                                nombreTarea: this.arrayTasks[i].nombreTarea,
                                trabajador: this.arrayTasks[i].trabajador,
                                fecha: this.arrayTasks[i].fecha,
                                descripcionTarea: this.arrayTasks[i].descripcionTarea,
                                terminado: true
                            }).then(() => {
                                this.$notify({
                                    group: 'foo',
                                    title: 'Tarea finalizada!',
                                    text: 'El proyecto va avanzando...',
                                    type: 'success',
                                    position: 'top left',
                                    duration: 3500,
                                    speed: 1500
                                });
                            });
                        }
                    }
                }
                if (estado === true) {
                    for (let i = 0; i < this.arrayTasks.length; i++) {
                        if (this.arrayTasks[i].nombreTarea === nombreTarea) {
                            firebase.database().ref('projects/' + this.localNameProject + '/tareas/' +
                                this.customIdTask).set({
                                nombreTarea: this.arrayTasks[i].nombreTarea,
                                trabajador: this.arrayTasks[i].trabajador,
                                fecha: this.arrayTasks[i].fecha,
                                descripcionTarea: this.arrayTasks[i].descripcionTarea,
                                terminado: false
                            }).then(() => {
                                this.$notify({
                                    group: 'foo',
                                    title: 'Tarea NO finalizada!',
                                    text: 'La tarea ha sido marcada como NO finalizada',
                                    type: 'info',
                                    position: 'top left',
                                    duration: 3500,
                                    speed: 1500
                                });
                            });
                        }
                    }
                }
            },
            loadCustomTask: function (nombreTareaa) {
                this.customIdTask = '';
                for (let i = 0; i < this.customTask.length; i++) {
                    if (this.customTask[i].nombreTarea === nombreTareaa) {
                        this.customIdTask = this.customTask[i].key;
                    }
                }
            },
            loadTasks: function (tasks) {
                this.arrayTasks = [];
                this.customTask = [];

                for (let key in tasks) {
                    this.arrayTasks.push({
                        nombreTarea: tasks[key].nombreTarea,
                        trabajador: tasks[key].trabajador,
                        fecha: tasks[key].fecha,
                        descripcionTarea: tasks[key].descripcionTarea,
                        terminado: tasks[key].terminado
                    });
                    this.customTask.push({
                        key,
                        nombreTarea: tasks[key].nombreTarea
                    });
                }
            },
        },
        mounted() {
            firebase.database().ref('projects/').on('value', snapshots => this.loadProjects(snapshots.val()));
            firebase.database().ref('projects/' + this.localNameProject + '/tareas/').on('value', snapshots =>
                this.loadTasks(snapshots.val()));
        }
    }
</script>

<style scoped>
    .tareas {
        width: 100%;
        overflow-x: auto;
    }
</style>
