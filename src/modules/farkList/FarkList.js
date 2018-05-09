import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import NavBar from '../farkList/components/NavBar'
import { List, ListItem } from 'react-native-elements'
import CoverImage from '../shares/CoverImage'
import IconEntypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

class FarkList extends Component {

	replaceMarks(text) {
		const str = text.replace(/ุ|ู|ิ|ี|ึ|ื|่|้|๊|๋|ั|ํ|็/g, '')
		return str
	}

	render() {
		if (!this.props.currentUser || !this.props.farks) {
			return <View/>
		}
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<View style={styles.platformHeader}>
						<NavBar titleName="FARK LIST" />
					</View>
				</View>
				<View style={styles.body}>
					<List containerStyle={{ marginTop: 0, borderColor: 'transparent' }}>
						{this.props.farks.map((fark, index) => {
							return (
								!fark.doer && (
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
										onPress={() => { Actions.farkView({ fark }) }}
									/>
								)
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
	coin: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'flex-end'
	},
	productDetailText: {
		color: 'gray',
		marginLeft: 5
	}
})

const mapStateToProps = state => ({
	currentUser: state.userReducer.currentUser,
	farks: state.farkReducer.farks
})

const mapDispatchToProps = dispatch => ({
	
})

export default connect(mapStateToProps, mapDispatchToProps)(FarkList)