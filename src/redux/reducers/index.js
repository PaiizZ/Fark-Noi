import { combineReducers } from 'redux'
import userReducer from '../reducers/user'
import farkReducer from '../reducers/fark'

export default combineReducers({
	userReducer,
	farkReducer
})