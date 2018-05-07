import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text, View, TextInput, Switch, TouchableOpacity } from 'react-native'
import IconMaterial from 'react-native-vector-icons/MaterialIcons'

export default class FarkList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			title: '',
			location: '',
			orders: [''],
			switch: false,
			note: ''
		}
	}
  
	handleChangeOrders(property, text) {
		const orders = this.state.orders
		orders[property] = text
		this.setState({ orders })
	}
  
	toggleButton(value) {
		this.setState({ switch: value })
	}
  
	addOrdersBox() {
		const orders = this.state.orders
		orders.push({ tags: '' })
		this.setState({ orders })
	}

	render() {
		return (
			<View style={styles.container}>
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
              Receiving Location
						<Text style={styles.fontRed}> *</Text>
					</Text>
					<View style={styles.textBox}>
						<TextInput
							style={styles.textInput}
							value={this.state.location}
							underlineColorAndroid="transparent"
							onChangeText={value => this.setState({ location: value })}
							keyboardType="default"
						/>
					</View>

					<Text style={styles.label}>Order List</Text>
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
							<Text style={[{ flex: 1}, styles.label]}>Tips</Text>
							<View style={styles.switch}>
								<Switch onValueChange={value => this.toggleButton(value)} value={this.state.switch}/>
							</View>
						</View>
					</View>

					<Text style={styles.label}>Note</Text>
					<View style={styles.bodyTextInput}>
						<TextInput
							style={styles.textInputLabel}
							multiline
							maxHeight={300}
							underlineColorAndroid="transparent"
							onChangeText={value => this.state({ note: value})}
							value={this.state.note}
							keyboardType="default"
						/>
					</View>
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
		marginTop: 10
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
	}
})
