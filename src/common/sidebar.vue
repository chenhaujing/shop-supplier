<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="item in menus">
                <template v-if="item.code ==='1218000000000' || item.code ==='2216000000000'"></template>
                <template v-else>
                    <template v-if="item.children">
                        <el-submenu :index="item.index" :key="item.index">
                            <template slot="title"><i :class="item.icon"></i>{{ item.label }}</template>
                            <el-menu-item v-for="(subItem,i) in item.children" :key="i" :index="subItem.index">
                                {{subItem.label }}
                            </el-menu-item>
                        </el-submenu>
                    </template>
                    <template v-else>
                        <el-menu-item :index="item.index" :key="item.index"><i :class="item.icon"></i>{{ item.label }}</el-menu-item>
                    </template>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import api from '../api'
    import axios from 'axios'
    import VueRouter from 'vue-router'
    import store from '../store/index';
    import {mapGetters} from 'vuex';

    export default {
        data: function () {
            return {
                isAdmin: '',
            }
        },

        created: function () {
//            this.token = window.localStorage.getItem('token')
            this.isAdmin = JSON.parse(sessionStorage.getItem('vuex')).user.account.isAdmin;
        },
        computed: {
            onRoutes() {
                return this.$route.path.replace('/', '');
            },
            ...mapGetters([
                'menus',
            ]),
        },
        methods: {
        },
        store
    }
</script>

<style>
    .sidebar {
        display: block;
        position: absolute;
        width: 220px;
        left: 0;
        top: 70px;
        bottom: 0;
        background: #2E363F;
    }

    .sidebar > ul > li > div > i:first-child {
        margin-right: 30px;
    }

    .sidebar > ul > li > ul > li {
        padding-left: 80px !important;
    }

    .sidebar > ul > li > i {
        margin-right: 28px !important;
    }
</style>
