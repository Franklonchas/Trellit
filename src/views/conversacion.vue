<template>
    <div>
        <navbar></navbar>
        <chat></chat>
    </div>
</template>

<script>
    import Navbar from "../components/navbar";
    import Chat from "../components/chat";

    export default {
        name: "conversacion",
        components: {Chat, Navbar}
    }
</script>

<style scoped>

</style>
