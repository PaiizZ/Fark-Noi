import constants from '../constants'
import { db } from '../../constant/firebase'

const FarkActions = {
	addFark: (fark) => async dispatch => {
		try {
			const farkRef = db.ref('/').child('farks')
			await farkRef.push().set(fark)
			// dispatch(FarkActions.getRestaurants())
		} catch (error) {
			console.log('add fark error')
		}
	},
	getFarks: () => async dispatch => {
		dispatch(actions.getFarksRequest())
		try {
			const data = await db.ref('farks').once('value')
			var arrayData = []
			data.forEach((element) => {
				arrayData.push({ ...element.val(), key: element.key })
			})
			dispatch(actions.getFarksSuccess(arrayData))
		} catch (error) {
			dispatch(actions.getFarksError())
		}

	}
	// setCurrentUser: user => ({
	// 	type: constants.SET_CURRENT_USER,
	// 	payload: user
	// })
}

const actions = {
	getFarksRequest: () => ({
		type: constants.GET_FARK_REQUEST
	}),
	getFarksSuccess: response => ({
		type: constants.GET_FARK_SUCCESS,
		payload: response
	}),
	getFarksError: error => ({
		type: constants.GET_FARK_FAILURE,
		payload: error
	})
}

export default FarkActions