<template>
    <div>
        <navbar></navbar>
        <estadisticas></estadisticas>
    </div>
</template>

<script>
    import Navbar from "../components/navbar";
    import Estadisticas from "../components/estadisticas";

    export default {
        name: "Estadistica",
        components: {Estadisticas, Navbar}
    }
</script>

<style scoped>

</style>
