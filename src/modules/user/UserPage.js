import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import { List, ListItem, Divider } from 'react-native-elements'
// import Tabs from '../shares/Tabs'
import { Actions } from 'react-native-router-flux'
import { LoginManager } from 'react-native-fbsdk'
import CoverImage from '../shares/CoverImage'
import IconEntypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import UserActions from '../../redux/actions/user'
import FarkActions from '../../redux/actions/fark'
import Tabs from '../shares/Tabs'

class UserPage extends Component {
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

	goToViewFarkPage(fark) {
		this.props.setCurrentFark(fark)
		Actions.farkView()
	}

	render() {
		console.log(this.props.currentUser, 'currentUser')
		if (!this.props.currentUser || !this.props.farks) {
			return <View/>
		}
		return (
			<View style={styles.container}>
				<View style={styles.body}>
					<TouchableOpacity style={[styles.settingIconContainer, { right: 10 }]}>
						<FontAwesome
							name="power-off"
							size={25}
							color='red'
							onPress={() => this.logout()}
						/>
					</TouchableOpacity>
					<View style={{justifyContent: 'center', alignItems: 'center'}}>
						<CoverImage size={120} uri={`${this.props.currentUser.photoURL}`+'/picture?height=300'} />
						<View style={styles.usernameContainer}>
							<Text style={styles.usernameText}>{this.props.currentUser.displayName}</Text>
						</View>
					</View>

					<View style={{ alignItems: 'center' }}>
						<Divider style={styles.divider} />
					</View>
					
					<View style={styles.tabsContainer}>
						<Tabs>
							<View title="FARK LIST">
								<List containerStyle={{ marginTop: 0, borderColor: 'transparent' }}>
									{this.props.farks.map((fark, index) => {
										return (
											this.props.currentUser.uid === fark.creater.uid && (
												<ListItem
													avatar={
														<CoverImage size={80} uri={`${fark.creater.photoURL}`+'/picture?height=300'} />
													}
													containerStyle={{ borderBottomColor: 'transparent' }}
													key={index}
													title={fark.title}
													titleStyle={{ fontWeight: 'bold', color: 'gray', marginLeft: 15 }}
													titleNumberOfLines={1}
													subtitle={
														<View style={{ flexDirection: 'row', marginLeft: 15 }}>
															<View style={{ }}>
																<View style={styles.shopIcon}>
																	<IconEntypo name="shop" color={'gray'} size={26} />
																	<Text style={styles.productDetailText}>{fark.shop}</Text>
																</View>
																<View style={styles.sentIcon}>
																	<MaterialCommunityIcons name="cube-send" color={'gray'} size={35} />
																	<Text style={styles.productDetailText}>{fark.deliver}</Text>
																</View>
															</View>
															{ fark.tipStatus &&(
																<View style={{ flex: 1}}>
																	<View style={styles.coin}>
																		<MaterialCommunityIcons name="coin" color={'#FFB61E'} size={50} />
																	</View>
																</View>)
															}
														</View>
													}
													hideChevron={true}
													onPress={() => this.goToViewFarkPage(fark) }
												/>
											)
										)
									})
									}
								</List> 
							</View>
							<View title="FARK JOB">
								<List containerStyle={{ marginTop: 0, borderColor: 'transparent' }}>
									{this.props.farks.map((fark, index) => {
										return (
											fark.doer && (this.props.currentUser.uid === fark.doer.uid) && (
												<ListItem
													avatar={
														<CoverImage size={80} uri={`${fark.creater.photoURL}`+'/picture?height=300'} />
													}
													containerStyle={{ borderBottomColor: 'transparent' }}
													key={index}
													title={fark.title}
													titleStyle={{ fontWeight: 'bold', color: 'gray', marginLeft: 15 }}
													titleNumberOfLines={1}
													subtitle={
														<View style={{ flexDirection: 'row', marginLeft: 15 }}>
															<View style={{ }}>
																<View style={styles.shopIcon}>
																	<IconEntypo name="shop" color={'gray'} size={26} />
																	<Text style={styles.productDetailText}>{fark.shop}</Text>
																</View>
																<View style={styles.sentIcon}>
																	<MaterialCommunityIcons name="cube-send" color={'gray'} size={35} />
																	<Text style={styles.productDetailText}>{fark.deliver}</Text>
																</View>
															</View>
															{ fark.tipStatus &&(
																<View style={{ flex: 1}}>
																	<View style={styles.coin}>
																		<MaterialCommunityIcons name="coin" color={'#FFB61E'} size={50} />
																	</View>
																</View>)
															}
														</View>
													}
													hideChevron={true}
													onPress={() => this.goToViewFarkPage(fark) }
												/>
											)
										)
									})
									}
								</List>
							</View>
						</Tabs>
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
		marginTop: Platform.OS === 'ios' ? 25 : 0
	},
	usernameText: {
		fontSize: 18,
		fontWeight: 'bold',
		color: 'gray'
	},
	settingIconContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end'
	},
	divider: {
		backgroundColor: 'lightgray',
		marginTop: 15,
		height: 1.2,
		width: '100%'
	},
	tabsContainer: {
		marginTop: 20,
		paddingLeft: 5,
		paddingRight: 5
	},
	shopIcon: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 5
	},
	sentIcon: {
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: -10
	},
	productDetailText: {
		color: 'gray',
		marginLeft: 5
	},
	coin: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'flex-end'
	}
})

const mapStateToProps = state => ({
	currentUser: state.userReducer.currentUser,
	farks: state.farkReducer.farks
})

const mapDispatchToProps = dispatch => ({
	signoutFacebook: () => {
		dispatch(UserActions.signoutFacebook())
	},
	setCurrentFark: fark => {
		dispatch(FarkActions.setCurrentFark(fark))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)