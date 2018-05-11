import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, ScrollView, RefreshControl, TouchableOpacity } from 'react-native'
import NavBar from '../farkList/components/NavBar'
import { List, ListItem } from 'react-native-elements'
import CoverImage from '../shares/CoverImage'
import IconEntypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import FarkActions from '../../redux/actions/fark'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import Modal from 'react-native-modal'
import { CheckBox } from 'react-native-elements'

class FarkList extends Component {

	constructor (props) {
		super(props)
		this.state = {
			farkTypeDisplay: 'All Type',
			isFilterModalVisible: false,
			farkType: [{name: 'All Type', selected: false}, {name: 'Buy something', selected: false}, {name: 'Sent something', selected: false}]
		}
	}
	
	replaceMarks(text) {
		const str = text.replace(/ุ|ู|ิ|ี|ึ|ื|่|้|๊|๋|ั|ํ|็/g, '')
		return str
	}

	goToViewFarkPage(fark) {
		this.props.getCurrentFark(fark.key)
		Actions.farkView()
	}

	handleFilterModal (bool) {
		this.setState({ isFilterModalVisible: bool })
	}

	selectFarkType (index) {
		const farkType = this.state.farkType.map((item, key) => (key === index ? { ...item, selected: true } : { ...item, selected: false }))
		this.setState({ farkType })
	}

	chooseFarkType() {
		const farkType = this.state.farkType.find(item => item.selected === true)
		this.setState({ farkTypeDisplay: farkType.name })
		this.handleFilterModal(false)
	}

	renderModal () {
		return (
			<View style={styles.modal}>
				<View style={styles.modalHeader}>
					<Text style={styles.modalTitle}>Choose type of FARK</Text>
				</View>
				{this.state.farkType.map((item, index) => (
					<CheckBox
						key={index}
						title={item.name}
						checkedIcon='dot-circle-o'
						uncheckedIcon='circle-o'
						checkedColor='#00a9ff'
						uncheckedColor='#808080'
						checked={item.selected}
						containerStyle={{ backgroundColor: 'transparent', marginLeft: 0, marginRight: 0, borderWidth: 0 }}
						textStyle={styles.textDropdown}
						onPress={() => this.selectFarkType(index)}
					/>
				))}
				<View style={styles.modalFooter}>
					<TouchableOpacity style={styles.modalButton} onPress={() => this.handleFilterModal(false)}>
						<Text style={styles.modalTextBtn}>ยกเลิก</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.modalButton} onPress={() => this.chooseFarkType()}>
						<Text style={styles.modalTextBtn}>ตกลง</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}

	render() {
		console.log(this.props.farks, 'this.props.farks')
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
				<ScrollView
					refreshControl={
						<RefreshControl
							refreshing={this.props.loading}
							onRefresh={() => this.props.getFarks()}
						/>
					}
					style={styles.body}
				>
					<View style={styles.containerModal}>
						<View style={styles.leftSection}>
							<TouchableOpacity
								style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingLeft: 15, paddingRight: 15 }}
								onPress={() => {
									this.handleFilterModal(true)
								}}
							>
								<MaterialCommunityIcons
									name='filter-variant'
									size={40}
									color='gray'
									style={{ backgroundColor: 'transparent', marginRight: 15 }}
								/>
								<Text style={{ fontSize: 18, fontWeight: 'bold', color: 'gray'}}>{this.state.farkTypeDisplay}</Text>
								<View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transparent' }}>
									<IconIonicons 
										name='ios-arrow-forward' 
										size={30} 
										color={'gray'} 
									/>
								</View>
							</TouchableOpacity>
						</View>
						<Modal isVisible={this.state.isFilterModalVisible}>{this.renderModal()}</Modal>
					</View>
					<List containerStyle={{ marginTop: 0, borderColor: 'transparent' }}>
						{this.props.farks.map((fark, index) => {
							return (
								!fark.doer && (
									(fark.type === this.state.farkTypeDisplay || this.state.farkTypeDisplay === 'All Type') && (
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
													<View>
														{fark.type === 'Buy something' ?
															<View style={styles.shopIcon}>
																<IconEntypo name="shop" color={'gray'} size={26} />
																<Text style={styles.productDetailText}>{fark.shop}</Text>
															</View> :
															<View style={styles.shopIcon}>
																<IconEntypo name="location" color={'gray'} size={26} />
																<Text style={styles.productDetailText}>{fark.receive}</Text>
															</View>
														}
														<View style={styles.sentIcon}>
															<MaterialCommunityIcons name="cube-send" color={'gray'} size={35} />
															<Text style={styles.productDetailText}>{fark.type === 'Buy something' ? fark.deliver : fark.send}</Text>
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
							)
						})
						}
					</List>
				</ScrollView>
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
	},
	containerModal: {
		flexDirection: 'row',
		backgroundColor: '#FFF',
		borderBottomWidth: 1,
		borderBottomColor: '#f1f1f1'
	},
	leftSection: {
		flex: 1,
		flexDirection: 'row'
	},
	textDropdown: {
		color: '#212b36',
		fontSize: 15,
		paddingRight: 15
	},
	modal: {
		backgroundColor: 'white',
		padding: 15,
		borderRadius: 2,
		borderColor: 'rgba(0, 0, 0, 0.1)',
		flexDirection: 'column'
	},
	modalHeader: {
		height: 58,
		justifyContent: 'center'
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#000'
	},
	modalFooter: {
		height: 50,
		flexDirection: 'row',
		justifyContent: 'flex-end'
	},
	modalButton: {
		marginLeft: 10,
		width: 70,
		justifyContent: 'center',
		alignItems: 'center'
	},
	modalTextBtn: {
		color: '#00a9ff',
		fontSize: 15
	}
})

const mapStateToProps = state => ({
	currentUser: state.userReducer.currentUser,
	loading: state.farkReducer.loading,
	farks: state.farkReducer.farks
})

const mapDispatchToProps = dispatch => ({
	getCurrentFark: (key) => {
		dispatch(FarkActions.getCurrentFark(key))
	},
	getFarks: () => {
		dispatch(FarkActions.getFarks())
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(FarkList)