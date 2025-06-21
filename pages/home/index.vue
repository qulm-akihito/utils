<template>
  <Header subTitle="副标题" />
   <div>{{ value }}</div>
   <LeviInput v-model="inputValue" class="custom-input" />
    <div>{{ countValue }}</div>
    <div class="add-btn" @click="addValue">增加</div>
    <div class="add-btn" @click="stopCount">停止</div>
    <div class="container">
      <input type="range"  v-model="value" />
      <div class="ball" :style="{'animation-delay':`-${delayValue}s` }" />
      <div class="ball_2" :style="{left:`${delayValue*10}px` }" />
    </div>
  <!-- <div class="home">
    <div v-for="item in boxes" :key="item" class="home--box">
      {{item}}
    </div>
  </div> -->
</template>

<script lang="ts" setup>
import { ref, effectScope } from 'vue'
import LeviInput from '../../components/LeviInput.vue'

const boxes = ref<number[]>([])
boxes.value = [1, 2, 3,4,5,6,7,8,9,10]

const value = ref(0)
const countValue = ref(0)
const delayValue = ref(0)
const scope = effectScope()
scope.run(()=>{
  watch(value, ()=>{
    countValue.value = value.value * 2
    delayValue.value = value.value / 10
  })
})

const addValue = ()=>value.value++
const stopCount = ()=>scope.stop()

const inputValue = ref<string>('测试')
</script>

<style lang="scss" scoped>
.add-btn{
  width: 86px;
  height: 24px;
  background: blue;
  cursor: pointer;
  display: flex;
  align-self: center;
  justify-content: center;
  color: #ffffff ;
}

@keyframes move{
  0%{
    left: 0;
    top: 40px;
  }
  25%{
    left: 40px;
    top: 0;
  }
  50%{
    left: 80px;
    top: 40px;
  }
  75%{
    left: 40px;
    top: 80px;
  }
  100%{
    left: 0;
    top: 40px;
  }
}
.container{
  width: 100%;
  height: 300px;
  background: gray;
  position: relative;
  .ball{
    width: 40px;
    height: 40px;
    background: greenyellow;
    border-radius: 50%;
    position: absolute;
    left: 0;
    top: 40px;
    animation: move 10s linear forwards paused;
  }
  .ball_2{
     width: 40px;
    height: 40px;
    background: greenyellow;
    border-radius: 50%;
    position: absolute;
    left: 0;
    top: 80px;
    display: none;
  }
}
.home{
  width: 500px;
  height: 500px;
   display: grid;
   gap: 20px 0;
   background-color: #f0f0f0;
    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
   &--box{
    width: 70px;
    height: 70px;
    background-color: #f0f;
    text-align: center;
    line-height: 70px;
    font-size: 24px;
    color: #fff;
   }
}

</style>
<style lang="scss">
body{
  margin: 0;
}
</style>
  
