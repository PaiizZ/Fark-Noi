import firebase from 'firebase'

var config = {
	apiKey: 'AIzaSyBfsn7yQ7fjGjvwERQwh_o0L5r0ak_tDZk',
	authDomain: 'farknoi-1726b.firebaseapp.com',
	databaseURL: 'https://farknoi-1726b.firebaseio.com',
	projectId: 'farknoi-1726b',
	storageBucket: 'farknoi-1726b.appspot.com',
	messagingSenderId: '1061945413386'
}
firebase.initializeApp(config)

export const db = firebase.database()
export const auth = firebase.auth()