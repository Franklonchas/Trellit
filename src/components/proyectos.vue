<template>
    <div>
        <h1 style="text-align: center">
            {{this.localNameProject}}
        </h1>
    </div>
</template>

<script>
    import firebase from 'firebase'

    export default {
        name: "proyectos",
        data: function () {
            return {
                arrayProjects: [],
                localIdProject: '',
                localNameProject: '',
            }
        },
        methods: {
            loadProjects: function (projects) {
                this.arrayProjects = [];
                this.localNameProject = '';
                this.localIdProject = this.$route.params.id;

                for (let key in projects) {
                    this.arrayProjects.push({
                        project: projects[key].project,
                        manager: projects[key].manager,
                        idProject: projects[key].idProject,
                        description: projects[key].description,
                    })
                }
                for (let i = 0; i < this.arrayProjects.length; i++) {
                    if (this.arrayProjects[i].idProject === this.localIdProject) {
                        this.localNameProject = this.arrayProjects[i].project;
                    }
                }
                this.localIdProject = '';
            },
        },
        beforeMount() {
        },
        mounted() {
            firebase.database().ref('projects/').on('value', snapshots => this.loadProjects(snapshots.val()));
            this.localIdProject = this.$route.params.id;
        }
    }
</script>

<style scoped>
</style>
