import constants from '../constants'

const initialState = {
	farks: [],
	loading: false,
	error: null
}

export default (state = initialState, action) => {
	switch (action.type) {
    
	case constants.GET_FARK_REQUEST:
		return {
			...state,
			loading: true
		}
        
	case constants.GET_FARK_SUCCESS:
		return {
			...state,
			farks: action.payload
		}
        
	case constants.GET_FARK_FAILURE:
		return {
			...state,
			error: action.payload
		}

	default:
		return state
	}
}