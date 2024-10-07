<script setup>
import { ref } from 'vue'
import { db } from '../firebase/init.js'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const eventName = ref('')
const eventDate = ref('')
const eventLocation = ref('')
const eventDescription = ref('')
const message = ref('')
const events = ref([])
const searchTerm = ref('')

const submitEvent = async () => {
  if (eventName.value && eventDescription.value && eventDate.value && eventLocation.value) {
    try {
      await addDoc(collection(db, 'events'), {
        name: eventName.value,
        description: eventDescription.value,
        date: eventDate.value,
        location: eventLocation.value
      })
      alert('Event successfully added!')
      // Clear the form
      eventName.value = ''
      eventDescription.value = ''
      eventDate.value = ''
      eventLocation.value = ''

      // Fetch updated events
      fetchEvents()
    } catch (error) {
      console.error('Error adding document: ', error)
      message.value = 'Error adding event!'
    }
  } else {
    message.value = 'Please fill in all fields!'
  }
}

const fetchEvents = async () => {
  const querySnapshot = await getDocs(collection(db, 'events'))
  events.value = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

const searchEvents = () => {
  if (!searchTerm.value) {
    return events.value
  }
  return events.value.filter(
    (event) => event.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
}

fetchEvents()
</script>

<template>
  <div class="container">
    <div class="addevent">
      <h4 style="margin-bottom: 10px">Add Event</h4>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="eventName">Event Name:</label>
          <input type="text" id="eventName" v-model="eventName" class="form-control" />
        </div>
        <div class="col-md-3 mb-3">
          <label for="eventDate">Event Date:</label>
          <input type="date" id="eventDate" v-model="eventDate" class="form-control" />
        </div>
        <div class="col-md-3 mb-3">
          <label for="eventLocation">Event Location:</label>
          <input type="text" id="eventLocation" v-model="eventLocation" class="form-control" />
        </div>
      </div>
      <div class="mb-3">
        <label for="eventDescription">Event Description:</label>
        <textarea id="eventDescription" v-model="eventDescription" class="form-control"></textarea>
      </div>
      <div class="text-center">
        <button @click="submitEvent" class="btn-submit">Submit Event</button>
      </div>
      <div v-if="message">{{ message }}</div>
    </div>
  </div>
</template>

<style scoped>
.addevent {
  margin-top: 30px;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.06);
  border: 2px solid #28a7462c;
}
.btn-submit {
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  width: 220px;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.btn-submit:hover {
  background-color: #218838;
}
</style>
