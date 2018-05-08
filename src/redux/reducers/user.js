import constants from '../constants'

const initialState = {
	users: [],
	currentUser: null
}

export default (state = initialState, action) => {
	switch (action.type) {
	case constants.SET_CURRENT_USER:
		console.log(action.payload, 'user')
		return {
			...state,
			currentUser: action.payload
		}

	default :
		return state
	}
}