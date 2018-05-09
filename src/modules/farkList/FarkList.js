import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import NavBar from '../farkList/components/NavBar'
import farklist from '../../constant/farklist'
import { List, ListItem } from 'react-native-elements'
import CoverImage from '../shares/CoverImage'
import IconEntypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux'

class FarkList extends Component {

	replaceMarks(text) {
		const str = text.replace(/ุ|ู|ิ|ี|ึ|ื|่|้|๊|๋|ั|ํ|็/g, '')
		return str
	}

	render() {
		console.log(this.props.farks, 'farklist')
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<View style={styles.platformHeader}>
						<NavBar titleName="FRAK LIST" />
					</View>
				</View>
				<View style={styles.body}>
					<List containerStyle={{ borderColor: 'transparent' }}>
						{this.props.farks.map((fark, index) => {
							return (
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
															<Text style={styles.productDetailText}>{fark.deliver}</Text>
														</View>
													</View>
												</View>
											</View>
											{ fark.tipStatus &&(
												<View>
													<View style={styles.coin}>
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
	coin: {
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 0
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