<template>
    <div>首页</div>
    <div @click="goHome">{{data}}</div>
</template>

<script lang="ts" setup>
import {useRouter} from 'vue-router'

// 测试
const data = ref<string>('测试副标题')
const router = useRouter()
const goHome = ()=>{
    router.push({name: 'home'})
}

</script>