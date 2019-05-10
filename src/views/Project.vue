<template>
    <div>
        <navbar></navbar>
        <proyectos></proyectos>
    </div>
</template>

<script>
    import Navbar from "../components/navbar";
    import Proyectos from "../components/proyectos";
    export default {
        name: "Project",
        components: {Proyectos, Navbar}
    }
</script>

<style scoped>
</style>
