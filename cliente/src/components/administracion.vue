<template>
    <div class="winter-neva-gradient">
        <div class="container">
            <mdb-row>
                <mdb-col md="6" xl="5" class="mb-4 createProject">
                    <br>
                    <div class="z-depth-2 white-text card-body">
                        <p class="h4 text-center mb-4">Crear Nuevo Proyecto</p>
                        <div class="grey-text">
                            <mdb-input v-model="nombreProyecto" label="Nombre Proyecto" icon="sitemap" type="text"/>
                            <mdb-input v-model="descripcion" label="Descripcion del proyecto" icon="pencil-alt"
                                       type="textarea"/>
                            <mdb-input v-model="emailBoss" label="Jefe de Proyecto (email)" icon="user-tie"
                                       type="email"/>
                            <mdb-input v-model="localPass" label="Contraseña Administrador" icon="lock"
                                       type="password"/>
                        </div>
                        <div class="text-center">
                            <mdb-btn v-on:click="addProject" color="indigo">Crear Proyecto</mdb-btn>
                        </div>
                    </div>
                </mdb-col>

                <mdb-col md="6" xl="5" class="mb-4 createProject">
                    <br>
                    <div class="z-depth-2 white-text card-body">
                        <p class="h4 text-center mb-4">Hacer nuevo ADMINISTRADOR</p>
                        <div class="grey-text">
                            <mdb-input v-model="emailAdmin" label="Nuevo Admin (email)" icon="user-tie" type="email"/>
                            <mdb-input v-model="localPass2" label="Contraseña Administrador" icon="lock"
                                       type="password"/>
                        </div>
                        <div class="text-center">
                            <mdb-btn v-on:click="addAdmin" color="indigo">Generar</mdb-btn>
                        </div>
                        <br>
                        <p style="color:dimgrey">Ten en cuenta que un ADMINISTRADOR tiene acceso a todos los apartados
                            de la
                            App. Piensate bien a quien le concedes los permisos.</p>
                    </div>
                </mdb-col>

                <mdb-col md="6" xl="5" class="mb-4" style="padding-left: 35px">
                    <h3 style="text-align: center">Estadisticas de proyectos:</h3>
                    <mdb-list-group class="z-depth-2">
                        <mdb-list-group-item v-for="project in arrayProjects" v-bind:key="project.idProject">
                            <router-link :to="'/Estadistica/' + project.idProject">{{project.project}}
                            </router-link>
                            <mdb-badge color="indigo" pill>{{project.idProject}}</mdb-badge>
                        </mdb-list-group-item>
                    </mdb-list-group>
                </mdb-col>

                <mdb-col md="6" xl="5" class="mb-4" style="padding-left: 35px">
                    <div class="z-depth-2 white-text card-body">
                        <p class="h4 text-center mb-4">Eliminar Usuario</p>
                        <div class="grey-text">
                            <mdb-input v-model="usuarioElminar" label="Email usuario eliminar" icon="user"
                                       type="email"/>
                            <mdb-input v-model="localPass3" label="Contraseña Administrador" icon="lock"
                                       type="password"/>
                            <div class="custom-control custom-radio">
                                <input type="radio" class="custom-control-input" name="radio1" id="defaultUnchecked">
                                <label class="custom-control-label" for="defaultUnchecked">Acepto que este usuario
                                    dejará de tener derecho a tener acceso a la plataforma, perdera sus permisos y
                                    datos asociados a esta.</label>
                            </div>
                        </div>
                        <div class="text-center">
                            <mdb-btn v-on:click="removeUser" color="indigo">Generar</mdb-btn>
                        </div>
                    </div>
                </mdb-col>
            </mdb-row>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase'
    import JQuery from 'jquery'
    import {mdbInput, mdbBtn, mdbRow, mdbCol, mdbListGroup, mdbListGroupItem, mdbBadge} from 'mdbvue';

    export default {
        name: "administracion",
        data: function () {
            return {
                arrayDB: [],
                localKey: '',
                charKey: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
                resultKey: '',
                nombreProyecto: '',
                descripcion: '',
                emailBoss: '',
                localPass: '',
                flag1: false,
                emailAdmin: '',
                localPass2: '',
                localPass3: '',
                flag2: false,
                flag3: false,
                arrayProjects: [],
                usuarioElminar: '',
                flag4: false,
                flag5: false,
                flag6: false,
                localNameUser: ''
            }
        },
        components: {
            mdbInput,
            mdbBtn,
            mdbRow,
            mdbCol,
            mdbListGroup,
            mdbListGroupItem,
            mdbBadge
        },
        methods: {
            loadUsers: function (users) {
                this.localKey = localStorage.getItem('sesion_activa');
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
            loadProjects: function (projects) {
                this.arrayProjects = [];

                for (let key in projects) {
                    this.arrayProjects.push({
                        project: projects[key].project,
                        manager: projects[key].manager,
                        idProject: projects[key].idProject,
                        description: projects[key].description,
                    })
                }
            },
            addProject: function () {
                this.randomKey();
                firebase.database().ref('users/').on('value', snapshots => this.loadUsers(snapshots.val()));

                if (this.nombreProyecto !== '' && this.descripcion !== '' && this.emailBoss !== '' && this.localPass !== '') {
                    for (let i = 0; i < this.arrayBD.length; i++) {
                        if (this.arrayBD[i].rol === 'admin' && this.arrayBD[i].password === this.localPass) {
                            firebase.database().ref('projects/' + this.nombreProyecto).set({
                                project: this.nombreProyecto,
                                description: this.descripcion,
                                manager: this.emailBoss,
                                idProject: this.resultKey,
                            }).then(() => {
                                this.$notify({
                                    group: 'foo',
                                    title: 'Proyecto creado Correctamente',
                                    text: 'Empieza lo bueno.',
                                    type: 'success',
                                    position: 'top left',
                                    duration: 3500,
                                    speed: 1500
                                });
                            });
                            this.nombreProyecto = '';
                            this.descripcion = '';
                            this.emailBoss = '';
                            this.localPass = '';
                            i = this.arrayBD.length;
                            this.flag1 = true;
                            this.resultKey = '';
                        }
                    }
                } else {
                    this.$notify({
                        group: 'foo',
                        title: 'Datos mal introducidos.',
                        text: 'Todos los datos son obligatorios.',
                        type: 'error',
                        position: 'top left',
                        duration: 3500,
                        speed: 1500
                    });
                }
                if (this.flag1 === false) {
                    this.$notify({
                        group: 'foo',
                        title: 'Datos de verificación Erroneos.',
                        text: 'La contraseña es Erronea.',
                        type: 'error',
                        position: 'top left',
                        duration: 3500,
                        speed: 1500
                    });
                }
                this.flag1 = false;
            },
            randomKey: function () {
                let charactersLength = this.charKey.length;
                for (let i = 0; i < 20; i++) {
                    this.resultKey += this.charKey.charAt(Math.floor(Math.random() * charactersLength));
                }
                return this.resultKey;
            },
            addAdmin: function () {
                //Forzamos llamada
                firebase.database().ref('users/').on('value', snapshots => this.loadUsers(snapshots.val()));

                if (this.emailAdmin !== '' && this.localPass2 !== '') {
                    for (let i = 0; i < this.arrayBD.length; i++) {
                        if (this.arrayBD[i].email === this.emailAdmin && this.arrayBD[i].rol !== 'admin') {
                            for (let j = 0; j < this.arrayBD.length; j++) {
                                if (this.arrayBD[j].rol === 'admin' && this.localPass2 === this.arrayBD[j].password) {
                                    firebase.database().ref('users/' + this.arrayBD[i].user).set({
                                        user: this.arrayBD[i].user,
                                        email: this.arrayBD[i].email,
                                        password: this.arrayBD[i].password,
                                        rol: 'admin',
                                        idUniq: this.arrayBD[i].idUniq
                                    }).then(() => {
                                        this.$notify({
                                            group: 'foo',
                                            title: 'El usuario es ahora Administrador.',
                                            text: '',
                                            type: 'success',
                                            position: 'top left',
                                            duration: 3500,
                                            speed: 1500
                                        });
                                    });
                                    i = this.arrayBD.length;
                                    j = this.arrayBD.length;
                                    this.flag3 = true;
                                    this.emailAdmin = '';
                                    this.localPass2 = '';
                                }
                            }
                            this.flag2 = true;
                        }
                    }
                } else {
                    this.$notify({
                        group: 'foo',
                        title: 'Todos los campos deben de estar llenos.',
                        text: 'Por favor compruebe los datos introducidos.',
                        type: 'error',
                        position: 'top left',
                        duration: 3500,
                        speed: 1500
                    });
                    this.flag2 = true;
                    this.flag3 = true;
                }
                if (this.flag2 === false) {
                    this.$notify({
                        group: 'foo',
                        title: 'El email introducido no es valido o ya es Administrador.',
                        text: 'Por favor compruebe los datos introducidos.',
                        type: 'error',
                        position: 'top left',
                        duration: 3500,
                        speed: 1500
                    });
                }
                if (this.flag3 === false) {
                    this.$notify({
                        group: 'foo',
                        title: 'La contraseña introducida no es valida.',
                        text: 'Por favor compruebe los datos introducidos.',
                        type: 'error',
                        position: 'top left',
                        duration: 3500,
                        speed: 1500
                    });
                }
                this.flag2 = false;
                this.flag3 = false;
            },
            removeUser: function () {
                let $ = JQuery;
                for (let i = 0; i < this.arrayBD.length; i++) {
                    if (this.arrayBD[i].email === this.usuarioElminar) {
                        this.flag4 = true;
                        this.localNameUser = this.arrayBD[i].user
                    }
                }
                for (let i = 0; i < this.arrayBD.length; i++) {
                    if (this.arrayBD[i].password === this.localPass3 && this.arrayBD[i].rol === 'admin') {
                        this.flag5 = true;
                    }
                }

                if (this.flag4 && this.flag5 === true) {
                    firebase.database().ref('users/' + this.localNameUser).remove().then(() => {
                        this.$notify({
                            group: 'foo',
                            title: 'Usuario eliminado.',
                            text: '',
                            type: 'warning',
                            position: 'top left',
                            duration: 3500,
                            speed: 1500
                        });
                    });
                }
                if (this.flag4 === false || this.flag5 === false) {
                    this.$notify({
                        group: 'foo',
                        title: 'Datos introducidos erroneos.',
                        text: 'Compruebe los datos introducidos.',
                        type: 'error',
                        position: 'top left',
                        duration: 3500,
                        speed: 1500
                    });
                }
                this.localPass3 = '';
                this.usuarioElminar = '';
                this.flag4 = false;
                this.flag5 = false;
                this.flag6 = false;
                this.localNameUser = '';
            }
        },
        mounted() {
            firebase.database().ref('users/').on('value', snapshots => this.loadUsers(snapshots.val()));
            firebase.database().ref('projects/').on('value', snapshots => this.loadProjects(snapshots.val()));

        }
    }
</script>

<style scoped>
    .createProject {
        padding-left: 35px;
    }

    .d-flex > *, .d-inline-flex > * {
        -webkit-box-flex: 1 !important;
        -ms-flex: 1 1 auto !important;
        flex: 0 1 auto !important;
    }
</style>
