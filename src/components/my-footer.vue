<template>

    <mdb-footer color="green lighten-2" class="font-small pt-4 mt-4">
        <mdb-container class="text-left">
            <mdb-row>
                <mdb-col sm="6">
                    <h5 class="title">Trellit</h5>
                    <p>Este es un pryecto independiente, desarrollado para ayudar y hacer uso de tecnologias
                        innovadoras y pioneras.</p>
                </mdb-col>
                <mdb-col sm="6">
                    <h5 class="title">Links de interés</h5>
                    <ul>
                        <li class="list-unstyled"><a href="#!">Github del desarrollador</a></li>
                        <li class="list-unstyled"><a href="#!">Mapa de la web</a></li>
                        <li class="list-unstyled"><a href="#!">Información legal</a></li>
                        <li class="list-unstyled"><a href="#!">Portfolio personal</a></li>
                    </ul>
                </mdb-col>
            </mdb-row>
        </mdb-container>
        <div class="footer-copyright text-center py-3">
            <mdb-container fluid>
                &copy; 2019 Derechos reservados a: <a href="#"> Francisco Javier Sánchez de la Torre </a>
            </mdb-container>
        </div>
    </mdb-footer>

</template>

<script>
    import {mdbFooter, mdbContainer, mdbRow, mdbCol} from 'mdbvue';

    export default {
        name: 'my-footer',
        components: {
            mdbFooter,
            mdbContainer,
            mdbRow,
            mdbCol
        }
    }
</script>

<style scoped>
    .mt-4 {
        margin-top: 0 !important;
    }
</style>
