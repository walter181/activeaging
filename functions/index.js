const { onRequest } = require('firebase-functions/v2/https')
const admin = require('firebase-admin')
const cors = require('cors')({ origin: true })
const sgMail = require('@sendgrid/mail')

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

exports.sendemail = onRequest((req, res) => {
  // 在最开始处理 CORS
  cors(req, res, async () => {
    const { email } = req.body
    if (!email) {
      return res.status(400).send({ message: 'Email is required' })
    }
    console.log(email)
    try {
      const msg = {
        to: email,
        from: 'xtan0108@gmail.com',
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>'
      }

      await sgMail.send(msg)
      res.status(200).send({ message: 'Email sent successfully' })
    } catch (error) {
      console.error('Error sending email:', error.message)
      res.status(500).send('Error sending email')
    }
  })
})
