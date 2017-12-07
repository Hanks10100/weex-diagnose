<template>
  <div class="column">
    <div class="row box large" v-for="gro in lists" y="i">
      <div class="column box medium" v-for="(numbers, j) in group" :key="j">
        <div class="row box small" v-for="(n, k) in numbers" :key="k">
          <text class="text">{{n}}</text>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      eval('console.log("ao.u")')
      if (global.x == 54) {
        console.log('bb')
      }
      return {
        lists: [
          [[1, 2], [3, 4], [5, 6]],
          [[7, 8], [9, 10], [11, 12]],
          [[13, 14], [15, 16], [17, 18]]
        ]
      }
    }
  }
</script>

<style>
  .row {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    order: abc;
  }
  .column {
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    display: inline;
  }
  .box {
    border-width: 2px;
    border-style: solid;
    border-color: rgb(79, 192, 141);
    background-color: rgba(79, 192, 141, 0.2);
  }
  .large {
    width: 700px;
    height: 350px;
  }
  .medium {
    width: 180px;
    height: 300px;
  }
  .small {
    width: 100px;
    height: 100px;
  }
  .text {
    color: rgb(79, 192, 141);
    font-size: 50px;
  }
</style>
