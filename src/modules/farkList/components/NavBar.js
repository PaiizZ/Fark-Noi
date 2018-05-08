import React, { Component } from 'react'
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native'

import { Actions } from 'react-native-router-flux'
import IconEntypo from 'react-native-vector-icons/Entypo'

class NavBar extends Component {
	render () {
		const { titleName } = this.props
		return (
			<View style={styles.navBar} >
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}} >
					<View style={{ flex: 1 }}>
						<Text style={{ fontSize: 18, fontWeight: 'bold', color: '#777' }}>{ titleName }</Text>
					</View>
					<TouchableOpacity 
						style={{ width: 50, alignItems: 'center', justifyContent: 'center'}} 
						onPress={() => { Actions.farkAdd() }}
					>
						<IconEntypo name='plus' size={30} color={'blue'} />
					</TouchableOpacity>
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
		borderBottomWidth: 3
		// shadowColor: '#808080',
		// shadowOffset: { width: 0, height: 5 },
		// shadowOpacity: 0.5
	}
})

export default NavBar