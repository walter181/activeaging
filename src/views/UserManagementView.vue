<template>
  <div class="container">
    <div class="row" style="margin-top: 40px;">
  <!-- Event Count -->
      <div class="col-md-4">
        <div class="count-box count-text">
          <p v-if="eventCount !== null">Total number of events: {{ eventCount }}</p>
          <p v-if="eventError">{{ eventError }}</p>
          <button class="btn btn-success btn-center" @click="getEventCount">Get Event Count</button>
        </div>
      </div>

  <!-- User Count -->
      <div class="col-md-4">
        <div class="count-box count-text">
          <p v-if="userCount !== null">Total number of users: {{ userCount }}</p>
          <p v-if="userError">{{ userError }}</p>
          <button class="btn btn-success btn-center" @click="getUserCount">Get User Count</button>
        </div>
      </div>

  <!-- Booking Count -->
      <div class="col-md-4">
        <div class="count-box count-text">
          <p v-if="bookingCount !== null">Total number of bookings: {{ bookingCount }}</p>
          <p v-if="bookingError">{{ bookingError }}</p>
          <button class="btn btn-success btn-center" @click="getBookingCount">Get Booking Count</button>
        </div>
    </div>
</div>
    <div>
      <div class="search-bar mt-4">
        <input
          type="text"
          v-model="searchTerm"
          placeholder="Search by user name..."
          class="form-control"
        />
      </div>
      <div class="eventtable mt-4">
        <DataTable :value="searchUsers()" paginator :rows="10">
          <Column field="username" header="User Name" sortable></Column>
          <Column field="email" header="User  Email" sortable></Column>
          <Column field="role" header="User  role"></Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

import { db } from '../firebase/init.js'
import { collection, getDocs } from 'firebase/firestore'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

// Event count variables
const eventCount = ref(0);
const eventError = ref(null);

// User count variables
const userCount = ref(0);
const userError = ref(null);

// Booking count variables
const bookingCount = ref(0);
const bookingError = ref(null);

// Fetch event count
const getEventCount = async () => {
  try {
    const response = await axios.get('https://countevents-sjnij7mjvq-uc.a.run.app');
    eventCount.value = response.data.count;
    eventError.value = null;
  } catch (err) {
    console.error('Error fetching event count:', err);
    eventError.value = 'Error fetching event count';
    eventCount.value = null;
  }
};

// Fetch user count
const getUserCount = async () => {
  try {
    const response = await axios.get('https://countusers-sjnij7mjvq-uc.a.run.app');
    userCount.value = response.data.count;
    userError.value = null;
  } catch (err) {
    console.error('Error fetching user count:', err);
    userError.value = 'Error fetching user count';
    userCount.value = null;
  }
};

// Fetch booking count
const getBookingCount = async () => {
  try {
    const response = await axios.get('https://countbookings-sjnij7mjvq-uc.a.run.app');
    bookingCount.value = response.data.count;
    bookingError.value = null;
  } catch (err) {
    console.error('Error fetching booking count:', err);
    bookingError.value = 'Error fetching booking count';
    bookingCount.value = null;
  }
};

// Users data and search variables
const Users = ref([])
const searchTerm = ref('')

// Fetch users from Firestore
const fetchUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'))
    Users.value = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

// Search users
const searchUsers = () => {
  if (!searchTerm.value) {
    return Users.value
  }
  return Users.value.filter(
    (user) => user.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
}

fetchUsers()
</script>
<style scoped>
.count-box {
  border: 2px solid #28a74533;
  border-radius: 15px; /* Rounded corners */
  padding: 20px;
  text-align: center;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.btn-center {
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-center:hover {
  background-color: #218838;
}
.count-text {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>