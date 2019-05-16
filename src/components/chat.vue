<template>
    <div class="winter-neva-gradient">
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
                localUser: '',
                arrayMensajes: []
            }
        },
        methods: {
            loadChats: function (mensajes) {
                this.arrayMensajes = [];

                for (let key in mensajes) {
                    this.arrayMensajes.push({
                        mensaje: mensajes[key].mensaje,
                        autor: mensajes[key].autor,
                        fecha: mensajes[key].fecha,
                    })
                }
            },
            pasrseUser: function (user) {
                for (let i = 21; i < user.length; i++) {
                    this.localUser += user[i];
                }
                this.localUser = this.localUser.split('@trevenque.es');
                return this.localUser[0];
            },
            addMessage: function () {
                let today = new Date();
                let user = localStorage.getItem('sesion_activa');
                this.pasrseUser(user);
                firebase.database().ref('chat/').push({
                    mensaje: this.localMensaje,
                    autor: this.localUser[0],
                    fecha: today.toLocaleDateString("es-ES") + " " + today.getHours() + ":" + today.getMinutes()
                        + ":" + today.getSeconds(),
                });
            }
        },
        mounted() {
            firebase.database().ref('chat/').on('value', snapshots => this.loadChats(snapshots.val()));
        }
    }
</script>

<style scoped>

</style>
