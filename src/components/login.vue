<template>

    <div class="classic-form-page">
        <view-wrapper>
            <mdb-mask class="d-flex gradient justify-content-center align-items-center">
                <mdb-container>
                    <mdb-row>
                        <div class="white-text text-center text-md-left col-md-6 mt-xl-5 mb-5">
                            <h1 class="h1-responsive font-weight-bold">Trellit, La gestión empresarial </h1>
                            <hr class="hr-light"/>
                            <h6 class="mb-4">
                                La gestión empresarial ha cambiado. Bienvenido a Trellit.
                            </h6>
                            <h6 class="mb-4">
                                Trellit es una potente herramienta de organización, gestión y control de proyectos
                                y usuarios, de manera totalmente gratuita. Fácil, intuitivo e increiblemente útil.
                                ¿No estas registrado? ¡A que esperas!
                            </h6>
                            <h6 v-if="this.boolRegister === true"> Si estas registrado entra</h6>
                            <mdb-btn v-if="this.boolRegister === false" v-on:click="changeBool" outline="white"
                                     color="white">Registrate
                            </mdb-btn>
                            <mdb-btn v-if="this.boolRegister === true" v-on:click="changeBool" outline="white"
                                     color="white">Entra
                            </mdb-btn>
                        </div>

                        <mdb-col v-if="this.boolRegister === false" md="6" xl="5" class="mb-4">
                            <form>
                                <mdb-card id="classic-card">
                                    <mdb-card-body class="z-depth-2 white-text">
                                        <h3 class="text-center">
                                            <mdb-icon icon="user"/>
                                            Entra
                                        </h3>
                                        <hr class="hr-light"/>
                                        <mdb-input v-model="logUser" label="Email" labelColor="white" icon="envelope"
                                                   type="email"/>
                                        <mdb-input v-model="logPass" label="Contraseña" labelColor="white" icon="lock"
                                                   type="password"/>
                                        <div class="text-center mt-4 black-text">
                                            <mdb-btn @click="entrar" color="indigo">Entrar</mdb-btn>
                                            <hr class="hr-light"/>
                                            <div class="text-center d-flex justify-content-center white-label">
                                                <a class="p-2 m-2">
                                                    <mdb-icon fab icon="github" class="white-text"/>
                                                </a>
                                                <a class="p-2 m-2">
                                                    <mdb-icon fab icon="linkedin" class="white-text"/>
                                                </a>
                                                <a class="p-2 m-2">
                                                    <mdb-icon fab icon="instagram" class="white-text"/>
                                                </a>
                                            </div>
                                        </div>
                                    </mdb-card-body>
                                </mdb-card>
                            </form>
                        </mdb-col>

                        <mdb-col v-if="this.boolRegister === true" md="6" xl="5" class="mb-4">
                            <form>
                                <mdb-card id="classic-card">
                                    <mdb-card-body class="z-depth-2 white-text">
                                        <h3 class="text-center">
                                            <mdb-icon icon="user-edit"/>
                                            Registrate
                                        </h3>
                                        <hr class="hr-light"/>
                                        <mdb-input v-model="registerUser" label="Nombre" labelColor="white"
                                                   icon="user"/>
                                        <mdb-input v-model="registerEmail" label="Email" labelColor="white"
                                                   icon="envelope" type="email"/>
                                        <mdb-input v-model="registerPassword" label="Contraseña" labelColor="white"
                                                   icon="lock" type="password"/>
                                        <div class="text-center mt-4 black-text">
                                            <mdb-btn @click="registrar" color="indigo">Registrar</mdb-btn>
                                            <hr class="hr-light"/>
                                            <div class="text-center d-flex justify-content-center white-label">
                                                <a class="p-2 m-2">
                                                    <mdb-icon fab icon="github" class="white-text"/>
                                                </a>
                                                <a class="p-2 m-2">
                                                    <mdb-icon fab icon="linkedin" class="white-text"/>
                                                </a>
                                                <a class="p-2 m-2">
                                                    <mdb-icon fab icon="instagram" class="white-text"/>
                                                </a>
                                            </div>
                                        </div>
                                    </mdb-card-body>
                                </mdb-card>
                            </form>
                        </mdb-col>

                    </mdb-row>
                </mdb-container>
            </mdb-mask>
        </view-wrapper>
    </div>

</template>

