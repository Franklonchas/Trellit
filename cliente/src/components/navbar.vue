<template>

    <mdb-navbar expand="large" dark color="indigo">
        <mdb-navbar-brand router-link class="nav-link" to="/Lobby">
            <mdb-icon icon="tasks"/>
            Trellit
        </mdb-navbar-brand>
        <mdb-navbar-toggler>
            <mdb-navbar-nav left>
                <mdb-nav-item router-link class="nav-link" to="/Lobby" active>Home</mdb-nav-item>
                <mdb-nav-item router-link class="nav-link" to="/Calendario">Calendario</mdb-nav-item>
                <mdb-nav-item router-link class="nav-link" to="/conversacion">Chats</mdb-nav-item>
                <mdb-dropdown tag="li" class="nav-item">
                    <mdb-dropdown-toggle tag="a" style="padding:14px;" navLink color="indigo" slot="toggle" waves-fixed>
                        Perfil
                    </mdb-dropdown-toggle>
                    <mdb-dropdown-menu>
                        <mdb-dropdown-item router-link to="/Ajustes">Ajustes</mdb-dropdown-item>
                        <mdb-dropdown-item router-link to="/Admin">Administración</mdb-dropdown-item>
                        <mdb-dropdown-item router-link to="/">Cerrar Sesión</mdb-dropdown-item>
                    </mdb-dropdown-menu>
                </mdb-dropdown>
            </mdb-navbar-nav>
        </mdb-navbar-toggler>
    </mdb-navbar>

</template>

<script>

    import {
        mdbNavbar,
        mdbIcon,
        mdbNavbarBrand,
        mdbNavbarToggler,
        mdbNavbarNav,
        mdbNavItem,
        mdbDropdown,
        mdbDropdownMenu,
        mdbDropdownToggle,
        mdbDropdownItem,
    } from 'mdbvue';

    export default {
        name: 'navbar',
        data: function () {
            return {}
        },
        components: {
            mdbNavbar,
            mdbNavbarBrand,
            mdbNavbarToggler,
            mdbNavbarNav,
            mdbNavItem,
            mdbDropdown,
            mdbDropdownMenu,
            mdbDropdownToggle,
            mdbDropdownItem,
            mdbIcon
        },
        methods: {},
        mounted() {
        }
    }
</script>

<style scoped>

</style>
