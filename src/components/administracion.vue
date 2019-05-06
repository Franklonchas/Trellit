<template>
    <div class="winter-neva-gradient">
        <mdb-row>

            <mdb-col md="6" xl="5" class="mb-4 createProject">
                <br>
                <div class="z-depth-2 white-text card-body">
                    <p class="h4 text-center mb-4">Crear Nuevo Proyecto</p>
                    <div class="grey-text">
                        <mdb-input v-model="nombreProyecto" label="Nombre Proyecto" icon="sitemap" type="text"/>
                        <mdb-input v-model="descripcion" label="Descripcion del proyecto" icon="pencil-alt"
                                   type="textarea"/>
                        <mdb-input v-model="emailBoss" label="Jefe de Proyecto (email)" icon="user-tie" type="email"/>
                        <mdb-input v-model="localPass" label="Contraseña Administrador" icon="lock"
                                   type="text"/>
                    </div>
                    <div class="text-center">
                        <mdb-btn v-on:click="addProject" color="primary">Crear Proyecto</mdb-btn>
                    </div>
                </div>
            </mdb-col>

        </mdb-row>
    </div>
</template>

<script>
    import firebase from 'firebase'

    import {
        mdbInput, mdbBtn, mdbRow,
        mdbCol,
    } from 'mdbvue';

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
                flag1: false
            }
        },
        components: {
            mdbInput,
            mdbBtn,
            mdbRow,
            mdbCol,
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
            loadProjects: function () {
            },
            addProject: function () {
                this.randomKey();
                firebase.database().ref('users/').on('value', snapshots => this.loadUsers(snapshots.val()));

                if (this.nombreProyecto !== '' && this.descripcion !== '' && this.emailBoss !== '' && this.localPass !== '') {
                    for (let i = 0; i < this.arrayBD.length; i++) {
                        if (this.arrayBD[i].password === this.localPass) {
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
        padding-left: 25px;
    }
</style>
