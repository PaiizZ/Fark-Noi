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

class FarkAdd extends Component {
	constructor(props) {
		super(props)
		this.state = {
			title: '',
			shop: '',
			deliver: '',
			orders: [''],
			ordersName: [],
			tipStatus: false,
			tip: 0,
			note: ''
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
				shop: this.state.shop,
				deliver: this.state.deliver,
				orders: orders,
				creater: this.props.currentUser,
				doer: null,
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