<template>
    <div class="bread_wrap">
        <el-breadcrumb separator="/" class='breadcrumb' style="margin-bottom:0;">
            <el-breadcrumb-item v-for="(item,index) in navigationList" :to="navigationList[index].route">
        		<span v-if="index==0">
    				<i class="el-icon-date"></i>{{item.name}}
        		</span>
                <span v-else-if="index==navigationList.length-1">
                	<a href="javascript:location.reload();">{{item.name}}</a>
                </span>
                <span v-else>
                	{{item.name}}
                </span>
            </el-breadcrumb-item>
        </el-breadcrumb>

    </div>
</template>

<script>
    export default {
        props: {
            navigationList: {
                type: Array
            }
        },
        mounted() {

        }

    }
</script>

<style scoped>
    .breadcrumb{
        padding: 0;
    }
    .bread_wrap {
        display: inline-block;
    }

    .bread_wrap > div {
        background: #fff;
    }

    .bread_wrap span {
        cursor: pointer;
    }
</style>
