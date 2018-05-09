import constants from '../constants'
import { db } from '../../constant/firebase'

const FarkActions = {
	addFark: (fark) => async dispatch => {
		try {
			const farkRef = db.ref().child('/farks')
			await farkRef.push().set(fark)
			dispatch(FarkActions.getFarks())
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
			console.log(arrayData, 'arrayData')
			dispatch(actions.getFarksSuccess(arrayData.reverse()))
		} catch (error) {
			dispatch(actions.getFarksError())
		}
	},
	updateFark: (key, doer) => async dispatch => {
		try {
			const farkRef = db.ref().child(`/farks/${key}`)
			await farkRef.update({ doer })
			dispatch(FarkActions.getFarks())
		} catch (error) {
			console.log('update fark error')
		}
	},
	updateCheckBox: (key, orders) => async dispatch => {
		try {
			const farkRef = db.ref().child(`/farks/${key}`)
			await farkRef.update({ orders })
			dispatch(FarkActions.getFarks())
			dispatch(FarkActions.getCurrentFark(key))
		} catch (error) {
			console.log('update fark error')
		}
	},
	updateComment: (key, comments) => async dispatch => {
		try {
			const farkRef = db.ref().child(`/farks/${key}`)
			await farkRef.update({ comments })
			dispatch(FarkActions.getFarks())
			dispatch(FarkActions.getCurrentFark(key))
		} catch (error) {
			console.log('update fark error')
		}
	},
	deleteFark: (key) => async dispatch => {
		try {
			const farkRef = db.ref().child(`/farks/${key}`)
			await farkRef.remove()
			dispatch(FarkActions.getFarks())
		} catch (error) {
			console.log('update fark error')
		}
	},
	doneFark: (key) => async dispatch => {
		try {
			const farkRef = db.ref().child(`/farks/${key}`)
			await farkRef.update({ isDone: true })
			dispatch(FarkActions.getFarks())
		} catch (error) {
			console.log('update fark error')
		}
	},
	setCurrentFark: fark => ({
		type: constants.SET_CURRENT_FARK,
		payload: fark
	}),
	getCurrentFark: (key) => async dispatch => {
		dispatch(actions.getFarkRequest())
		try {
			const data = await db.ref(`farks/${key}`).once('value')
			const objData = { ...data.val(), key }
			dispatch(actions.getFarkSuccess(objData))
		} catch (error) {
			dispatch(actions.getFarkError())
		}
	}
}

const actions = {
	getFarksRequest: () => ({
		type: constants.GET_FARKS_REQUEST
	}),
	getFarksSuccess: response => ({
		type: constants.GET_FARKS_SUCCESS,
		payload: response
	}),
	getFarksError: error => ({
		type: constants.GET_FARKS_FAILURE,
		payload: error
	}),
	getFarkRequest: () => ({
		type: constants.GET_FARK_REQUEST
	}),
	getFarkSuccess: response => ({
		type: constants.GET_FARK_SUCCESS,
		payload: response
	}),
	getFarkError: error => ({
		type: constants.GET_FARK_FAILURE,
		payload: error
	})
}

export default FarkActions