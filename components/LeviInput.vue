<!-- 二次封装 -->
<template>
    <component :is="h(ElInput, {...$attrs, ...props, ref: refChange}, { suffix, prepend, ...$slots})" />
</template>

<script lang="ts" setup>
import InputSuffix from './InputSuffix.vue';
import { h, getCurrentInstance } from 'vue';
import {type InputProps, ElInput} from 'element-plus'

const props = withDefaults(defineProps<Partial<InputProps>>(), {
    clearable: true
})
const vm = getCurrentInstance()
const suffix = () => h(InputSuffix)
const prepend = () => h('div', { class: 'el-input-group' }, [
    h('span', { class: 'el-input-group__start' }, '前缀'),
    h('span', { class: 'el-input-group__end' }, '后缀'),
])

const refChange = (instance:any)=>{
    if(vm){
        vm.exposed = instance
        vm.exposeProxy = instance
    }
}
</script>