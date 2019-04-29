<template>
    <p></p>
</template>

<script>
    import firebase from 'firebase'

    export default {
        name: "homelobby",
        data: function () {
            return {
                localKey: '',
                arrayBD: [],
                flag: false,
            }
        },
        components: {},
        methods: {
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
            firebase.database().ref('users/').on('value', snapshots => this.loadUsers(snapshots.val()));

            this.localKey = '';
            if (localStorage.getItem('sesion_activa')) {
                this.localKey = localStorage.getItem("sesion_activa");
                for (let i = 0; i < this.arrayBD.length; i++) {
                    if (this.arrayBD[i].idUniq === this.localKey) {
                        i = this.arrayBD.length - 1;
                        this.flag = true;
                        this.$router.push('Lobby');

                    } else if (this.flag === false) {
                        this.$router.push('/');

                    }
                }
            }
            if (!localStorage.getItem('sesion_activa')) {
                this.$router.push('/');
            }
            this.localKey = '';
            this.flag = false;
        }
    }
</script>

<style scoped>

</style>