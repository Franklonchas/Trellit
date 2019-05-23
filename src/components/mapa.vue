<template>
    <div class="winter-neva-gradient h-100 w-100">
        <div class="container">
            <h1 style="text-align: center">Mapa total de la web</h1>
            <mdb-btn outline="primary" class="buttonlol" darkWaves>
                <router-link :to="'/Lobby'">Volver</router-link>
            </mdb-btn>
            <br><br>
            <div class="lel">
                <mdb-list-group style="background-color: red">
                    <mdb-list-group-item class="list-group-item list-group-item-warning">Admistración -Solo ADMIN-
                    </mdb-list-group-item>
                    <mdb-list-group-item class="list-group-item list-group-item-info">Calendario</mdb-list-group-item>
                    <mdb-list-group-item class="list-group-item list-group-item-info">Chat</mdb-list-group-item>
                    <mdb-list-group-item class="list-group-item list-group-item-warning">Estadísticas -Solo ADMIN-
                    </mdb-list-group-item>
                    <mdb-list-group-item class="list-group-item list-group-item-info">Home</mdb-list-group-item>
                    <mdb-list-group-item class="list-group-item list-group-item-info">Información</mdb-list-group-item>
                    <mdb-list-group-item class="list-group-item list-group-item-info">Login</mdb-list-group-item>
                    <mdb-list-group-item :active="true">Mapa Web</mdb-list-group-item>
                    <mdb-list-group-item class="list-group-item list-group-item-info">Proyectos</mdb-list-group-item>
                    <mdb-list-group-item class="list-group-item list-group-item-info">Ajustes</mdb-list-group-item>
                </mdb-list-group>
            </div>

        </div>
    </div>
</template>

<script>
    import {mdbListGroup, mdbListGroupItem, mdbBtn} from 'mdbvue';

    export default {
        name: "mapa",
        data: function () {
            return {}
        },
        components: {
            mdbListGroup,
            mdbListGroupItem,
            mdbBtn
        },
    }
</script>

<style scoped>
    .lel {
        max-width: 250px;
    }

    .buttonlol {
        border-radius: 15px;
    }

</style>
