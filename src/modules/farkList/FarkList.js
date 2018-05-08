import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import NavBar from '../farkList/components/NavBar'
export default class FarkList extends Component {
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<View style={styles.platformHeader}>
						<NavBar titleName="FRAK LIST" />
					</View>
				</View>
				<View style={styles.body}>
					<Text>Welcome to FarkList!</Text>
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
	}
})
