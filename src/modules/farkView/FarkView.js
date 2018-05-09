import React, { Component } from 'react'
import { Platform, StyleSheet, ScrollView, Text, View, TextInput, Switch, TouchableOpacity } from 'react-native'
import IconMaterial from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import NavBar from '../farkView/components/NavBar'

class FarkView extends Component {

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<View style={styles.platformHeader}>
						<NavBar titleName="FARK VIEW" />
					</View>
				</View>
			
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	body: {
		marginTop: Platform.OS === 'ios' ? 75 : 60
	},
	platformHeader: {
		height: Platform.OS === 'ios' ? 75 : 60,
		paddingTop: Platform.OS === 'ios' ? 25 : 0
	},
	header: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0
	},
	label: {
		color: '#5C5C5C',
		fontSize: 15,
		marginLeft: 15,
		marginTop: 5,
		fontWeight: 'bold'
	},
	textBox: {
		height: 40,
		borderRadius: 3,
		justifyContent: 'center',
		backgroundColor: '#FFF',
		paddingHorizontal: 15,
		marginLeft: 15,
		marginRight: 15,
		marginTop: 10,
		marginBottom: 10,
		borderColor: '#dfdfdf',
		borderWidth: 1
	},
	textInput: {
		flex: 1,
		color: '#616670',
		fontSize: 15,
		height: 35,
		padding: 0
	},
	fontRed: {
		color: 'red'
	},
	buttonAddOrder: {
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 15,
		marginRight: 15,
		marginTop: 10,
		marginBottom: 10,
		backgroundColor: 'white',
		height: 35,
		borderRadius: 3,
		borderColor: '#dfdfdf',
		borderWidth: 1
	},
	containerSwitch: {
		marginTop: 10,
		// marginLeft: 15,
		marginRight: 15,
		marginBottom: 5
	},
	switch: {
		marginLeft: 24,
		width: 51,
		height: 31,
		borderRadius: 25
	},
	bodyTextInput: {
		marginTop: 10,
		marginLeft: 15,
		marginRight: 15,
		padding: 10,
		borderColor: '#dfdfdf',
		borderWidth: 1
	},
	textInputLabel: {
		fontSize: 15,
		color: '#616670',
		minHeight: 100,
		padding: 0
	},
	buttonSave: {
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		backgroundColor: 'blue',
		height: 50,
		borderRadius: 3,
		zIndex: 2
	},
	blockSave: {
		marginTop: 10,
		marginLeft: 10,
		marginRight: 10,
		borderTopColor: '#f1f1f1',
		borderTopWidth: 1,
		shadowColor: '#808080',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.5,
		padding: 5
	}
})

const mapStateToProps = state => ({
	currentUser: state.userReducer.currentUser
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(FarkView)