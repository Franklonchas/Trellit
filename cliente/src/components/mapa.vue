<template>
    <div class="winter-neva-gradient h-100 w-100">
        <div class="container">
            <h1 style="text-align: center">Mapa total de la web</h1>
            <router-link :to="'/Lobby'">
                <mdb-btn color="indigo">Volver</mdb-btn>
            </router-link>
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
            <br><br><br><br>
            <h3 class="text-center">Información de uso y acceso</h3>
            <p class="black-text">La informacion aquí proporcionada es meramente informativa, para poder usted accecer a
                la web ha de estar registrado, y en algunos casos ha de tener permisos especiales para acceder a ciertas
                areas de la web. Por favor lea atentamente las normas de uso y convivencia de la web.</p>
            <p class="black-text">Cualquier uso indebido de la web, propagacion en ella de SPAM o material sensible o
                sujeto a derechos de autor ajenos a la web puede y sera sancionado por los administradores de esta.
                Por favor considere antes de mandar nada que esta compartiendo por los medios publicos o privados de la
                web.
            </p>
            <p class="black-text">Cualquier violacion de las normas de la web o conducta, actitud o comportamiento que
                considere un administracion como erratica podra ser sancionada por este con una suspension inmediata y
                irrebocable de esta de la web, pero si aun asi si considera que una suspensión a su cuenta ha sido
                erronea por favor pongase en contacto con un administrador o jefe de proyecto.
            </p>
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
