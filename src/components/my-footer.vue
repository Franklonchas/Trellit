<template>

    <mdb-footer color="mdb-color darken-3" class="font-small pt-4 mt-4">
        <mdb-container class="text-left">
            <mdb-row>
                <mdb-col sm="5">
                    <h5 class="title">Trellit</h5>
                    <p>Este es un proyecto independiente, desarrollado para ayudar y hacer uso de tecnologias
                        innovadoras y pioneras.
                        Todos los datos guardados en esta web respetan sus derechos de
                        privacidad, para nosotros siempre
                        es una prioridad.</p>
                </mdb-col>
                <mdb-col sm="4">
                    <h5 class="title">Links de interés</h5>
                    <ul class="lel">
                        <li class="list-unstyled"><a href="https://github.com/Franklonchas">
                            Github del desarrollador&nbsp;&nbsp;&nbsp;<mdb-icon fab icon="github"/>
                        </a></li>
                        <li class="list-unstyled">
                            <router-link :to="'/Webmap'">Mapa Web</router-link>&nbsp;&nbsp;&nbsp;<mdb-icon
                                icon="map-marked-alt"/>
                        </li>
                        <li class="list-unstyled">
                            <router-link :to="'/infoweb'">Información Web</router-link>&nbsp;&nbsp;&nbsp;<mdb-icon
                                icon="info"/>
                        </li>
                    </ul>
                </mdb-col>
                <mdb-col sm="3">
                    <h5 class="title">Código QR:</h5>
                    <img style="height: 60px; width: 60px;" src="../assets/CodeQR.png">
                </mdb-col>
            </mdb-row>
        </mdb-container>
        <div class="footer-copyright text-center py-3">
            <mdb-container fluid>
                &copy; 2019 Derechos reservados a: <a href="#"> Francisco Javier Sánchez de la Torre & Trellit </a>
            </mdb-container>
        </div>
    </mdb-footer>

</template>

<script>
    import {mdbFooter, mdbContainer, mdbRow, mdbCol, mdbIcon} from 'mdbvue';

    export default {
        name: 'my-footer',
        components: {
            mdbFooter,
            mdbContainer,
            mdbRow,
            mdbCol,
            mdbIcon
        }
    }
</script>

<style scoped>
    .mt-4 {
        margin-top: 0 !important;
    }

    .lel {
        padding-left: 0 !important;
    }
</style>
