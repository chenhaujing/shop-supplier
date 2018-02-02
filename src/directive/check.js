// export default {
//     'check-all': {
//         twoWay: true,
//         params: ['checkData'],
//         bind() {
//             /**
//              - 如果所有的列表的checked属性都为true,则选中全选框,否则不选中全选框
//              */
//             this.vm.$watch(this.params.checkData, (checkData) => {
//                 if (checkData.every((item) => item.checked)) {
//                     this.set(true);
//                 } else {
//                     this.set(false);
//                 }
//             }, { deep: true });
//         },
//         // checkAll发生更改时
//         update(checkAll) {
//             /**
//              - 如果全选框被选中,则将列表的所有checked属性转为true,否则转为false
//              */
//             if (checkAll) {
//                 this.vm[this.params.checkData].forEach((item) => {
//                     item.checked = true;
//                 });
//             } else {
//                 this.vm[this.params.checkData].forEach((item) => {
//                     item.checked = false;
//                 });
//             }
//         },
//     },
// };

import Vue from 'vue'

// Vue.directive('check-all', function(el,binding){
//     console.log(el)
//     console.log(binding)

//     if(el.checked == 'false' || el.checked == false){
//         binding.value.forEach(function(item) {
//             Vue.set(item, 'checked', '')
//         })
//     }else{
//         binding.value.forEach(function(item) {
//             Vue.set(item, 'checked', 'true')
//         })
//     }

//     console.log(binding.value)
// });

Vue.directive('check-all', {
    bind(el, binding, vnode) {
        let arr = binding.value
        let bindArrStatu = arr.every(function(item){
            return item.checked == true
        })
        if(bindArrStatu == true){
            el.checked = true
        }else{
            el.checked = false
        }
    },
    update (el, binding) {
        console.log(el)
        console.log(el.checked)
        let arr = binding.value

        if(el.checked == 'true' || el.checked == true){
            binding.value.forEach(function(item) {
                    item.checked = true
                })
            }else{
                binding.value.forEach(function(item) {
                    // Vue.set(item, 'checked', 'true')
                    item.checked = false
                    // el.checked = ''
                })
            }

        // let updateArrStatu = arr.some(function(item){
        //     return item.checked == false
        // })
        // console.log(updateArrStatu)

        // if(updateArrStatu == false){
        //     el.checked = ''
        // }else{
        //     el.checked = 'true'
        // }


    },
    componentUpdated(el, binding) {

    }
})
