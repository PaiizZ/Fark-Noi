import React, { Component } from 'react'
import { Platform, StyleSheet, ScrollView, Alert, Text, View, TouchableOpacity } from 'react-native'
import { List, ListItem, Divider } from 'react-native-elements'
import { connect } from 'react-redux'
import NavBar from '../farkView/components/NavBar'
import IconEntypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FarkActions from '../../redux/actions/fark'
import { Actions } from 'react-native-router-flux'
import { CheckBox } from 'react-native-elements'
import AddCommentChat from '../farkView/components/AddCommentChat'
import CoverImage from '../shares/CoverImage'

class FarkView extends Component {
  
	constructor(props) {
		super(props)
		this.state = {
			orders: []
		}
	}
  
	acceptJob() {
		Alert.alert(
			'Accept Job',
			'You can’t cancel the “fark list”,\nif you have already confirmed it.',
			[
				{text: 'Cancel', style: 'cancel'},
				{text: 'OK', onPress: () => {
					this.props.updateFark(this.props.fark.key, this.props.currentUser)
					Actions.pop()
				}}
			]
		)
	}

	doneJob() {
		this.props.doneFark(this.props.fark.key)
		Actions.pop()
	}
  
	deleteFark() {
		this.props.deleteFark(this.props.fark.key)
	}
  
	checkBox(index) {
		console.log(index, 'index')
		const oOrders = this.props.fark.orders
		const orders = []
		for (let i = 0; i < oOrders.length; i++) {
			if (i === index) orders.push({isDone: !oOrders[i].isDone, order: oOrders[i].order})
			else orders.push({isDone: oOrders[i].isDone, order: oOrders[i].order})
		}
		console.log(orders, 'orders')
		this.props.updateCheckBox(this.props.fark.key, orders)
	}

	checkList() {
		let bool = true
		this.props.fark.orders.forEach(element => {
			if (!element.isDone) bool = false 
		})
		return bool 
	}
  
