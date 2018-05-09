import { List, ListItem } from 'react-native-elements'
import React, { Component } from 'react'
import {
	Platform,
	StyleSheet,
	Text,
	View,
	Alert
} from 'react-native'
import { LoginManager } from 'react-native-fbsdk'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import NavBar from '../../shares/NavBar'
import UserActions from '../../../redux/actions/user'

class SettingPage extends Component {
	constructor (props) {
		super(props)
	}

	logout() {
		Alert.alert(
			'Logout',
			'Are you sure ?',
			[
				{text: 'Cancel', style: 'cancel'},
				{text: 'OK', onPress: () => {
					LoginManager.logOut()
					this.props.signoutFacebook()
					Actions.loginPage()
				}}
			]
		)
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<View style={styles.platformHeader}>
						<NavBar titleName='Settings' />
					</View>
				</View>
				<List>
					<ListItem
						title={<Text style={styles.itemText}>Change Profile Status</Text>}
						// onPress={ () => Actions.changeStatusPage() }
					/>
				</List>
				<List>
					<ListItem
						title={<Text style={styles.logoutText}>Logout</Text>}
						onPress={ () => this.logout() }
					/>
				</List>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'lightgray'
	},
	platformHeader: {
		height: Platform.OS === 'ios' ? 75 : 60,
		paddingTop: Platform.OS === 'ios' ? 25 : 0
	},
	header: {
		backgroundColor: 'white',
		overflow: 'hidden'
	},
	itemText: {
		color: 'gray',
		fontSize: 16
	},
	logoutText: {
		color: 'gray',
		fontSize: 16
	}
})

const mapDispatchToProps = dispatch => ({
	signoutFacebook: () => {
		dispatch(UserActions.signoutFacebook())
	}
})

export default connect(null, mapDispatchToProps)(SettingPage)