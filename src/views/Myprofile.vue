<script setup>
import { ref, computed } from 'vue'

const inputrate = ref(0)

// 初始化 `rates`，直接从 `localStorage` 中获取数据
const rates = ref(JSON.parse(localStorage.getItem('gardeningRatings')) || [])

// 计算平均评分
const averageRate = computed(() => {
  if (rates.value.length === 0) {
    return 0
  }
  const sum = rates.value.reduce((a, b) => a + b, 0)
  return (sum / rates.value.length).toFixed(1)
})

// 保存评分
const saveRate = () => {
  const rating = inputrate.value
  if (rating >= 1 && rating <= 10) {
    rates.value.push(rating)
    localStorage.setItem('gardeningRatings', JSON.stringify(rates.value))
    inputrate.value = '' // 清空输入框
  } else {
    alert('Please enter a number between 1 and 10')
  }
}
</script>

<template>
  <div class="container">
    <h4 class="mt-4">Activities you have participated:</h4>
    <div class="row g-4 acttable mt-3">
      <div class="col-md-6 mb-1">
        <div class="activity" style="padding-left: 3%">
          <div class="row">
            <div style="margin-top: 2%">
              <h4>Gardening for Wellness</h4>
              <p>
                Description: A relaxing outdoor activity where seniors learn to grow flowers,
                vegetables, and herbs while enjoying the health benefits of gardening.
              </p>
            </div>
            <div class="rate mt-2 row">
              <div>Please rate this activity:</div>
              <div class="col-md-4 d-flex mt-1 mb-3">
                <input
                  type="number"
                  v-model="inputrate"
                  placeholder="Enter 1-10"
                  min="1"
                  max="10"
                  class="form-control me-3"
                />
                <button @click="saveRate" class="btn btn-primary">Submit</button>
              </div>
              <div class="col-md-8 d-flex mt-1 mb-3 align-items-center">
                <div>Average rate:</div>
                <div>{{ averageRate }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h4>Future Activities:</h4>
    <div class="row g-4 acttable mt-3">
      <div class="col-md-6 mb-1">
        <div class="activity">
          <div class="row">
            <div style="margin-top: 20px; padding-left: 30px">
              <h4>Silver Yoga</h4>
              <p>
                Description: A yoga class specifically designed for seniors, helping them improve
                flexibility, balance, and breathing control. The class features gentle movements and
                poses suitable for various physical conditions, aiming to enhance both physical and
                mental well-being.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 mb-1">
        <div class="activity">
          <div class="row">
            <div style="margin-top: 20px; padding-left: 30px">
              <h4>Traditional Craft Workshop</h4>
              <p>
                Description: In this workshop, seniors will learn and practice traditional crafts
                such as knitting, embroidery, and woodworking. This is not only an opportunity to
                create beautiful handmade items but also a way to preserve cultural heritage.
                Participants can also showcase their creations to family and friends.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.activity {
  /* height: 200px; */
  background-color: rgb(251, 251, 251);
  border: 2px solid #e9e9e9ae;
  border-radius: 15px; /* 圆角 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影 */
}
.acttable {
  margin-bottom: 80px;
}
</style>
