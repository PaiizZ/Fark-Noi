import React, { Component } from 'react'
import { Platform, StyleSheet, ScrollView, Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import NavBar from '../farkView/components/NavBar'
import IconEntypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

class FarkView extends Component {
  
	render() {
		console.log(this.props.fark, 'xxx')
		const { title, shop, deliver, note, tip, tipStatus, creater, orders } = this.props.fark
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<View style={styles.platformHeader}>
						<NavBar titleName="FARK VIEW" />
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
					{
						orders.map((order, index) => { 
							return (
								<View key={index}>
									<Text style={styles.label}>   - {order.order}</Text>
									{/* <CheckBox
										title={order.order}
										checked={order.isDone}
										// onPress={() => this.setState({checked: !this.state.checked})}
									/> */}
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
				
					{ this.props.currentUser.uid !== creater.uid &&
						<View style={styles.blockSave}>
							<TouchableOpacity
								style={styles.buttonSave}
							// onPress={() => this.addFark()}
							>
								<Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FFF' }}>ACCEPT</Text>
							</TouchableOpacity>
						</View>
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
	blockSave: {
		flex: 1,
		position: 'absolute',
		bottom: 0,
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

})

export default connect(mapStateToProps, mapDispatchToProps)(FarkView)