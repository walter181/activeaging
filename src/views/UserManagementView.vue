<template>
  <div class="container">
    <div class="row">
      <!-- Event Count -->
      <div>
        <button @click="getEventCount">Get Event Count</button>
        <p v-if="eventCount !== null">Total number of events: {{ eventCount }}</p>
        <p v-if="eventError">{{ eventError }}</p>
      </div>

      <!-- User Count -->
      <div>
        <button @click="getUserCount">Get User Count</button>
        <p v-if="userCount !== null">Total number of users: {{ userCount }}</p>
        <p v-if="userError">{{ userError }}</p>
      </div>

      <!-- Booking Count -->
      <div>
        <button @click="getBookingCount">Get Booking Count</button>
        <p v-if="bookingCount !== null">Total number of bookings: {{ bookingCount }}</p>
        <p v-if="bookingError">{{ bookingError }}</p>
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
        <DataTable :value="searchEvents()" paginator :rows="10">
          <Column field="name" header="Event Name" sortable></Column>
          <Column field="date" header="Event Date" sortable></Column>
          <Column field="location" header="Event Location"></Column>
          <Column field="description" header="Event Description"></Column>
        </DataTable>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

// Event count variables
const eventCount = ref(null);
const eventError = ref(null);

// User count variables
const userCount = ref(null);
const userError = ref(null);

// Booking count variables
const bookingCount = ref(null);
const bookingError = ref(null);

// Fetch event count
const getEventCount = async () => {
  try {
    const response = await axios.get('https://countevents-sjnij7mjvq-uc.a.run.app');
    eventCount.value = response.data.count;
    eventError.value = null;
  } catch (err) {
    console.error('Error fetching event count:', err);
    eventError.value = err.message;
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
    userError.value = err.message;
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
    bookingError.value = err.message;
    bookingCount.value = null;
  }
};
</script>
