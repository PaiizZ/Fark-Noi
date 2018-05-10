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
					<View style={{ flex: 5, alignItems: 'flex-end', justifyContent: 'center' }}>
						<Text style={{ fontSize: 18, fontWeight: 'bold', color: 'gray' }}>{ titleName }</Text>
					</View>
					<View style={{ flex: 3, alignItems: 'flex-end', justifyContent: 'center'}}>
						<TouchableOpacity 
							style={{ width: 50, alignItems: 'center', justifyContent: 'center'}} 
							onPress={() => { Actions.farkAdd() }}
						>
							<IconEntypo name='plus' size={30} color={'#388BFC'} />
						</TouchableOpacity>
					</View>
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