<script>
    import firebase from 'firebase'
    import {
        mdbContainer,
        mdbRow,
        mdbCol,
        ViewWrapper,
        mdbMask,
        mdbBtn,
        mdbCard,
        mdbCardBody,
        mdbInput,
        mdbIcon,
    } from 'mdbvue';

    export default {
        name: 'login',
        data: function () {
            return {
                boolRegister: false,
                registerEmail: '',
                register: false,
                registerPassword: '',
                registerUser: '',
                arrayBD: [],
                failregister1: false,
                failregister2: false,
                logUser: '',
                logPass: '',
                failLog1: true,
                failLog2: true
            }
        },
        components: {
            mdbContainer,
            mdbRow,
            mdbCol,
            ViewWrapper,
            mdbMask,
            mdbBtn,
            mdbCard,
            mdbCardBody,
            mdbInput,
            mdbIcon,
        },
        methods: {
            changeBool: function () {
                if (this.boolRegister === true) {
                    this.boolRegister = false;
                } else if (this.boolRegister === false) {
                    this.boolRegister = true;
                }
            },
            registrar: function () {
                if (this.registerPassword.length >= 6) {
                    for (let i = 0; i < this.arrayBD.length; i++) {
                        if (this.registerUser === this.arrayBD[i].user) {
                            i = this.arrayBD.length - 1;
                            this.failregister1 = true;
                            this.$notify({
                                group: 'foo',
                                title: '¡Usuario registrado!',
                                text: 'Ese usuario ya ha sido usado con anterioridad, por favor use otro',
                                type: 'error',
                                position: 'top left',
                                duration: 3500,
                                speed: 1500
                            });
                        }
                        if (this.registerEmail === this.arrayBD[i].email) {
                            i = this.arrayBD.length - 1;
                            this.failregister2 = true;
                            this.$notify({
                                group: 'foo',
                                title: '¡Email registrado!',
                                text: 'Ese email ya ha sido usado con anterioridad, por favor use otro',
                                type: 'error',
                                position: 'top left',
                                duration: 3500,
                                speed: 1500
                            });
                        }
                    }
                }
                if (this.failregister1 === false || this.failregister2 === false) {
                    firebase.database().ref('users/' + this.registerUser).set({
                        user: this.registerUser,
                        email: this.registerEmail,
                        password: this.registerPassword,
                        rol: 'user'
                    }).then(() => {
                        this.registerSuccess(),
                            this.register = true
                    });
                }
                this.failregister1 = false;
                this.failregister2 = false;
            },
            loadUsers: function (users) {
                this.arrayBD = [];
                for (let key in users) {
                    this.arrayBD.push({
                        user: users[key].user,
                        email: users[key].email,
                        password: users[key].password,
                        rol: users[key].rol
                    })
                }
            },
            registerSuccess: function () {
                this.$notify({
                    group: 'foo',
                    title: '¡Has sido registrado!',
                    text: 'Bienvenido a Trellit.',
                    type: 'success',
                    position: 'top left',
                    duration: 3500,
                    speed: 1500
                });
            },
            entrar: function () {
                for (let i = 0; i < this.arrayBD.length; i++) {
                    if (this.logUser === this.arrayBD[i].email) {
                        this.failLog1 = false;
                    }
                    if (this.logPass === this.arrayBD[i].password) {
                        this.failLog2 = false;
                    }
                }
                if (this.failLog1 === false && this.failLog2 === false) {
                    //just check notify
                    this.$notify({
                        group: 'foo',
                        title: '¡Coincidencia!',
                        text: 'Bienvenido a Trellit.',
                        type: 'success',
                        position: 'top left',
                        duration: 3500,
                        speed: 1500
                    });
                }
                if (this.failLog1 === true || this.failLog2 === true) {
                    this.$notify({
                        group: 'foo',
                        title: '¡Datos erroneos!',
                        text: 'Los datos introducidos no son correctos, por favor reviselo.',
                        type: 'error',
                        position: 'top left',
                        duration: 3500,
                        speed: 1500
                    });
                }
                this.failLog1 = true;
                this.failLog2 = true;
            }
        },
        mounted() {
            firebase.database().ref('users/').on('value', snapshots => this.loadUsers(snapshots.val()))
        }
    }
</script>

<style scoped>
    .classic-form-page .view {
        background-image: url('https://www.iebschool.com/blog/wp-content/uploads/2014/03/MBA-online.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        height: calc(100vh - 60px);
    }

    .classic-form-page .gradient {
        background: -webkit-linear-gradient(45deg, rgba(0, 0, 0, 0.7), rgba(72, 15, 144, 0.4) 100%);
        background: linear-gradient(45deg, rgba(0, 0, 0, 0.7), rgba(72, 15, 144, 0.4) 100%);
    }

    .classic-form-page .card {
        background-color: rgba(126, 123, 215, 0.2);
    }

    .classic-form-page h6 {
        line-height: 1.7;
    }

    .classic-form-page .navbar {
        transition: background .5s ease-in-out, padding .5s ease-in-out;
    }

    .classic-form-page .navbar .md-form {
        margin: 0;
    }

    @media (max-width: 768px) {
        .classic-form-page .navbar:not(.top-nav-collapse) {
            background: #424f95 !important;
        }
    }

    .classic-form-page label {
        color: #fff !important;
    }
</style>