	render() {
		console.log(this.props.fark, 'xxx')
		console.log(comments, 'comments')
		if (!this.props.currentUser || !this.props.fark) {
			return <View/>
		}
		const { title, shop, deliver, note, tip, tipStatus, creater, doer, orders, isDone, comments } = this.props.fark
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<View style={styles.platformHeader}>
						<NavBar 
							titleName="FARK VIEW" 
							currentUser={this.props.currentUser} 
							creater={creater} 
							doer={doer}
							deleteFark={() => this.deleteFark()}
						/>
					</View>
				</View>
				<ScrollView
					showsVerticalScrollIndicator={false}
					scrollEventThrottle={16}
					bounces={false}
					style={styles.body}
				>
					<Text style={styles.title}>{title}</Text>
					<View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 15}}>
						<IconEntypo style={{ marginLeft: 15 }} name="shop" color={'gray'} size={26} />
						<Text style={styles.label}>Shop :</Text>
						<Text style={styles.label}>{shop}</Text>
					</View>
					<View style={{ flexDirection: 'row', flexWrap: 'wrap'}}>
						<MaterialCommunityIcons style={{ marginLeft: 5 }} name="cube-send" color={'gray'} size={35} />
						<Text style={styles.label}>Deliver :</Text>
						<Text style={styles.label}>{deliver}</Text>
					</View>

					<Text style={styles.title}>Order List</Text>
					{ orders.map((order, index) => { 
						return (
							!doer ? 
								<View key={index}>
									<Text style={styles.label}>   - {order.order}</Text>
								</View>:
								isDone ?
									<View key={index}>
										<View style={{ flexDirection: 'row'}}>
											<MaterialCommunityIcons style={{ marginLeft: 20 }} name="checkbox-marked" color={'#009933'} size={30} />
											<Text style={styles.label}>{order.order}</Text>
										</View>
									</View>:
									<View key={index}>
										<CheckBox
											title={order.order}
											checked={order.isDone}
											onPress={() => this.checkBox(index)}
										/>
									</View>
						) 
					})
					} 
          
					{ tipStatus &&(
						<View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 15}}>
							<Text style={styles.label}>Tip :</Text>
							<Text style={styles.label}>{tip}   Baht</Text>
						</View>
					)}
          
					{ note.length > 0 && (
						<View style= {{ marginTop: 15}}>
							<Text style={styles.label}>Note</Text>
							<Text style={[styles.label, { marginLeft: 30 }]}>{note}</Text>
						</View>
					)}
				
					

					{ doer && (
						<View>
							<Divider style={styles.divider} />

							<View>
								{ comments !== undefined ? (
									<View>
										{comments.map((comment, index) => {
											return (
												<View key={index} style={{ flexDirection: 'row', width: '95%'}}>
													<CoverImage size={70} uri={`${comment.user.photoURL}`+'/picture?height=300'} />
													<View style={styles.content}>
														<Text style={styles.username}>{comment.user.displayName}</Text>
														<Text style={styles.textLabel}>{comment.comment}</Text>
													</View>
												</View>
											)
										})}
									</View>) : 
									<View/>
								}
							</View>
							
							<View style={{ marginTop: 10 }}>
								<AddCommentChat 
									updateComment={(comments) => this.props.updateComment(this.props.fark.key, comments)}
								/>
							</View>
						</View>

					)}

					{ this.props.currentUser.uid !== creater.uid && !isDone &&(
						!doer ? 
							<View style={styles.blockSave}>
								<TouchableOpacity
									style={styles.buttonSave}
									onPress={() => this.acceptJob()}
								>
									<Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FFF' }}>ACCEPT</Text>
								</TouchableOpacity>
							</View>
							:
							this.checkList() ?
								<View style={styles.blockSave}>
									<TouchableOpacity
										style={styles.buttonSave}
										onPress={() => this.doneJob()}
									>
										<Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FFF' }}>DONE</Text>
									</TouchableOpacity>
								</View>:
								<View style={styles.blockSave}>
									<View style={styles.buttonGray}>
										<Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FFF' }}>DONE</Text>
									</View>
								</View>
					)
					}	
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
		flex: 1,
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
	title: {
		color: '#5C5C5C',
		fontSize: 20,
		marginLeft: 15,
		marginTop: 15,
		fontWeight: 'bold'
	},
	label: {
		color: '#5C5C5C',
		fontSize: 18,
		marginLeft: 15,
		marginTop: 5,
		fontWeight: 'bold'
	},
	buttonSave: {
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		backgroundColor: 'blue',
		height: 50,
		width: 345,
		borderRadius: 3,
		zIndex: 2
	},
	buttonGray: {
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		backgroundColor: 'lightgray',
		height: 50,
		width: 345,
		borderRadius: 3,
		zIndex: 2
	},
	blockSave: {
		flex: 1,
		// position: 'absolute',
		// bottom: 0,
		marginLeft: 10,
		marginRight: 10,
		borderTopColor: '#f1f1f1',
		borderTopWidth: 1,
		shadowColor: '#808080',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.5,
		padding: 5
	},
	content: {
		flex: 1,
		flexDirection: 'column',
		marginTop: 5,
		marginLeft: 5
	},
	username: {
		fontWeight: 'bold'
	},
	textLabel: {
		color: 'gray',
		fontSize: 15
	}
})

const mapStateToProps = state => ({
	currentUser: state.userReducer.currentUser,
	fark: state.farkReducer.fark
})

const mapDispatchToProps = dispatch => ({
	updateFark: (key, doer) => {
		dispatch(FarkActions.updateFark(key, doer))
	},
	deleteFark: (key) => {
		dispatch(FarkActions.deleteFark(key))
	},
	doneFark: (key) => {
		dispatch(FarkActions.doneFark(key))
	},
	updateCheckBox: (key, orders) => {
		dispatch(FarkActions.updateCheckBox(key, orders))
	},
	updateComment: (key, comments) => {
		dispatch(FarkActions.updateComment(key, comments))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(FarkView)