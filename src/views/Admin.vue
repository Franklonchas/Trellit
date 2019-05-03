<template>
    <div>
        <Navbar></Navbar>
        <Administracion></Administracion>
    </div>
</template>

<script>
    import Administracion from '../components/administracion'
    import Navbar from '../components/navbar'

    export default {
        name: "Admin",
        components: {
            Administracion,
            Navbar
        }
    }

</script>

<style scoped>

</style>
