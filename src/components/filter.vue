<template>
	<div class="selectionList">
        <div class="h4">选项列表项</div>
        <el-checkbox-group v-model="checkedCols">
            <el-checkbox class="checkbox" v-for="col in cols" :label="col.id" :key="col.id"
                         @change="checkBox">{{col.name}}
            </el-checkbox>
        </el-checkbox-group>
        <el-checkbox class="checkbox" @change="checkBox">共{{displayCols.length}}项</el-checkbox>
        <div class="text-center confirm">
            <button class="btn btn-default" @click="confirmDisplay">确认</button>
        </div>
    </div>
</template>

<script>
export default{
	props:{
		cols:{
			type:Array
		}
	},
	data(){
		return{
			checkedCols: [],
			displayCols:[],
			isShowTable:true,
			isShowList:true
		}
	},
	created(){
		this.displayCols = this.cols.map(r => {
            return {
                'id': r.id,
                'display': true
            };
        });
	},
	methods:{
		checkBox(event){
			if (event.target.value == '') {
                if (event.target.checked) {
                    this.checkedCols = this.cols.map(r => r.id);
                } else {
                    this.checkedCols = [];
                }
            }
			console.log(this.checkedCols)
		},
		confirmDisplay(){
			if (this.checkedCols && this.checkedCols.length > 4) {
                this.displayCols.forEach(r => {
                    if (this.checkedCols.indexOf(r.id) == -1) {
                        r.display = false;
                    } else {
                        r.display = true;
                    }
                });
                if (this.checkedCols.length < 7) {
                    this.isShowTable = false;
                } else {
                    this.isShowTable = true;

                }
                this.isShowList = false;
            } else {
                this.$alert('请勾选4个以上的选项');
            }
            this.$emit('postDisplayCols',{displayCols:this.displayCols,isShowList:this.isShowList,isShowTable:this.isShowTable})
		},
	}
}
</script>

<style>
</style>