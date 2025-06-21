<template>
    <div class="container">
        <LeviInput ref="inputRef" v-model="inputValue" class="custom-input" placeholder="Search">
            <template #prepend>
                <div>prepend</div>
            </template>
            <template #suffix>
                <div>suffixed</div>
            </template>
        </LeviInput>
        <LeviInput ref="inputRef" v-model="inputValue" :clearable="false" placeholder="Search">

        </LeviInput>
        <ElButton type="primary" @click="handleClick">Search</ElButton>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElButton } from 'element-plus'
import LeviInput from '../../components/LeviInput.vue'
import { EventEmiiter } from '../../utils/event'

const inputRef = ref<InstanceType<typeof LeviInput>>()
const inputValue = ref<string>('')
const obj: any = {
    a: {
        b: 1
    },
}
obj.c = obj

// 循环引用检测
const getRepeatKey = (data: any, seen = new Set()) => {
    if (typeof data !== 'object' || data === null) return false
    if (seen.has(data)) return true
    seen.add(data)
    for (let key in data) {
        if (getRepeatKey(data[key], new Set(seen))) return true
    }
    return false
}

const handleClick = () => {
    inputValue.value = '搜索'
    console.log(obj);
    console.log(inputRef.value);
    console.log(getRepeatKey(obj));
}

const event = new EventEmiiter<any>()
event.on('request', (v) => {
    console.log('request: error', v)
})
event.on('request', (v) => {
    console.log('request: error2', v)
})
event.on('request2', (v) => {
    console.log('request: success', v)
})

</script>


<style lang="scss">
body {
    margin: 0;
}
</style>
