<template>
    <div class="winter-neva-gradient">

        <div class="cabecera_proyectos">
            <mdb-container>
                <mdb-btn rounded color="default" @click="login=true">Añadir tarea</mdb-btn>
                <mdb-modal :show="login" @close="login = false">
                    <mdb-modal-header class="text-center">
                        <mdb-modal-title tag="h4" bold class="w-100">Añadir tarea a {{this.localNameProject}}
                        </mdb-modal-title>
                    </mdb-modal-header>
                    <mdb-modal-body class="mx-3 grey-text">
                        <mdb-input v-model="nameTask" label="Nombre tarea" icon="edit" type="text" class="mb-5"/>
                        <mdb-input v-model="worker" label="Quien la va a realizar (email)" icon="user-alt"
                                   type="email"/>
                        <p>Seleccione una fecha de finalización:</p>
                        <date-picker v-model="date" :config="options"></date-picker>
                        <br>
                        <mdb-input v-model="descripcion" type="textarea" class="my-0">
                            <span class="input-group-text md-addon" slot="prepend">Descripción</span>
                        </mdb-input>
                        <mdb-input v-model="passAdmin" label="Contraseña administrador/Jefe Proyecto" icon="lock"
                                   type="email"/>
                    </mdb-modal-body>
                    <mdb-modal-footer center>
                        <mdb-btn @click="newTask">Asignar tarea</mdb-btn>
                    </mdb-modal-footer>
                </mdb-modal>
            </mdb-container>
            <h1 style="text-align: center">
                Proyecto: {{this.localNameProject}}
            </h1>
        </div>

        <div class="tareas">

        </div>


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
        mdbModalTitle
    } from 'mdbvue';

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
                flag3: false
            }
        },
        components: {
            mdbContainer,
            mdbBtn,
            mdbModal,
            mdbModalHeader,
            mdbModalBody,
            mdbModalFooter,
            mdbInput,
            mdbModalTitle,
            datePicker
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
            }
        },
        mounted() {
            firebase.database().ref('projects/').on('value', snapshots => this.loadProjects(snapshots.val()));
        }
    }
</script>

<style scoped>
    .tareas {
        width: 30em;
        overflow-x: auto;
        white-space: nowrap;
    }
</style>
