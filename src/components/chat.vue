<template>
    <div class="winter-neva-gradient">
        <div>
            <div v-for="mensajes in arrayMensajes" v-bind:key="mensajes.fecha">
                <div>
                    Autor: {{mensajes.autor}}
                    Contenido: {{mensajes.mensaje}}
                    comprobacion: {{mensajes.local}}
                </div>
            </div>
        </div>
        <label>
            <input v-model="localMensaje" type="text">
        </label>
        <button type="button" @click="addMessage">LOCOOO</button>
    </div>
</template>

<script>
    import firebase from 'firebase'

    export default {
        name: "chat",
        data: function () {
            return {
                localMensaje: '',
                localAutor: '',
                arrayMensajes: [],
                localUser: '',
                loadMessage: ''
            }
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
                            local: true
                        });
                    }
                    if (this.loadMessage !== mensajes[key].usuario) {
                        this.arrayMensajes.push({
                            mensaje: mensajes[key].mensaje,
                            autor: mensajes[key].autor,
                            fecha: mensajes[key].fecha,
                            usuario: mensajes[key].usuario,
                            local: false
                        });
                    }
                }
            },
            pasrseUser: function (user) {
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
                firebase.database().ref('chat/').push({
                    mensaje: this.localMensaje,
                    autor: this.localAutor[0],
                    fecha: today.toLocaleDateString("es-ES") + " " + today.getHours() + ":" + today.getMinutes()
                        + ":" + today.getSeconds(),
                    usuario: this.localUser
                });
            },
            parseUser2: function () {
                let user = localStorage.getItem('sesion_activa');
                this.loadMessage = '';
                for (let i = 21; i < user.length; i++) {
                    this.loadMessage += user[i];
                }
                return this.loadMessage;
            }
        },
        mounted() {
            firebase.database().ref('chat/').on('value', snapshots => this.loadChats(snapshots.val()));
        }
    }
</script>

<style scoped>

</style>
