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
    <div>
      <div class="search-bar mt-4">
        <input
          type="text"
          v-model="searchTerm"
          placeholder="Search by event name..."
          class="form-control"
        />
      </div>
      <div class="text-center mt-4">
        <button @click="exportPDF" class="btn-submit btn-spacing">Export PDF</button>
        <button @click="exportCSV" class="btn-submit">Export CSV</button>
      </div>
      <div class="eventtable mt-4">
        <DataTable :value="searchEvents()" paginator :rows="10">
          <Column field="name" header="Event Name" sortable></Column>
          <Column field="date" header="Event  date" sortable></Column>
          <Column field="location" header="Event  location"></Column>
          <Column field="description" header="Description"></Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { db } from '../firebase/init.js'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { jsPDF } from 'jspdf'
import Papa from 'papaparse'

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

// 导出 PDF
const exportPDF = () => {
  const doc = new jsPDF()
  doc.text('Event List', 10, 10)

  events.value.forEach((event, index) => {
    const yPosition = 20 + index * 10
    doc.text(`Name: ${event.name}`, 10, yPosition)
    doc.text(`Date: ${event.date}`, 60, yPosition)
    doc.text(`Location: ${event.location}`, 110, yPosition)
  })

  doc.save('events.pdf')
}

// 导出 CSV
const exportCSV = () => {
  const csvData = events.value.map(event => ({
    EventName: event.name,
    EventDate: event.date,
    EventLocation: event.location,
    EventDescription: event.description
  }))

  const csv = Papa.unparse(csvData)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.setAttribute('download', 'events.csv')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

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
.btn-spacing{
  margin-right: 30px;
}
</style>
