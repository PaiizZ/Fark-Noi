import constants from '../constants'
import { Actions } from 'react-native-router-flux'
import firebase from 'firebase'
import { auth, db } from '../../constant/firebase'

const UserActions = {
	loginWithFacebook: token => async dispatch => {
		dispatch(actions.loginFacebookRequest())
		const credential = firebase.auth.FacebookAuthProvider.credential(token)
		try {
			const user = await auth.signInWithCredential(credential)
			const user_obj = {
				displayName: user.displayName,
				photoURL: user.photoURL
				// farkList: [],
				// farkJobs: []
			}
			db.ref(`/users/${user.uid}`).set(user_obj)
			dispatch(actions.loginFacebookSuccess())
			Actions.tabMenu()
		} catch (error) {
			dispatch(actions.loginFacebookError())
		}
	},
	signoutFacebook: () => async dispatch => {
		try {
			const result = await auth.signOut()
			console.log(result)
		} catch (error) {
			console.log('auth', error)
		}
	},
	setCurrentUser: user => ({
		type: constants.SET_CURRENT_USER,
		payload: user
	})
	
}

const actions = {
	loginFacebookRequest: () => ({
		type: constants.LOGIN_FACEBOOK_REQUEST
	}),
	loginFacebookSuccess: response => ({
		type: constants.LOGIN_FACEBOOK_SUCCESS,
		payload: response
	}),
	loginFacebookError: error => ({
		type: constants.LOGIN_FACEBOOK_FAILURE,
		payload: error
	})
}

export default UserActions