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
	}
	// getFarks: () => async dispatch => {
	// 	dispatch(actions.getRestaurantsRequest())
	// 	try {
	// 		const data = await db.ref('restaurants').once('value')
	// 		var arrayData = []
	// 		data.forEach((element) => {
	// 			arrayData.push({ ...element.val(), key: element.key })
	// 		})
	// 		dispatch(actions.getRestaurantsSuccess(arrayData))
	// 	} catch (error) {
	// 		dispatch(actions.getRestaurantsError())
	// 	}

	// },
	// setCurrentUser: user => ({
	// 	type: constants.SET_CURRENT_USER,
	// 	payload: user
	// })
}

const actions = {
	// getRestaurantsRequest: () => ({
	// 	type: constants.GET_RESTAURANTS_REQUEST
	// }),
	// getRestaurantsSuccess: response => ({
	// 	type: constants.GET_RESTAURANTS_SUCCESS,
	// 	payload: response
	// }),
	// getRestaurantsError: error => ({
	// 	type: constants.GET_RESTAURANTS_FAILURE,
	// 	payload: error
	// })
}

export default FarkActions