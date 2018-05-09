import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import farklist from '../../constant/farklist'
import { List, ListItem, Divider } from 'react-native-elements'
// import Tabs from '../shares/Tabs'
import { Actions } from 'react-native-router-flux'
import CoverImage from '../shares/CoverImage'
import IconEntypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'

class UserPage extends Component {
	render() {
		console.log(this.props.currentUser, 'currentUser')
		if (!this.props.currentUser) {
			return <View/>
		}
		return (
			<View style={styles.container}>
				<View style={styles.body}>
					<TouchableOpacity style={[styles.settingIconContainer, { right: 10 }]}>
						<MaterialIcons
							name="settings"
							size={25}
							onPress={() => Actions.settingPage()}
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
	
					<List containerStyle={{ borderColor: 'transparent'}}>
						{farklist.farklist.map((fark, index) => {
							return (
								<ListItem
									avatar={
										<CoverImage size={80} url={fark.creater.pic_url} />
									}
									containerStyle={{ borderBottomColor: 'transparent' }}
									key={index}
									title={fark.title}
									titleStyle={{ fontWeight: 'bold', color: 'gray', marginLeft: 15 }}
									titleNumberOfLines={1}
									subtitle={
										<View style={{ flexDirection: 'row', marginLeft: 15, bottom: 0}}>
											<View>
												<Text></Text>
												<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
													<View style={{ flexDirection: 'row', marginRight: 15 }}>
														<View style={styles.productDetailLeft}>
															<IconEntypo name="shop" color={'gray'} size={26} />
															<Text style={styles.productDetailText}>{fark.shop}</Text>
														</View>
														<View style={styles.productDetailRight}>
															<MaterialCommunityIcons name="cube-send" color={'gray'} size={35} />
															<Text style={styles.productDetailText}>{fark.reciver}</Text>
														</View>
													</View>
												</View>
											</View>
											{ fark.tip_status &&(
												<View>
													<View style={styles.productDetailRight}>
														<MaterialCommunityIcons name="coin" color={'#FFB61E'} size={50} />
													</View>
												</View>)
											}
										</View>
									}
									hideChevron={true}
									// onPress={() => this.goToViewReviewPage(review)}
								/>
							)
						})
						}
					</List>
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
	productDetailLeft: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	productDetailRight: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 10
	},
	productDetailText: {
		color: 'gray',
		marginLeft: 5
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
		paddingLeft: 12,
		paddingRight: 12
	}
})

const mapStateToProps = state => ({
	currentUser: state.userReducer.currentUser
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)