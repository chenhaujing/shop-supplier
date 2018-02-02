<template>
    <table class="table table-bordered table-hover commodityAudit_table">
        <thead>
        <tr>
            <th>操作</th>
        </tr>
        </thead>
        <tbody class="commodityAudit_model">
        <tr v-for="(item,index) in commodityLists">
            <td>
                <img src="../../../static/img/details.png">
                <div class="commodityAudit_animate">
                    <!--审核-->
                    <div v-show="item.auditResult==2">
                        <el-button type="text" size="small"   @click="audit(1,item.id)" >审核
                        </el-button>
                    </div>
                    <!--详情-->
                    <div>
                        <el-button type="text" size="small" @click="jump(item.id,item.auditResult)" v-has:adminCommodityAudit_infoList>详情</el-button>
                    </div>
                </div>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script>
        export default {
            data: function () {
                return {

                }
            },
            props:{
                commodityLists:{
                    type:Array
                }
            },
            methods:{
                audit(type,id){
                    this.$emit('Audit',type,id)
                },
                jump(id,type){
                    this.$emit('Jump',id,type)
                },
            }
        }
</script>

<style>

</style>
