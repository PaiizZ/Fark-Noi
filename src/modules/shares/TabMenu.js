import { Dimensions, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import FarkList from '../farkList/FarkList'
import UserPage from '../user/UserPage'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons'
import TabNavigator from 'react-native-tab-navigator'
import { Actions } from 'react-native-router-flux'
import { auth } from '../../constant/firebase'
import UserActions from '../../redux/actions/user'
import { connect } from 'react-redux'

const deviceWidth = Dimensions.get('window').width
const basePx = 375
 
export class TabMenu extends Component {
 
	constructor(props) {
		super(props)
		this.state = {
			selectedTab: 'home'
		}
	}
 
	componentDidMount() {
		console.disableYellowBox = true
		this.setCurrentUser()
	}

	setCurrentUser() {
		auth.onAuthStateChanged((user) => {
			if (user !== null) {
				const user_obj = {
					uid: user.uid,
					displayName: user.displayName,
					photoURL: user.photoURL 
				}
				this.props.setCurrentUser(user_obj)
			}
			else {
				Actions.loginpage()
			}
		})
	}

	px2dp(px) {
		return px * deviceWidth / basePx
	}
 
	render() {
		return (
			<TabNavigator style={styles.container}>
				<TabNavigator.Item
					selected={this.state.selectedTab === 'home'}
					selectedTitleStyle={{ color: 'blue' }}
					onPress={() => {
						this.setState({ selectedTab: 'home' })
					}}
					renderIcon={() => (
						<IconMaterialCommunity name="format-list-bulleted" size={this.px2dp(26)} color={'#777'} />
					)}
					renderSelectedIcon={() => (
						<IconMaterialCommunity name="format-list-bulleted" size={this.px2dp(26)} color={'blue'} />
					)}
				>
					<FarkList/>
				</TabNavigator.Item>
				<TabNavigator.Item
					selected={this.state.selectedTab === 'user'}
					selectedTitleStyle={{ color: 'blue' }}
					onPress={() => {
						this.setState({ selectedTab: 'user' })
					}}
					renderIcon={() => (
						<IconFontAwesome name="user" size={this.px2dp(22)} color={'#777'} />
					)}
					renderSelectedIcon={() => (
						<IconFontAwesome name="user" size={this.px2dp(22)} color={'blue'} />
					)}
				>
					<UserPage/>
				</TabNavigator.Item>
			</TabNavigator>
		)
	}
}
 
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white'
	}
})
 
const mapDispatchToProps = dispatch => ({
	setCurrentUser: user => {
		dispatch(UserActions.setCurrentUser(user))
	}
})

export default connect(null, mapDispatchToProps)(TabMenu)