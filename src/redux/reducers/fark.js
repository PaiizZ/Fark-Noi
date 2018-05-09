import constants from '../constants'

const initialState = {
	farks: [],
	fark: null,
	loading: false,
	error: null
}

export default (state = initialState, action) => {
	switch (action.type) {
    
	case constants.GET_FARKS_REQUEST:
		return {
			...state,
			loading: true
		}
        
	case constants.GET_FARKS_SUCCESS:
		return {
			...state,
			farks: action.payload
		}
        
	case constants.GET_FARKS_FAILURE:
		return {
			...state,
			error: action.payload
		}

	case constants.GET_FARK_REQUEST:
		console.log(action.payload, 'fark')
		return {
			...state,
			loading: true
		}
        
	case constants.GET_FARK_SUCCESS:
		return {
			...state,
			fark: action.payload
		}
        
	case constants.GET_FARK_FAILURE:
		return {
			...state,
			error: action.payload
		}

	case constants.SET_CURRENT_FARK:
		console.log(action.payload, 'fark')
		return {
			...state,
			fark: action.payload
		}

	default:
		return state
	}
}