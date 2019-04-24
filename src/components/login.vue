<template>

    <div class="classic-form-page">
        <view-wrapper>
            <mdb-mask class="d-flex gradient justify-content-center align-items-center">
                <mdb-container>
                    <mdb-row>
                        <div class="white-text text-center text-md-left col-md-6 mt-xl-5 mb-5">
                            <h1 class="h1-responsive font-weight-bold">Trellit, La gestión empresarial </h1>
                            <hr class="hr-light"/>
                            <h6 class="mb-4">
                                La gestión empresarial ha cambiado. Bienvenido a Trellit.
                            </h6>
                            <h6 class="mb-4">
                                Trellit es una potente herramienta de organización, gestión y control de proyectos
                                y usuarios, de manera totalmente gratuita. Fácil, intuitivo e increiblemente útil.
                                ¿No estas registrado? ¡A que esperas!
                            </h6>
                            <mdb-btn outline="white" color="white">Registrate</mdb-btn>
                        </div>
                        <mdb-col md="6" xl="5" class="mb-4">
                            <mdb-card id="classic-card">
                                <mdb-card-body class="z-depth-2 white-text">
                                    <h3 class="text-center">
                                        <mdb-icon icon="user"/>
                                        Entra:
                                    </h3>
                                    <hr class="hr-light"/>
                                    <mdb-input label="Email" labelColor="white" icon="envelope"/>
                                    <mdb-input label="Contraseña" labelColor="white" icon="lock" type="password"/>
                                    <div class="text-center mt-4 black-text">
                                        <mdb-btn color="indigo">Entrar</mdb-btn>
                                        <hr class="hr-light"/>
                                        <div class="text-center d-flex justify-content-center white-label">
                                            <a class="p-2 m-2">
                                                <mdb-icon fab icon="github" class="white-text"/>
                                            </a>
                                            <a class="p-2 m-2">
                                                <mdb-icon fab icon="linkedin" class="white-text"/>
                                            </a>
                                            <a class="p-2 m-2">
                                                <mdb-icon fab icon="instagram" class="white-text"/>
                                            </a>
                                        </div>
                                    </div>
                                </mdb-card-body>
                            </mdb-card>
                        </mdb-col>
                    </mdb-row>
                </mdb-container>
            </mdb-mask>
        </view-wrapper>
    </div>

</template>

<script>
    import {
        mdbContainer,
        mdbRow,
        mdbCol,
        ViewWrapper,
        mdbMask,
        mdbBtn,
        mdbCard,
        mdbCardBody,
        mdbInput,
        mdbIcon,
    } from 'mdbvue';

    export default {
        name: 'login',
        components: {
            mdbContainer,
            mdbRow,
            mdbCol,
            ViewWrapper,
            mdbMask,
            mdbBtn,
            mdbCard,
            mdbCardBody,
            mdbInput,
            mdbIcon,
        }
    }
</script>

<style scoped>
    .classic-form-page .view {
        background-image: url('https://www.iebschool.com/blog/wp-content/uploads/2014/03/MBA-online.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        height: calc(100vh - 60px);
    }

    .classic-form-page .gradient {
        background: -webkit-linear-gradient(45deg, rgba(0, 0, 0, 0.7), rgba(72, 15, 144, 0.4) 100%);
        background: linear-gradient(45deg, rgba(0, 0, 0, 0.7), rgba(72, 15, 144, 0.4) 100%);
    }

    .classic-form-page .card {
        background-color: rgba(126, 123, 215, 0.2);
    }

    .classic-form-page h6 {
        line-height: 1.7;
    }

    .classic-form-page .navbar {
        transition: background .5s ease-in-out, padding .5s ease-in-out;
    }

    .classic-form-page .navbar .md-form {
        margin: 0;
    }

    @media (max-width: 768px) {
        .classic-form-page .navbar:not(.top-nav-collapse) {
            background: #424f95 !important;
        }
    }

    .classic-form-page label {
        color: #fff !important;
    }
</style>
