<template>

    <div class="winter-neva-gradient">
        <mdb-row>

            <mdb-col md="6" xl="5" class="mb-4">
                <div class="container changePass">
                    <p class="h4 text-center mb-4">Cambia tu contraseña</p>
                    <div class="grey-text">
                        <mdb-input v-model="antiguaPass" label="Antigua Contraseña" icon="lock" type="text"/>
                        <mdb-input v-model="nuevaPass" label="Nueva Contraseña" icon="lock" type="email"/>
                        <mdb-input v-model="nuevaPass2" label="Repetir Nueva Contraseña" icon="exclamation-triangle"
                                   type="text"/>
                    </div>
                    <div class="text-center">
                        <mdb-btn v-on:click="changePassword" color="primary">Cambiar Contraseña</mdb-btn>
                    </div>
                </div>
            </mdb-col>

            <mdb-col md="6" xl="5" class="mb-4">
                <div class="container changePass">
                    <p class="h4 text-center mb-4">Tu información Personal</p>
                    <p>Nombre: {{nombre}}</p>
                    <p>Email: {{email}}</p>
                    <p>Contraseña: {{pass}}</p>
                    <p>Rol: {{localRol}}</p>
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
        name: "settings",
        data: function () {
            return {
                arrayBD: [],
                localKey: '',
                nombre: '',
                email: '',
                pass: '',
                antiguaPass: '',
                nuevaPass: '',
                nuevaPass2: '',
                localName: '',
                localEmail: '',
                localRol: '',
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
                for (let i = 0; i < this.arrayBD.length; i++) {
                    if (this.localKey === this.arrayBD[i].idUniq) {
                        this.nombre = this.arrayBD[i].user;
                        this.email = this.arrayBD[i].email;
                        this.pass = this.arrayBD[i].password;
                        this.localRol = this.arrayBD[i].rol;
                        i = this.arrayBD.length;
                    }
                }
            },
            changePassword: function () {
                this.localKey = localStorage.getItem('sesion_activa');
                //Fuerzo la llamada
                firebase.database().ref('users/').on('value', snapshots => this.loadUsers(snapshots.val()));

                for (let i = 0; i < this.arrayBD.length; i++) {
                    if (this.localKey === this.arrayBD[i].idUniq) {
                        if (this.antiguaPass === this.arrayBD[i].password && this.nuevaPass === this.nuevaPass2) {
                            this.localName = this.arrayBD[i].user;
                            this.localEmail = this.arrayBD[i].email;
                            this.localRol = this.arrayBD[i].rol;
                            firebase.database().ref('users/' + this.arrayBD[i].user).set({
                                user: this.localName,
                                email: this.localEmail,
                                password: this.nuevaPass2,
                                rol: this.localRol,
                                idUniq: this.localKey
                            }).then(() => {
                                this.$notify({
                                    group: 'foo',
                                    title: 'Contraseña modificada correctamente.',
                                    text: 'No se olvide ni comparta sus credenciales.',
                                    type: 'success',
                                    position: 'top left',
                                    duration: 3500,
                                    speed: 1500
                                });
                            });
                            i = this.arrayBD.length;
                        } else {
                            this.$notify({
                                group: 'foo',
                                title: 'Datos introducidos erroneos.',
                                text: 'Por favor compruebe los datos introducidos.',
                                type: 'error',
                                position: 'top left',
                                duration: 3500,
                                speed: 1500
                            });
                        }
                        this.antiguaPass = '';
                        this.nuevaPass = '';
                        this.nuevaPass2 = '';
                    }
                }
            }
        },
        mounted() {
            firebase.database().ref('users/').on('value', snapshots => this.loadUsers(snapshots.val()));
        }
    }
</script>

<style scoped>
    .changePass {
        width: 400px;
    }
</style>
