<template>
    <div class="header">
      {{ title }}
    </div>
    <div class="sub-header">
        {{ subTitle }}
    </div>
</template>
<script setup lang="ts">
interface IProp{
    subTitle: string
}
defineProps<IProp>()
const title = ref('这是顶部')
setTimeout(()=>{
    title.value = '这是新顶部'
},4000)
</script>

<style lang="scss" scoped>
.header{
    color: #000;
    font-size: 24px;
}
.sub-header{
    font-size: 18px;
}
</style>
  