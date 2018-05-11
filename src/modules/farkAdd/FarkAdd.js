import React, { Component } from 'react'
import { Platform, StyleSheet, ScrollView, Text, View, TextInput, Switch, TouchableOpacity } from 'react-native'
import NavBar from '../shares/NavBar'
import IconMaterial from 'react-native-vector-icons/MaterialIcons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux'
import FarkActions from '../../redux/actions/fark'
import { Actions } from 'react-native-router-flux'
import validate from '../../services/validate'
import Toast from 'react-native-simple-toast'
import { CheckBox } from 'react-native-elements'
import Modal from 'react-native-modal'

class FarkAdd extends Component {
	constructor(props) {
		super(props)
		this.state = {
			title: '',
			shop: '',
			deliver: '',
			receive: '',
			send: '',
			orders: [''],
			ordersName: [],
			tipStatus: false,
			tip: 0,
			note: '',
			farkTypeDisplay: 'Buy something',
			isFilterModalVisible: false,
			farkType: [{name: 'Buy something', selected: true}, {name: 'Sent something', selected: false}]

		}
	}
  
	handleChangeOrders(property, text) {
		const ordersName = this.state.ordersName
		ordersName[property] = text
		this.setState({ ordersName })
	}
  
	toggleButton(value) {
		this.setState({ tipStatus: value })
	}
  
	addOrdersBox() {
		const orders = this.state.orders
		orders.push({ order: '' })
		this.setState({ orders })
	}

