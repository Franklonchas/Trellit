<template>
    <div class="row justify-content-around">
        <div class="col-sm-4">
            <form>
                <p class="h4 text-center mb-4">Sign in</p>
                <div class="grey-text text-left">
                    <mdb-input label="Email" icon="envelope" type="email"/>
                    <mdb-input label="Contraseña" icon="lock" type="password"/>
                </div>
                <div class="text-center">
                    <mdb-btn>Entrar</mdb-btn>
                </div>
            </form>
        </div>

        <div class="col-sm-4">
            <template>
                <form>
                    <p class="h4 text-center mb-4">Sign up</p>
                    <div class="grey-text text-left">
                        <mdb-input label="Nombre usuario" icon="user" type="text"/>
                        <mdb-input label="Email" icon="envelope" type="email"/>
                        <mdb-input label="Confirma tu email" icon="exclamation-triangle" type="text"/>
                        <mdb-input label="Contraseña" icon="lock" type="password"/>
                    </div>
                    <div class="text-center">
                        <mdb-btn color="primary">Registrar</mdb-btn>
                    </div>
                </form>
            </template>
        </div>

    </div>
</template>

<script>
    import {mdbInput, mdbBtn} from 'mdbvue';

    export default {
        name: 'login',
        components: {
            mdbInput,
            mdbBtn
        }
    }
</script>

<style scoped>

</style>