<template>
    <div class="winter-neva-gradient">
        <div class="container">
            <router-link :to="'/Lobby'">
                <mdb-btn color="indigo">Volver</mdb-btn>
            </router-link>
            <div id="myCarousel" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner" role="listbox">
                    <div class="item active">
                        <img src="../assets/banner_info.jpg"
                             alt="Image">
                    </div>
                </div>
            </div>

            <div class="container text-center">
                <h1>Lee más acerca de nosotros</h1>
                <br>
                <div class="row">
                    <div class="col-sm-4">
                        <img src="http://www.rrhhdigital.com/userfiles/perfiles-rrhh-peoplematters.jpg"
                             class="responsive" style="width:100%"
                             alt="Image">
                        <p>¿Quienes somos?</p>
                        <footer class="blockquote-footer mb-3">Somos, o más bien soy una persona que ha desarrollado
                            este proyecto de manera independiente,
                            intentando llevar mi idea al usuario de manera intuitiva y facil. <cite
                                    title="Source Title">Trellit</cite></footer>
                    </div>
                    <div class="col-sm-4">
                        <img src="https://www.bima.co.uk/-/media/BC2B66DCD4CF49208BE80172D7A301DE.ashx?h=200"
                             class="responsive" alt="Image">
                        <p>Proyecto</p>
                        <footer class="blockquote-footer mb-3">Ese proyecto ha sido desarrollado por un estudiande de
                            Desarrollo de Aplicaciones Web, con la
                            idea de unificar y facilitar la planificacion de tareas, eventos y comunicaciones entre
                            equipos
                            de desarrollo. Trellit ira mejorando, se desarrollará conforme a las necesidades de los
                            usuarios. <cite
                                    title="Source Title">Trellit</cite></footer>
                    </div>
                    <div class="col-sm-4">
                        <img src="https://images.passle.net/imKYokQVkMyIwI9RzM3_R0e0NAs=/fit-in/640x640/Passle/5764010eb00e7e0bd45a3886/MediaLibrary/Images/5b6846b92a1ea20af817db60/2019-03-07-10-18-56-823-5c80f010abdfe80848852ef5.png"
                             class="responsive" alt="Image">
                        <p>Contacto</p>
                        <footer class="blockquote-footer mb-3">Si usted tiene una duda o sugerencia, o bien encuentra un
                            fallo en Trellit, por favor pongase en contacto conmigo por GitHub.<cite
                                    title="Source Title">Trellit</cite></footer>
                    </div>
                </div>
            </div>
            <br>
        </div>
    </div>
</template>

<script>
    import {mdbBtn} from 'mdbvue';

    export default {
        name: "info",
        data: function () {
            return {}
        },
        components: {
            mdbBtn
        }
    }
</script>

<style scoped>
    .carousel-inner img {
        width: 100%;
        margin: auto;
        min-height: 200px;
    }

    @media (max-width: 600px) {
        .carousel-caption {
            display: none;
        }
    }

    .responsive {
        width: 100%;
        height: auto;
    }
</style>
