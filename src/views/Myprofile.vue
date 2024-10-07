<template>
  <div class="container">
    <div class="bookingevent mt-4" style="margin: 20px">
      <h3>Book an Event</h3>
      <div class="row">
        <div class="col-md-8 mb-3">
          <input
            type="text"
            v-model="newEventName"
            placeholder="Event Name"
            class="form-control"
            style="height: 45px"
          />
        </div>
        <div class="col-md-4">
          <button @click="bookEvent" class="btn-submit">Book Event</button>
        </div>
      </div>
    </div>

    <div class="search-bar mt-4">
      <input
        type="text"
        v-model="searchTerm"
        placeholder="Search by event name..."
        class="form-control"
      />
    </div>

    <div class="eventtable mt-4">
      <DataTable :value="searchEvents()" paginator :rows="10">
        <Column field="name" header="Event Name" sortable></Column>
        <Column field="date" header="Event Date" sortable></Column>
        <Column field="location" header="Event Location"></Column>
        <Column field="description" header="Event Description"></Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { db } from '../firebase/init.js'
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { getAuth } from 'firebase/auth'
import axios from 'axios'

const events = ref([])
const searchTerm = ref('')
const newEventName = ref('')
const userId = ref('')
const email = ref('')
const bookingDate = ref(new Date().toISOString().split('T')[0])

const fetchUserData = () => {
  const auth = getAuth()
  const currentUser = auth.currentUser
  if (currentUser) {
    userId.value = currentUser.uid
    email.value = currentUser.email
  } else {
    alert('No user is currently logged in.')
  }
}

// 获取事件列表
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

const bookEvent = async () => {
  if (!newEventName.value) {
    alert('Please enter event name.')
    return
  }
  const eventQuery = query(collection(db, 'events'), where('name', '==', newEventName.value))
  const querySnapshot = await getDocs(eventQuery)
  if (querySnapshot.empty) {
    alert('Event not found.')
    return
  }
  const eventDoc = querySnapshot.docs[0]
  await addDoc(collection(db, 'bookings'), {
    eventId: eventDoc.id,
    userId: userId.value,
    email: email.value,
    bookingDate: bookingDate.value,
    eventName: eventDoc.data().name
  })
  alert('Booking succeeded')

  try {
    const response = await axios.post('https://sendemail-sjnij7mjvq-uc.a.run.app', {
      email: email.value
    })
    console.log('response',response.data)

  } catch (error) {
    console.error('Error sending email', error)
    alert('Error sending email')
  }

  fetchEvents()
}

// 页面加载时获取用户数据和事件
onMounted(() => {
  fetchUserData()
  fetchEvents()
})
</script>

<style scoped>
.bookingevent {
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
