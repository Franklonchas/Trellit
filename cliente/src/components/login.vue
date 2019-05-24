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
                            <mdb-card id="classic-card">
                                <mdb-card-body class="z-depth-2 white-text">
                                    <h3 class="text-center">
                                        <mdb-icon icon="user"/>
                                        Entra
                                    </h3>
                                    <hr class="hr-light"/>
                                    <mdb-input v-model="logUser" style="color: white!important;" label="Email"
                                               labelColor="white" icon="envelope"
                                               type="email"/>
                                    <mdb-input v-model="logPass" style="color: white!important;" label="Contraseña"
                                               labelColor="white" icon="lock"
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
                        </mdb-col>

                        <mdb-col v-if="this.boolRegister === true" md="6" xl="5" class="mb-4">
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
                failLog2: true,
                charKey: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
                resultKey: '',
                id_uniq: '',
                localRol: '',
                localName: '',
                localPass: '',
                localEmail: ''
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
        sockets: {
            connect: function () {
                console.log('socket connected')
            },
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
                let local = this.registerEmail;
                if (this.registerEmail !== '' && this.registerUser !== '' && this.registerPassword.length >= 6) {
                    for (let i = 0; i < this.arrayBD.length; i++) {
                        if (this.registerUser === this.arrayBD[i].user) {
                            i = this.arrayBD.length;
                            this.failregister1 = true;
                            this.$notify({
                                group: 'foo',
                                title: '¡Usuario registrado!',
                                text: 'Ese usuario ya ha sido usado con anterioridad, por favor use otro.',
                                type: 'error',
                                position: 'top left',
                                duration: 3500,
                                speed: 1500
                            });
                            this.registerUser = '';
                            this.registerEmail = '';
                            this.registerPassword = '';
                        }
                        if (this.registerEmail === this.arrayBD[i].email) {
                            i = this.arrayBD.length;
                            this.failregister2 = true;
                            this.$notify({
                                group: 'foo',
                                title: '¡Email registrado!',
                                text: 'Ese email ya ha sido usado con anterioridad, por favor use otro.',
                                type: 'error',
                                position: 'top left',
                                duration: 3500,
                                speed: 1500
                            });
                            this.registerUser = '';
                            this.registerEmail = '';
                            this.registerPassword = '';
                        }
                    }
                } else {
                    this.$notify({
                        group: 'foo',
                        title: 'Compruebe los datos',
                        text: 'Los datos introducidos son erroneos, compruebe el contenido. La contraseña ha de tener' +
                            ' al menos 6 caracteres',
                        type: 'error',
                        position: 'top left',
                        duration: 3500,
                        speed: 1500
                    });
                    this.failregister1 = true;
                    this.failregister2 = true;
                    this.registerUser = '';
                    this.registerEmail = '';
                    this.registerPassword = '';
                }
                if (this.failregister1 === false && this.failregister2 === false) {
                    firebase.database().ref('users/' + this.registerUser).set({
                        user: this.registerUser,
                        email: this.registerEmail,
                        password: this.registerPassword,
                        rol: 'user',
                        idUniq: ''
                    }).then(() => {
                        this.$notify({
                            group: 'foo',
                            title: '¡Has sido registrado!',
                            text: 'Bienvenido a Trellit.',
                            type: 'success',
                            position: 'top left',
                            duration: 3500,
                            speed: 1500
                        });
                        this.$socket.emit('sentConfirmation',JSON.stringify(local));
                    });
                    this.boolRegister = false;
                    this.registerUser = '';
                    this.registerEmail = '';
                    this.registerPassword = '';
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
                        rol: users[key].rol,
                        idUniq: users[key].idUniq
                    })
                }
            },
            entrar: function () {
                for (let i = 0; i < this.arrayBD.length; i++) {
                    if (this.logUser === this.arrayBD[i].email && this.logPass === this.arrayBD[i].password) {
                        this.failLog1 = false;
                        this.failLog2 = false;
                        i = this.arrayBD.length;
                    }
                }
                if (this.failLog1 === false && this.failLog2 === false) {
                    //limpiamos variables
                    this.localRol = '';
                    this.localName = '';
                    this.localEmail = '';
                    this.localPass = '';
                    this.resultKey = '';
                    this.id_uniq = '';

                    for (let i = 0; i < this.arrayBD.length; i++) {
                        if (this.logUser === this.arrayBD[i].email && this.logPass === this.arrayBD[i].password) {
                            //generamos una key unica para identificar la sesion y el usuario
                            this.randomKey();
                            this.id_uniq = this.resultKey + '_' + this.logUser;
                            localStorage.setItem('sesion_activa', this.id_uniq);

                            this.localRol = this.arrayBD[i].rol;
                            this.localName = this.arrayBD[i].user;
                            this.localEmail = this.arrayBD[i].email;
                            this.localPass = this.arrayBD[i].password;
                            //lo guardamos en la base de datos
                            firebase.database().ref('users/' + this.localName).set({
                                user: this.localName,
                                email: this.localEmail,
                                password: this.localPass,
                                rol: this.localRol,
                                idUniq: this.id_uniq
                            }).then(() => {
                                this.$notify({
                                    group: 'foo',
                                    title: 'Datos de inicio correctos.',
                                    text: 'Bienvenido a Trellit.',
                                    type: 'success',
                                    position: 'top left',
                                    duration: 3500,
                                    speed: 1500
                                });
                            });
                            this.$router.push('Lobby');
                        }
                    }
                    //alert(localStorage.getItem('sesion_activa'));
                }
                if (this.failLog1 === true && this.failLog2 === true) {
                    this.$notify({
                        group: 'foo',
                        title: '¡Datos erroneos!',
                        text: 'Los datos introducidos no son correctos, por favor reviselo.',
                        type: 'error',
                        position: 'top left',
                        duration: 3500,
                        speed: 1500
                    });
                    this.logUser = '';
                    this.logPass = '';
                }
                this.failLog1 = true;
                this.failLog2 = true;
                this.logUser = '';
                this.logPass = '';
            },

            randomKey: function () {
                let charactersLength = this.charKey.length;
                for (let i = 0; i < 20; i++) {
                    this.resultKey += this.charKey.charAt(Math.floor(Math.random() * charactersLength));
                }
                return this.resultKey;
            },

            removeLocalKey: function () {
                //Hacemos esto, ya que en caso de refresco malintencionado no se pueda obtener la key generada en local
                localStorage.removeItem('sesion_activa');
            }
        },
        mounted() {
            firebase.database().ref('users/').on('value', snapshots => this.loadUsers(snapshots.val()));
        },
        created() {
            window.addEventListener('beforeunload', this.removeLocalKey);
        },
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
