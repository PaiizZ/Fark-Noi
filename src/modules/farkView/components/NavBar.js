import React, { Component } from 'react'
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import ActionSheet from 'react-native-actionsheet'

class NavBar extends Component {

	showActionSheet(index) {
		this.ActionSheet.show()
	}

	optionsSelect(index) {
		if (index === 0) {
			this.props.deleteFark()
			Actions.pop()
		} 
		// else if (index === 1) {
		//  this.props.deleteReview(this.props.review._id)
		// 	Actions.pop()
		// }
	}

	render () {
		const { titleName } = this.props
		return (
			<View style={styles.navBar} >
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}} >
					<View style={{ flex: 1, alignItems: 'center', flexDirection: 'row'}} >
						<TouchableOpacity 
							style={{ width: 50, alignItems: 'center', justifyContent: 'center'}} 
							onPress={() => { 
								Actions.pop()
							}}
						>
							<IconIonicons name='ios-arrow-back' size={30} color={'gray'} />
						</TouchableOpacity>
					</View>
					<View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
						<Text style={{ fontSize: 18, fontWeight: 'bold', color: 'gray' }}>{ titleName }</Text>
					</View>
					<View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
						{ this.props.currentUser.uid === this.props.creater.uid &&
						<TouchableOpacity 
							style={{ width: 50, alignItems: 'center', justifyContent: 'center'}} 
							onPress={() => this.showActionSheet()}
						>
							<IconIonicons name='md-more' size={30} color={'gray'} />
						</TouchableOpacity>
						}
					</View>
					<ActionSheet
						ref={o => this.ActionSheet = o}
						// options={['Edit', 'Delete', 'Cancel']}
						options={['Delete', 'Cancel']}
						cancelButtonIndex={1}
						destructiveButtonIndex={0}
						onPress={(index) => this.optionsSelect(index)}
					/>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	navBar: { 
		flex: 1,
		justifyContent: 'center', 
		flexDirection: 'row',
		zIndex: 1,
		backgroundColor: 'white',
		borderBottomColor: '#f1f1f1',
		borderBottomWidth: 2
		// shadowColor: '#808080',
		// shadowOffset: { width: 0, height: 5 },
		// shadowOpacity: 0.5
	}
})

export default NavBar