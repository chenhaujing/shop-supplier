<template>

</template>

<style lang="less" type="text/less" scpoed>

</style>

<script>
    export default {
        data() {
            return {
                statusZero: false,
                statusOne: false,
                statusTow: false,
                statusThree: false,
                statusFour: false,
                statusFive: false,
                statusSix: false,
            }
        },
        props: {
            control: {
                type: Boolean,
            },
            confirmRefund: {
                type: Boolean,
            },
            status: {
                type: Number,
            }
        },
        created() {
            switch (this.status) {
                case 0:
                    this.statusZero = true;
                    break;
                case 1:
                    this.statusOne = true;
                    break;
                case 2:
                    this.statusTow = true;
                    break;
                case 3:
                    this.statusThree = true;
                    break;
                case 4:
                    this.statusFour = true;
                    break;
                case 5:
                    this.statusFive = true;
                    break;
                case 6:
                    this.statusSix = true;
                    break;
            }
        },
        methods: {
            goBack() {
                this.$emit('goBack');
            },
            reject(num) {
                console.log(num);
                if (num === 3) {
                    this.$emit('reject', 3);
                    return;
                }
                if (num === 1) {
                    this.$emit('reject', 1);
                    return;
                }
                this.$emit('reject');

            },
            auditPassDialog() {
                this.$emit('auditPassDialog');
            },
            refund() {
                this.$emit('refund');
            }
        }
    }
</script>
