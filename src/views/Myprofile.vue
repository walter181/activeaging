<script setup>
import { ref, computed } from 'vue'
// To initialize
const inputrate = ref(0)
// reference and learn from https://gist.github.com/ChaDonSom/a61d2d592e06c90be23b77f257c587d2
// To initialize rates directly from localStorage, i storage the list in localStorage
const rates = ref(JSON.parse(localStorage.getItem('gardenRatings')) || [])

// count to the average rate for the activity
const averageRate = computed(() => {
  if (rates.value.length === 0) {
    return 0
  } else {
    const sum = rates.value.reduce((a, b) => a + b, 0)
    return (sum / rates.value.length).toFixed(1)
  }
})

// to save the rate to the rates list in localStorage
const saveRate = () => {
  const rating = inputrate.value
  if (rating >= 1 && rating <= 10) {
    // Add the new rating to the rates array
    rates.value.push(rating)
    // translate to json and then storage in localStorage
    localStorage.setItem('gardenRatings', JSON.stringify(rates.value))
    // to save the rate to the rates list in localStorage
    inputrate.value = '' // Clear the input
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
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.acttable {
  margin-bottom: 80px;
}
</style>
