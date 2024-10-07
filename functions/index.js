const { onRequest } = require('firebase-functions/v2/https')
const admin = require('firebase-admin')
const cors = require('cors')({ origin: true })

admin.initializeApp()

// Count events
exports.countEvents = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const eventsCollection = admin.firestore().collection('events')
      const snapshot = await eventsCollection.get()
      const count = snapshot.size

      res.status(200).send({ count })
    } catch (error) {
      console.error('Error counting events:', error.message)
      res.status(500).send('Error counting events')
    }
  })
})

// Count users
exports.countUsers = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const usersCollection = admin.firestore().collection('users')
      const snapshot = await usersCollection.get()
      const count = snapshot.size
      res.status(200).send({ count })
    } catch (error) {
      console.error('Error counting users:', error.message) // Updated error message
      res.status(500).send('Error counting users') // Updated error message
    }
  })
})

// Count bookings
exports.countBookings = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const bookingsCollection = admin.firestore().collection('bookings') // Updated to lowercase
      const snapshot = await bookingsCollection.get()
      const count = snapshot.size
      res.status(200).send({ count })
    } catch (error) {
      console.error('Error counting bookings:', error.message) // Updated error message
      res.status(500).send('Error counting bookings') // Updated error message
    }
  })
})
