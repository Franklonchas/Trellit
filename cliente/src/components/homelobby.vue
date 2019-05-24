<template>
    <div class="winter-neva-gradient">
        <br>
        <h1 style="text-align: center">Novedades de la web</h1>
        <mdb-container>
            <mdb-row>
                <mdb-col sm="3">
                    <mdb-card wide>
                        <mdb-view hover cascade>
                            <a href="#">
                                <img alt="image" class="responsive"
                                     src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500">
                                <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
                            </a>
                        </mdb-view>
                        <mdb-card-body class="text-center" cascade>
                            <mdb-card-title><strong>Alvaro Alameda</strong></mdb-card-title>
                            <h5 class="blue-text"><strong>Diseñador gráfico</strong></h5>
                            <mdb-card-text>Alvaro es la ultima incorporación al equipo de desarrollo, sus diseños y
                                experencia son un soplo de aire fresco para todo el departamento... ¡Bienvenido!
                            </mdb-card-text>
                        </mdb-card-body>
                    </mdb-card>
                </mdb-col>
                <mdb-col sm="3">
                    <mdb-card narrow>
                        <mdb-view hover cascade>
                            <a href="#">
                                <mdb-card-image
                                        src="https://www.filepicker.io/api/file/nS7a8itSTcaAsyct6rVp"
                                        alt="Card image cap"></mdb-card-image>
                                <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
                            </a>
                        </mdb-view>
                        <mdb-card-body cascade>
                            <h5 style="text-align: center" class="pink-text pb-2 pt-1">
                                Vue + Firebase
                            </h5>
                            <mdb-card-title style="text-align: center"><strong>Las principales tecnologías de esta
                                web</strong></mdb-card-title>
                            <mdb-card-text>Este proyecto esta desarrollado con Vue y Firebase, tecnologias en auge que
                                hacen esta web impresionante. ¿Has visto lo rapido que va todo? ¡Echale un vistazo!
                            </mdb-card-text>
                            <mdb-btn style="" slot="reference" color="primary">Saber más</mdb-btn>
                            <mdb-tooltip>
                                <span slot="tip">Enlace fuera de la web</span>
                                <mdb-btn slot="reference" color="indigo lighten-2">Leer más</mdb-btn>
                            </mdb-tooltip>
                        </mdb-card-body>
                    </mdb-card>
                </mdb-col>
                <mdb-col sm="3">
                    <mdb-card cascade>
                        <mdb-view hover cascade>
                            <a href="#">
                                <mdb-card-image src="https://mdbootstrap.com/img/Photos/Others/men.jpg"
                                                alt="Card image cap"></mdb-card-image>
                                <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
                            </a>
                        </mdb-view>
                        <mdb-card-body class="text-center" cascade>
                            <mdb-card-title><strong>Editorial AZETA</strong></mdb-card-title>
                            <h5>Proyecto grande, muy grande</h5>
                            <mdb-card-text>Esta web es no solo es grande, como AZETA, supone todo un reto en desarrollo
                                y despliegue de esta, ya que es la editorial mas grande de España y muy importante en
                                America del Sur.
                            </mdb-card-text>
                            <br>
                        </mdb-card-body>
                    </mdb-card>
                </mdb-col>
                <mdb-col sm="3">
                    <mdb-card cascade>
                        <mdb-view hover cascade>
                            <a href="#">
                                <mdb-card-image
                                        src="https://s3.amazonaws.com/cdn.wp.m4ecnet/wp-content/uploads/2018/06/05041237/GitHub-logo-2-imagen.jpg"
                                        alt="Card image cap"></mdb-card-image>
                                <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
                            </a>
                        </mdb-view>
                        <mdb-card-body class="text-center" cascade>
                            <mdb-card-title><strong>Trellit</strong></mdb-card-title>
                            <h5>Desarrollo de funcionalidades</h5>
                            <mdb-card-text>El proyecto ha finalizado su desarrollo de funcionalidades, ahora solo queda
                                pulir y solucionar fallos de maquetación y estilos. Puede ver el código del proyecto
                                en Github y ver el trascurso del desarrollo y colaborar en lo que falta, si lo desea.
                                !Disfrute de la web¡
                            </mdb-card-text>
                            <br>
                        </mdb-card-body>
                    </mdb-card>
                </mdb-col>
            </mdb-row>
        </mdb-container>
        <br>

        <h1 style="text-align: center">Proyectos en curso</h1>
        <mdb-container>
            <mdb-row>
                <mdb-col v-for="project in arrayProjects" v-bind:key="project.idProject" sm="3">
                    <mdb-card wide>
                        <mdb-view hover cascade>
                            <a href="#">
                                <mdb-card-image
                                        src="https://i2.wp.com/www.silocreativo.com/wp-content/uploads/2017/12/visual-code-portada.png?fit=666%2C370&quality=100&strip=all&ssl=1"
                                        alt="Card image cap"></mdb-card-image>
                                <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
                            </a>
                        </mdb-view>
                        <mdb-card-body class="text-center" cascade>
                            <mdb-card-title><strong>{{project.project}}</strong></mdb-card-title>
                            <h5 class="blue-text"><strong>Jefe de proyecto: {{project.manager}}</strong></h5>
                            <mdb-card-text>{{project.description}}
                            </mdb-card-text>
                            <mdb-btn color="#FFF">
                                <router-link :to="'/Project/' + project.idProject">Ir al proyecto
                                </router-link>
                            </mdb-btn>
                        </mdb-card-body>
                    </mdb-card>
                    <br>
                </mdb-col>
            </mdb-row>

        </mdb-container>
        <br><br>
    </div>
</template>

<script>
    import firebase from 'firebase'

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
        mdbCol,
        mdbTooltip
    } from 'mdbvue';

    export default {
        name: "homelobby",
        data: function () {
            return {
                arrayProjects: []
            }
        },
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
            mdbRow,
            mdbTooltip
        },
        methods: {
            loadProjects: function (projects) {
                this.arrayProjects = [];

                for (let key in projects) {
                    this.arrayProjects.push({
                        project: projects[key].project,
                        manager: projects[key].manager,
                        idProject: projects[key].idProject,
                        description: projects[key].description,
                    })
                }
            },
        },
        mounted() {
            firebase.database().ref('projects/').on('value', snapshots => this.loadProjects(snapshots.val()));
        }
    }
</script>

<style scoped>
    .responsive {
        width: 100%;
        height: auto;
    }
</style>
