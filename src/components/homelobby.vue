<template>
    <div class="winter-neva-gradient">
        <br><br>

        <mdb-container>
            <mdb-row>
                <mdb-col sm="4">
                    <mdb-card wide>
                        <mdb-view hover cascade>
                            <a href="#!">
                                <mdb-card-image src="https://mdbootstrap.com/img/Photos/Others/photo6.jpg"
                                                alt="Card image cap"></mdb-card-image>
                                <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
                            </a>
                        </mdb-view>
                        <mdb-card-body class="text-center" cascade>
                            <mdb-card-title><strong>Alison Belmont</strong></mdb-card-title>
                            <h5 class="blue-text"><strong>Graffiti Artist</strong></h5>
                            <mdb-card-text>Sed ut perspiciatis unde omnis iste natus sit voluptatem accusantium
                                doloremque laudantium, totam rem aperiam.
                            </mdb-card-text>
                        </mdb-card-body>
                    </mdb-card>
                </mdb-col>
                <mdb-col sm="4">
                    <mdb-card narrow>
                        <mdb-view hover cascade>
                            <a href="#!">
                                <mdb-card-image
                                        src="https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(147).jpg"
                                        alt="Card image cap"></mdb-card-image>
                                <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
                            </a>
                        </mdb-view>
                        <mdb-card-body cascade>
                            <h5 class="pink-text pb-2 pt-1">
                                Culinary
                            </h5>
                            <mdb-card-title><strong>Cheat day inspirations</strong></mdb-card-title>
                            <mdb-card-text>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit
                                laboriosam, nisi ut aliquid ex ea commodi.
                            </mdb-card-text>
                            <mdb-btn color="unique">Pincha aqui</mdb-btn>
                        </mdb-card-body>
                    </mdb-card>
                </mdb-col>
                <mdb-col sm="4">
                    <mdb-card cascade>
                        <mdb-view hover cascade>
                            <a href="#!">
                                <mdb-card-image src="https://mdbootstrap.com/img/Photos/Others/men.jpg"
                                                alt="Card image cap"></mdb-card-image>
                                <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
                            </a>
                        </mdb-view>
                        <mdb-card-body class="text-center" cascade>
                            <mdb-card-title><strong>Billy Cullen</strong></mdb-card-title>
                            <h5>Web developer</h5>
                            <mdb-card-text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus, ex,
                                recusandae. mdbIconcere modi sunt, quod quibusdam.
                            </mdb-card-text>
                            <mdb-btn tag="a" floating small class="btn-fb">
                            </mdb-btn>
                            <mdb-btn tag="a" floating small class="btn-tw">
                            </mdb-btn>
                            <mdb-btn tag="a" floating small class="btn-dribbble">
                            </mdb-btn>
                        </mdb-card-body>
                    </mdb-card>
                </mdb-col>
            </mdb-row>
        </mdb-container>
        <br><br>
        <mdb-row>

        </mdb-row>

    </div>
</template>

<script>
    import {
        mdbCard,
        mdbCardImage,
        mdbCardBody,
        mdbCardTitle,
        mdbCardText,
        mdbBtn,
        mdbView,
        mdbMask,
        mdbContainer,
        mdbRow,
        mdbCol
    } from 'mdbvue';

    export default {
        name: "homelobby",
        data: () => ({}),
        components: {
            mdbCard,
            mdbCardImage,
            mdbCardBody,
            mdbCardTitle,
            mdbCardText,
            mdbBtn,
            mdbView,
            mdbMask,
            mdbContainer,
            mdbCol,
            mdbRow
        },
        methods: {},
        mounted() {
        }
    }
</script>

<style scoped>

</style>