	addFark() {
		if (this.state.farkTypeDisplay === 'Buy something') {
			const titleErr = validate(['title'], [this.state.title])
			const shopErr = validate(['shop'], [this.state.shop])
			const deliverErr = validate(['deliver'], [this.state.deliver])
			const orderErr = validate(['orders'], [this.state.ordersName])

			if (!titleErr && !shopErr && !deliverErr && !orderErr) {
				const ordersName = this.state.ordersName
				for (let i=0 ; i < ordersName.length ; i++) {
					if (ordersName[i] === undefined || ordersName[i].trim().length < 1) { 
						ordersName.splice(i, 1)
						i--
					}
				}
				const orders = []
				ordersName.forEach(element => {
					orders.push({order: element, isDone: false})
				})

				const fark = {
					title: this.state.title,
					type: this.state.farkTypeDisplay,
					shop: this.state.shop,
					deliver: this.state.deliver,
					orders: orders,
					creater: this.props.currentUser,
					isDone: false,
					tipStatus: this.state.tipStatus,
					tip: this.state.tip,
					note: this.state.note
				}

				this.props.addFark(fark)
				Actions.pop()

			} else {
				Toast.show('Please fill all request infomation', Toast.LONG)
			}
		} else {
			const titleErr = validate(['title'], [this.state.title])
			const locationErr = validate(['location'], [this.state.location])
			const detailErr = validate(['detail'], [this.state.detail])

			if (!titleErr && !locationErr && !detailErr) {
				const fark = {
					title: this.state.title,
					type: this.state.farkTypeDisplay,
					receive: this.state.receive,
					send: this.state.send,
					creater: this.props.currentUser,
					isDone: false,
					tipStatus: this.state.tipStatus,
					tip: this.state.tip,
					note: this.state.note
				}

				this.props.addFark(fark)
				Actions.pop()

			} else {
				Toast.show('Please fill all request infomation', Toast.LONG)
			}
		}
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
		if (!this.props.currentUser) {
			return <View/>
		}
		return (
			// <KeyboardAwareScrollView
			// 	style={{ backgroundColor: 'white' }}
			// 	resetScrollToCoords={{ x: 0, y: 0 }}
			// 	scrollEnabled={true}
			// >
			<View style={styles.container}>
				<View style={styles.header}>
					<View style={styles.platformHeader}>
						<NavBar titleName="FARK ADD" />
					</View>
				</View>

				<ScrollView
					showsVerticalScrollIndicator={false}
					scrollEventThrottle={16}
					bounces={false}
					style={styles.body}
				>
					<Text style={styles.label}>
							Title
						<Text style={styles.fontRed}> *</Text>
					</Text>
					<View style={styles.textBox}>
						<TextInput
							style={styles.textInput}
							value={this.state.title}
							underlineColorAndroid="transparent"
							onChangeText={value => this.setState({ title: value })}
							keyboardType="default"
						/>
					</View>

					<Text style={styles.label}>Type of FARK</Text>
					<TouchableOpacity style={styles.textBox} 	onPress={() => { this.handleFilterModal(true) }}>
						<Text style={[styles.textInput, {marginTop: 10}]}>{this.state.farkTypeDisplay}</Text>
						<Modal isVisible={this.state.isFilterModalVisible}>{this.renderModal()}</Modal>
					</TouchableOpacity>

					{ this.state.farkTypeDisplay === 'Buy something' && (
						<View>
							<Text style={styles.label}>
							Shop from
								<Text style={styles.fontRed}> *</Text>
							</Text>
							<View style={styles.textBox}>
								<TextInput
									style={styles.textInput}
									value={this.state.shop}
									underlineColorAndroid="transparent"
									onChangeText={value => this.setState({ shop: value })}
									keyboardType="default"
								/>
							</View>
						
							<Text style={styles.label}>
						Deliver to
								<Text style={styles.fontRed}> *</Text>
							</Text>
							<View style={styles.textBox}>
								<TextInput
									style={styles.textInput}
									value={this.state.deliver}
									underlineColorAndroid="transparent"
									onChangeText={value => this.setState({ deliver: value })}
									keyboardType="default"
								/>
							</View>

							<Text style={styles.label}>Order List
								<Text style={styles.fontRed}> *</Text>
							</Text>
							{this.state.orders.map((item, key) => (
								<View key={key}>
									<View style={[styles.textBox, { marginBottom: 0 }]}>
										<TextInput
											style={styles.textInput}
											value={this.state.orders[key]}
											underlineColorAndroid="transparent"
											onChangeText={text => this.handleChangeOrders(key, text)}
											keyboardType="default"
										/>
									</View>
									{this.state.orders.length - 1 === key && (
										<TouchableOpacity
											style={styles.buttonAddOrder}
											onPress={() => this.addOrdersBox()}
										>
											<IconMaterial name="add-circle" size={20} />
										</TouchableOpacity>
									)}
								</View>
							))}
						</View>
					)}
					
					{ this.state.farkTypeDisplay === 'Sent something' && (
						<View>
							<Text style={styles.label}>
							Receive Location
								<Text style={styles.fontRed}> *</Text>
							</Text>
							<View style={styles.textBox}>
								<TextInput
									style={styles.textInput}
									value={this.state.receive}
									underlineColorAndroid="transparent"
									onChangeText={value => this.setState({ receive: value })}
									keyboardType="default"
								/>
							</View>

							<Text style={styles.label}>
							Sent Location
								<Text style={styles.fontRed}> *</Text>
							</Text>
							<View style={styles.textBox}>
								<TextInput
									style={styles.textInput}
									value={this.state.send}
									underlineColorAndroid="transparent"
									onChangeText={value => this.setState({ send: value })}
									keyboardType="default"
								/>
							</View>
						</View>
					)}

					<View style={styles.containerSwitch}>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text style={[{ flex: 1}, styles.label]}>Tip</Text>
							<View style={styles.switch}>
								<Switch onValueChange={value => this.toggleButton(value)} value={this.state.tipStatus}/>
							</View>
						</View>
					</View>

					{ this.state.tipStatus &&
								<View style={{ flexDirection: 'row', alignItems: 'center' }}>
									<View style={[styles.textBox, { flex: 1 }]}>
										<TextInput
											style={styles.textInput}
											value={this.state.tip}
											underlineColorAndroid="transparent"
											onChangeText={text => this.setState({tip: text})}
											keyboardType="default"
										/>
									</View>
									<Text style={[styles.label, { width: 50, alignItems: 'center', justifyContent: 'center', marginLeft: 0 }]}>Baht</Text>
								</View>
					}

					<View>
						<Text style={styles.label}>Note</Text>
						<View style={styles.bodyTextInput}>
							<TextInput
								style={styles.textInputLabel}
								multiline
								maxHeight={300}
								underlineColorAndroid="transparent"
								onChangeText={value => this.setState({ note: value})}
								value={this.state.note}
								keyboardType="default"
							/>
						</View>
					</View>

				
					<View style={styles.blockSave}>
						<TouchableOpacity
							style={styles.buttonSave}
							onPress={() => this.addFark()}
						>
							<Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FFF' }}>ADD</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
			// </KeyboardAwareScrollView> 
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
		backgroundColor: '#388BFC',
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
	currentUser: state.userReducer.currentUser
})

const mapDispatchToProps = dispatch => ({
	addFark: fark => {
		dispatch(FarkActions.addFark(fark))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(FarkAdd)