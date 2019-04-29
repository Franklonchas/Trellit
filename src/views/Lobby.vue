<template>
    <Navbar></Navbar>
</template>

<script>
    import firebase from 'firebase'
    import Navbar from "../components/navbar";

    export default {
        name: "Lobby",
        data: function () {
            return {
                localKey: '',
                arrayBD: [],
            }
        },
        components: {Navbar,},
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
                        console.log('BD: ' + this.arrayBD[i].idUniq);
                        console.log('LOCAL: ' + this.localKey);
                        console.log('VALOR I: ' + i);
                    } else {
                        console.log(i);
                        //this.$router.push('/');
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>
