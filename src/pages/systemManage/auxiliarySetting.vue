<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-date"></i> 系统设置</el-breadcrumb-item>
            <el-breadcrumb-item><a href="javascript:location.reload();">辅助设置</a></el-breadcrumb-item>
        </el-breadcrumb>
        <div class="row auxiliarySetting_nav clearMargin">
            <span @click="setCommodity(1)" v-bind:class="{auiliarySetting_unStyle:commodityTag}"
                  class="col-xs-1 auiliarySetting_style" style="margin-left:20px;">商品标签</span>
            <span @click="setCommodity(2)" v-bind:class="{auiliarySetting_unStyle:commodityUnit}"
                  class="col-xs-1 auiliarySetting_style">库存单位</span>
            <span @click="setCommodity(3)" v-bind:class="{auiliarySetting_unStyle:meteringSku}"
                  class="col-xs-1 auiliarySetting_style">规格单位</span>
            <span @click="setCommodity(4)" v-bind:class="{auiliarySetting_unStyle:cartonSize}"
                  class="col-xs-1 auiliarySetting_style">箱规单位</span>
            <span v-show="isAdmin === '0'" @click="setCommodity(5)" v-bind:class="{auiliarySetting_unStyle:invoiceSet}"
                  class="col-xs-1 auiliarySetting_style">发票设置</span>
        </div>
        <div class="row auxiliarySetting_buttonStyle clearPadding">
            <!--添加标签-->
            <div class="col-xs-12" v-show="commodityTag">
                <div class="row auxiliarySetting_add_right">
                    <div class="col-xs-12">
                        <el-button type="info" @click="setDialogForm(1)">
                            <i class="el-icon-plus auxiliarySetting_pic"></i>
                            <span class="auxiliarySetting_label">添加标签</span>
                        </el-button>
                    </div>
                </div>
                <div class="row auxiliarySetting_add_right">
                    <div class="col-xs-12 auxiliarySetting_li">
                        <ul>
                            <li v-for="tag in allTags" @click="confirmDelete(tag.id,'tag')" class="auxiliarySetting_li">
                                {{tag.name}}
                                <i class="el-icon-delete2 system_delete"></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!--添加单位-->
            <div class="col-xs-12" v-show="commodityUnit">
                <div class="row auxiliarySetting_add_right">
                    <div class="col-xs-12">
                        <el-button type="info" @click="setDialogForm(2)">
                            <i class="el-icon-plus auxiliarySetting_pic"></i>
                            <span class="auxiliarySetting_label">添加单位</span>
                        </el-button>
                    </div>
                </div>
                <div class="row auxiliarySetting_add_right">
                    <div class="col-xs-12 auxiliarySetting_li">
                        <ul>
                            <li v-for="unit in allUnits" @click="confirmDelete(unit.id,'unit')"
                                class="auxiliarySetting_li">{{unit.name}}
                                <i class="el-icon-delete2 system_delete"></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!--添加计量规格-->
            <div class="col-xs-12" v-show="meteringSku">
                <div class="row auxiliarySetting_add_right">
                    <div class="col-xs-12 auxiliarySetting_li">
                        <el-button type="info" @click="setDialogForm(3)">
                            <i class="el-icon-plus auxiliarySetting_pic"></i>
                            <span class="auxiliarySetting_label">添加规格</span>
                        </el-button>
                    </div>
                </div>
                <div class="row auxiliarySetting_add_right">
                    <div class="col-xs-12 auxiliarySetting_li">
                        <ul>
                            <li v-for="sku in allSkus" @click="confirmDelete(sku.id,'sku')" class="auxiliarySetting_li">
                                {{sku.name}}
                                <i class="el-icon-delete2 system_delete"></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!--添加箱规-->
            <div class="col-xs-12" v-show="cartonSize">
                <div class="row auxiliarySetting_add_right">
                    <div class="col-xs-12 auxiliarySetting_li">
                        <el-button type="info" @click="setDialogForm(4)">
                            <i class="el-icon-plus auxiliarySetting_pic"></i>
                            <span class="auxiliarySetting_label">添加箱规</span>
                        </el-button>
                    </div>
                </div>
                <div class="row auxiliarySetting_add_right">
                    <div class="col-xs-12 auxiliarySetting_li">
                        <ul>
                            <li v-for="carton in allCarton" @click="confirmDelete(carton.id,'carton')"
                                class="auxiliarySetting_li">
                                {{carton.name}}
                                <i class="el-icon-delete2 system_delete"></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!--发票设置-->
            <div class="col-xs-12" v-show="invoiceSet">
                <div class="row auxiliarySetting_add_right">
                    <div class="col-xs-12" style="border-bottom:1px solid black">
                        <h3 class="col-xs-offset-1">订单发票设置</h3>
                    </div>
                    <div class="col-xs-12" style="margin-top:20px;">
                        <span class="col-xs-offset-1 col-xs-1">是否开启</span>
                        <el-switch v-model="mySwitch" on-color="#13ce66" off-color="#ff4949"></el-switch>
                    </div>
                    <div class="col-xs-10 col-xs-offset-2" style="margin-top:20px;">
                        <el-checkbox v-model="invoice" :disabled="isDisabled">增值税普通发票</el-checkbox>
                    </div>
                    <div class="col-xs-10 col-xs-offset-2">
                        <el-checkbox v-model="specialInvoice" :disabled="isDisabled">增值税专用发票</el-checkbox>
                    </div>
                    <el-button type="primary" :disabled="isSave" @click="submit"
                        class="col-xs-offset-6" style="margin-top:100px;transform:translateX(-50%);">保存
                    </el-button>
                </div>
            </div>
        </div>

        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :close-on-press-escape="true"
                   :before-close="closeDialog">
            <el-form :model="form">
                <el-form-item label="" :label-width="formLabelWidth">
                    <el-input v-show="commodityTag" v-model="form.name" auto-complete="off"
                              placeholder="输入新标签"></el-input>
                    <el-input v-show="commodityUnit" v-model="form.name" auto-complete="off"
                              placeholder="输入新单位"></el-input>
                    <el-input v-show="meteringSku" v-model="form.name" auto-complete="off"
                              placeholder="输入新规格"></el-input>
                    <el-input v-show="cartonSize" v-model="form.name" auto-complete="off"
                              placeholder="输入新箱规"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false;form.name = null">取 消</el-button>
                <el-button v-show="commodityTag" type="primary" @click="addTag">保 存</el-button>
                <el-button v-show="commodityUnit" type="primary" @click="addUnit">保 存</el-button>
                <el-button v-show="meteringSku" type="primary" @click="addSku">保 存</el-button>
                <el-button v-show="cartonSize" type="primary" @click="addCarton">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Vue from 'vue';
    import VueResource from 'vue-resource';
    import axios from 'axios';
    import globalData from '../../common/global';
    import comm from '../../api/comm.js';
    import commBrand from '../../api/commBrand.js';
    import commCarton from '../../api/commCarton.js';
    import commMeasureSpec from '../../api/commMeasureSpec.js';
    import commTag from '../../api/commTag.js';
    import commType from '../../api/commType.js';
    import commUnit from '../../api/commUnit.js';
    import inv from '../../api/invoiceSetting.js';

    import '../../../static/css/auxiliarySetting.css';

    export default {
        data() {
            return {
                commodityTag: true,
                commodityUnit: false,
                meteringSku: false,
                cartonSize: false,
                invoiceSet: false,
                allTags: [],
                allUnits: [],
                allSkus: [],
                allCarton: [],
                dialogFormVisible: false,
                formLabelWidth: '50px',
                form: { name: '' },
                dialogTitle: "123",
                mySwitch: false,
                invoice: true,
                specialInvoice: false,
                isDisabled: true,
                isSave: false,
                checkChange: []
            };
        },
        created() {
//            this.isAdmin = JSON.parse(localStorage.getItem('account')).isAdmin;
            this.isAdmin = JSON.parse(sessionStorage.getItem('vuex')).user.account.isAdmin;
            this.setCommodity(1);
        },
        methods: {
            setDialogForm(data) {
                if (data === 1) {
                    this.dialogTitle = "添加标签";
                } else if (data === 2) {
                    this.dialogTitle = "添加单位";
                } else if (data === 3) {
                    this.dialogTitle = "添加规格";
                } else if (data === 4) {
                    this.dialogTitle = "添加箱规";
                } else if (data === 5) {
                    this.dialogTitle = "发票设置";
                }
                this.dialogFormVisible = true;

            },
            setCommodity(data) {
                if (data === 1) {
                    this.commodityTag = true;
                    this.commodityUnit = false;
                    this.meteringSku = false;
                    this.cartonSize = false;
                    this.invoiceSet = false;
                    this.getAllTags();
                } else if (data === 2) {
                    this.commodityTag = false;
                    this.commodityUnit = true;
                    this.meteringSku = false;
                    this.cartonSize = false;
                    this.invoiceSet = false;
                    this.getAllUnits();
                } else if (data === 3) {
                    this.commodityTag = false;
                    this.commodityUnit = false;
                    this.meteringSku = true;
                    this.cartonSize = false;
                    this.invoiceSet = false;
                    this.getAllSkus();
                } else if (data === 4) {
                    this.commodityTag = false;
                    this.commodityUnit = false;
                    this.meteringSku = false;
                    this.cartonSize = true;
                    this.invoiceSet = false;
                    this.getAllCarton();
                } else if (data === 5) {
                    this.commodityTag = false;
                    this.commodityUnit = false;
                    this.meteringSku = false;
                    this.cartonSize = false;
                    this.invoiceSet = true;
                    this.getInvoice();
                }
            },
            /**
             * 获取所有的商品标签
             */
            getAllTags() {
                commTag.getCommTag().then((response) => {
                    if (response.data.code === 1) {
                        this.allTags = response.data.data;
                    } else if (response.data.code === 0) {
                        this.$alert(response.data.message);
                    }
                });
            },
            /**
             * 获取所有的库存单位
             */
            getAllUnits() {
                commUnit.getCommUnit().then(
                    (response) => {
                        if (response.data.code === 1) {
                            this.allUnits = response.data.data;
                        } else if (response.data.code === 0) {
                            this.$alert(response.data.message);
                        }
                    }
                );
            },
            /**
             * 获取所有的规格
             */
            getAllSkus() {
                commMeasureSpec.getCommMeasureSpec().then(
                    (response) => {
                        if (response.data.code === 1) {
                            this.allSkus = response.data.data;
                        } else if (response.data.code === 0) {
                            this.$alert(response.data.message);
                        }
                    }
                );
            },

            /**
             * 获取所有的箱规
             */
            getAllCarton() {
                commCarton.getCommCarton().then(
                    (response) => {
                        if (response.data.code === 1) {
                            this.allCarton = response.data.data;
                        } else if (response.data.code === 0) {
                            this.$alert(response.data.message);
                        }
                    }
                );
            },

            /**
             * 关闭模态框之后的回调方法
             */
            closeDialog() {
                this.dialogFormVisible = false;
                this.form.name = null;
            },

            /**
             * 添加标签
             */
            addTag() {
                commTag.addCommTag(this.form).then(
                    (response) => {
                        if (response.data.code === 1) {
                            this.closeDialog();
                            this.getAllTags();
                        } else if (response.data.code === 0) {
                            this.$alert(response.data.message);
                        }
                    }
                );
            },
            /**
             * 添加单位
             */
            addUnit() {
                commUnit.addCommUnit(this.form).then(
                    (response) => {
                        if (response.data.code === 1) {
                            this.closeDialog();
                            this.getAllUnits();
                        } else if (response.data.code === 0) {
                            this.$alert(response.data.message);
                        }
                    }
                );
            },
            /**
             * 添加规格
             */
            addSku() {
                commMeasureSpec.addCommMeasureSpec(this.form).then(
                    (response) => {
                        if (response.data.code === 1) {
                            this.closeDialog();
                            this.getAllSkus();
                        } else if (response.data.code === 0) {
                            this.$alert(response.data.message);
                        }
                    }
                );
            },

            /**
             * 添加箱规
             */
            addCarton() {
                commCarton.addCommCarton(this.form).then(
                    (response) => {
                        if (response.data.code === 1) {
                            this.closeDialog();
                            this.getAllCarton();
                        } else if (response.data.code === 0) {
                            this.$alert(response.data.message);
                        }
                    }
                );
            },

            /**
             * 删除标签
             */
            confirmDelete(id, type) {
                this.$confirm('是否删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delete(id, type);
                }).catch(() => {
                    this.$message({ type: 'info', message: '已取消删除' });
                });
            },
            /**
             * 删除指定信息
             * @param id    删除的id
             * @param type  删除的类型
             */
            delete(id, type) {
                if (type === 'tag') {
                    commTag.delCommTag(id).then(
                        (response) => {
                            if (response.data.code === 1) {
                                this.$message({ type: 'success', message: '删除成功!' });
                                this.getAllTags();
                            } else if (response.data.code === 0) {
                                this.$alert(response.data.message);
                            }
                        }
                    );
                } else if (type === 'unit') {
                    commUnit.delCommUnit(id).then(
                        (response) => {
                            if (response.data.code === 1) {
                                this.$message({ type: 'success', message: '删除成功!' });
                                this.getAllUnits();
                            } else if (response.data.code === 0) {
                                this.$alert(response.data.message);
                            }
                        }
                    );
                } else if (type === 'sku') {
                    commMeasureSpec.delCommMeasureSpec(id).then(
                        (response) => {
                            if (response.data.code === 1) {
                                this.$message({ type: 'success', message: '删除成功!' });
                                this.getAllSkus();
                            } else if (response.data.code === 0) {
                                this.$alert(response.data.message);
                            }
                        }
                    );
                } else if (type === 'carton') {
                    commCarton.delCommCarton(id).then(
                        (response) => {
                            if (response.data.code === 1) {
                                this.$message({ type: 'success', message: '删除成功!' });
                                this.getAllCarton();
                            } else if (response.data.code === 0) {
                                this.$alert(response.data.message);
                            }
                        }
                    );
                }
            },

            /**
             * 查询供应商发票设置
             */
            getInvoice() {
                //执行发票接口的查询
                inv.getInvoiceSetting().then(res => {
                    if (res.data.code === 0) {
                        this.$alert(res.data.message);
                    }
                    this.specialInvoice = res.data.data.specialInvoice ? true : false;
                    this.invoice = res.data.data.invoice ? true : false;
                    this.mySwitch = res.data.data.status ? true : false;
                });
            },

            /**
             * 提交发票设置
             * */
            submit() {
                if (this.mySwitch && !this.invoice && !this.specialInvoice) {
                    this.$alert("开启发票设置时必须至少选择一项!");
                    return;
                }
                let params = {
                    specialInvoice: this.specialInvoice === true ? 1 : 0,
                    invoice: this.invoice === true ? 1 : 0,
                    status: this.mySwitch === true ? 1 : 0
                };
                inv.invoiceUpdate(params).then(res => {
                    if (res.data.code === 1) {
                        this.$alert("修改供应商发票设置成功！");
                    }
                    if (res.data.code === 0) {
                        this.$alert(res.data.message);
                    }
                })
            },
        },
        watch: {
            'mySwitch'(newVal) {
                this.isDisabled = newVal ? false : true;
                if (this.mySwitch && !this.invoice) {
                    this.invoice = true
                }
                if (!this.mySwitch) {
                    this.invoice = false
                    this.specialInvoice = false
                }
            },
        },
    };
</script>
