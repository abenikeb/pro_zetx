
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js'
)
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js'
)
firebase.initializeApp({"apiKey":"AIzaSyCb763LTfBgULXlSBBhk5bDJEP6kVuX9ss","authDomain":"greencheddar-9525f.firebaseapp.com","projectId":"greencheddar-9525f","storageBucket":"greencheddar-9525f.appspot.com","messagingSenderId":"624325909257","appId":"1:624325909257:web:41f01d1c69784aad4ed1d8","measurementId":"G-LTDTG5LYWT"})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

// Setup event listeners for actions provided in the config:
self.addEventListener('notificationclick', function(e) {
  const actions = [{"action":"measure","url":"www.greencheddar.org\u002Fdashboard\u002Fmeasure"}]
  const action = actions.find(x => x.action === e.action)
  const notification = e.notification

  if (!action) return

  if (action.url) {
    clients.openWindow(action.url)
    notification.close()
  }
})
