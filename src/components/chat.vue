<template>
    <div class="winter-neva-gradient h-100">
        <br>
        <h1 style="text-align: center;">Chat Global</h1>
        <h5 style="text-align: center;">No comparta material sensible o falte al respeto</h5>
        <br>
        <div class="chat-global container scrollauto">
            <div v-for="mensajes in arrayMensajes" v-bind:key="mensajes.fecha">
                <div class="row">
                    <div class="col-sm-12 lel">
                        <div v-if="mensajes.local===true" class="chat-body local-true white p-3 ml-2 z-depth-1">
                            <div class="header">
                                <strong class="primary-font">{{mensajes.autor}}</strong>
                                <small class="pull-right text-muted">
                                    <mdb-icon far icon="clock"/>
                                    {{mensajes.fecha}}
                                </small>
                                <img alt="close" v-if="adminChat" @click="borrarMensaje(mensajes.fecha)"
                                     style="height: 20px; width: 20px"
                                     src="../assets/close.png">
                            </div>
                            <hr class="w-100">
                            <p class="mb-0">
                                {{mensajes.mensaje}}
                            </p>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12">
                        <div v-if="mensajes.local===false" class="chat-body local-false white p-3 ml-2 z-depth-1">
                            <div class="header">
                                <strong class="primary-font">{{mensajes.autor}} </strong>
                                <small class="pull-right text-muted">
                                    <mdb-icon far icon="clock"/>
                                    {{mensajes.fecha}}
                                </small>
                                <img alt="close" v-if="adminChat" @click="borrarMensaje(mensajes.fecha)"
                                     style="height: 20px; width: 20px"
                                     src="../assets/close.png">
                            </div>
                            <hr class="w-100">
                            <p class="mb-0">
                                {{mensajes.mensaje}}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container enviar">
            <mdb-input v-model="localMensaje" type="text" label="Escriba su mensaje..." icon="comment"/>
            <mdb-btn @click="addMessage" color="indigo">Enviar</mdb-btn>
        </div>
        <br>
    </div>
</template>

<script>
    import {mdbInput, mdbBtn, mdbIcon} from 'mdbvue';
    import firebase from 'firebase'
    import JQuery from 'jquery'

    export default {
        name: "chat",
        data: function () {
            return {
                localMensaje: '',
                localAutor: '',
                arrayMensajes: [],
                localUser: '',
                loadMessage: '',
                arrayBD: [],
                adminChat: false
            }
        },
        components: {
            mdbInput,
            mdbBtn,
            mdbIcon
        },
        methods: {
            loadChats: function (mensajes) {
                this.arrayMensajes = [];

                for (let key in mensajes) {
                    this.parseUser2();
                    if (this.loadMessage === mensajes[key].usuario) {
                        this.arrayMensajes.push({
                            mensaje: mensajes[key].mensaje,
                            autor: mensajes[key].autor,
                            fecha: mensajes[key].fecha,
                            usuario: mensajes[key].usuario,
                            clave: key,
                            local: true
                        });
                    }
                    if (this.loadMessage !== mensajes[key].usuario) {
                        this.arrayMensajes.push({
                            mensaje: mensajes[key].mensaje,
                            autor: mensajes[key].autor,
                            fecha: mensajes[key].fecha,
                            usuario: mensajes[key].usuario,
                            clave: key,
                            local: false
                        });
                    }
                }
                let $ = JQuery;
                $(".scrollauto").animate({scrollTop: 9999999}, 1000);
            },
            pasrseUser: function (user) {
                this.localUser = '';
                this.localAutor = [];
                for (let i = 21; i < user.length; i++) {
                    this.localAutor += user[i];
                }
                this.localUser = this.localAutor;
                this.localAutor = this.localAutor.split('@trevenque.es');
                return this.localAutor[0];
            },
            addMessage: function () {
                let today = new Date();
                let user = localStorage.getItem('sesion_activa');
                this.pasrseUser(user);
                if (this.localMensaje !== '') {
                    firebase.database().ref('chat/').push({
                        mensaje: this.localMensaje,
                        autor: this.localAutor[0],
                        fecha: today.toLocaleDateString("es-ES") + " " + today.getHours() + ":" + today.getMinutes()
                            + ":" + today.getSeconds(),
                        usuario: this.localUser
                    });
                }
                if (this.localMensaje === '') {
                    this.$notify({
                        group: 'foo',
                        title: 'Campo mensaje vacio',
                        text: 'Compruebe por favor los datos introducidos.',
                        type: 'error',
                        position: 'top left',
                        duration: 3500,
                        speed: 1500
                    });
                }
                this.localMensaje = '';
                let $ = JQuery;
                $(".scrollauto").animate({scrollTop: 9999999}, 1000);
            },
            parseUser2: function () {
                let user = localStorage.getItem('sesion_activa');
                this.loadMessage = '';
                for (let i = 21; i < user.length; i++) {
                    this.loadMessage += user[i];
                }
                return this.loadMessage;
            },
            loadUsers: function (users) {
                this.arrayBD = [];
                this.adminChat = false;

                for (let key in users) {
                    this.arrayBD.push({
                        user: users[key].user,
                        email: users[key].email,
                        password: users[key].password,
                        rol: users[key].rol,
                        idUniq: users[key].idUniq
                    })
                }
                let local = localStorage.getItem('sesion_activa');

                for (let i = 0; i < this.arrayBD.length; i++) {
                    if (local === this.arrayBD[i].idUniq && this.arrayBD[i].rol === 'admin') {
                        this.adminChat = true;
                    }
                }
            },
            borrarMensaje: function (id) {
                for (let i = 0; this.arrayMensajes.length; i++) {
                    if (this.arrayMensajes[i].fecha === id) {
                        firebase.database().ref('chat/' + this.arrayMensajes[i].clave).remove().then(() => {
                            this.$notify({
                                group: 'foo',
                                title: 'Mensaje eliminado.',
                                text: '',
                                type: 'warning',
                                position: 'top left',
                                duration: 3500,
                                speed: 1500
                            });
                        });
                        i = this.arrayMensajes.length;
                    }
                }
            }
        },
        mounted() {
            firebase.database().ref('chat/').on('value', snapshots => this.loadChats(snapshots.val()));
            firebase.database().ref('users/').on('value', snapshots => this.loadUsers(snapshots.val()));
        }
    }
</script>

<style scoped>
    .chat-global {
        overflow-y: scroll;
        max-height: 750px;
        background-image: url('../assets/backChat.png');
        background-repeat: repeat;
    }

    .enviar {
        background-image: url('../assets/backChat.png');
        background-repeat: repeat;
    }

    .local-true {
        max-width: 350px;
        vertical-align: top;
        float: right;
        background-color: #E1FFC7 !important;
    }

    .lel {
        padding-top: 15px;
        padding-right: 20px;
    }

    .local-false {
        max-width: 350px;
        vertical-align: top;
    }
</style>
