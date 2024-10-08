<template>
  <div class="container">
    <div class="search-bar mt-4">
      <input
        type="text"
        v-model="searchTerm"
        placeholder="Search by event name..."
        class="form-control"
      />
    </div>
    <div class="eventtable mt-4">
      <DataTable :value="searchEvents()" paginator :rows="5">
        <Column field="name" header="Event Name" sortable></Column>
        <Column field="date" header="Event Date" sortable></Column>
        <Column field="location" header="Event Location"></Column>
        <Column field="description" header="Event Description"></Column>
      </DataTable>
    </div>
    <div id="map" class="map-container mt-4"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

import { db } from '../firebase/init.js'
import { collection, getDocs } from 'firebase/firestore'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const events = ref([])
const searchTerm = ref('')

const mapContainer = ref(null)

onMounted(() => {
  mapboxgl.accessToken = 'pk.eyJ1Ijoid2FsdGVyMTgiLCJhIjoiY20yMGViaXBiMDhlaDJsb2o5bzd3c2VybyJ9.Qd6WhcIYhnixucNvgEZO9w'
  const map = new mapboxgl.Map({
    container: 'map', 
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [114.1694, 22.3193], 
    zoom: 10
  })

  map.addControl(new mapboxgl.NavigationControl())

  const directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    unit: 'metric',
    profile: 'mapbox/driving',
    interactive: true
  })
  map.addControl(directions, 'top-right')

  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    marker: false,
    placeholder: 'Search for places', // 输入框的提示文字
  })
  
  map.addControl(geocoder, 'top-left')

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = [position.coords.longitude, position.coords.latitude]
        directions.setOrigin(userLocation)
        map.setCenter(userLocation)
      },
      (error) => {
        console.error('Error getting location:', error)
      }
    )
  } else {
    console.error('Geolocation is not supported by this browser.')
  }
})

const fetchEvents = async () => {
  const querySnapshot = await getDocs(collection(db, 'events'))
  events.value = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

const searchEvents = () => {
  if (!searchTerm.value) {
    return events.value
  }
  return events.value.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
}

onMounted(() => {
  fetchEvents()
})
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 400px;
  position: relative;
  margin-bottom: 80px;
}

.eventtable {
  margin-top: 30px;
  padding: 20px;
}
.search-bar {
  margin-top: 20px;
}
</style>
