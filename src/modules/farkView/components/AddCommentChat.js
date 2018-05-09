import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native'
import React, { Component } from 'react'
import CoverImage from '../../shares/CoverImage'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'


class AddCommentChat extends Component {
	constructor(props) {
		super(props)
		this.state = {
			comment: ''
		}
	}

	async addComment() {
		let comments = []
		if (this.props.fark.comments !== undefined) { 
			comments = this.props.fark.comments
		}
		comments.push({user: this.props.currentUser, comment: this.state.comment})
		await this.props.updateComment(comments)
		this.setState({comment: ''})
	}
  
	render() {
		const { photoURL, displayName } = this.props.currentUser
		if (!this.props.currentUser) {
			return <View/>
		}
		return (
			<View style={styles.container}>
				<CoverImage size={70} uri={`${photoURL}`+'/picture?height=300'} />
				<View style={styles.content}>
					<Text style={styles.username}>{displayName}</Text>
					<View style={{ flex: 1, flexDirection: 'row'}}>
						<View style={styles.bodyTextInput}>
							<TextInput
								style={styles.textInput}
								multiline
								maxHeight={300}
								underlineColorAndroid="transparent"
								onChangeText={comment => this.setState({ comment })}
								value={this.state.comment}
								keyboardType="default"
							/>
						</View>
						<TouchableOpacity style={styles.buttonSend} onPress={() => this.addComment()}>
							<IconIonicons name='md-send' size={25} color={'blue'}/>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		)
	}
}


const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		width: '95%'
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
	textInput: {
		fontSize: 15,
		color: 'gray',
		minHeight: 15,
		paddingTop: 0,
		paddingBottom: 0
	},
	bodyTextInput: {
		flex: 1,
		marginTop: 5,
		marginRight: 15,
		padding: 5,
		borderColor: '#dfdfdf',
		borderWidth: 1,
		borderRadius: 3
	},
	buttonSend: {
		alignItems: 'flex-end',
		flexDirection: 'row',
		marginBottom: 10,
		marginLeft: 10,
		right: 8
	}
})

const mapStateToProps = state => ({
	currentUser: state.userReducer.currentUser,
	fark: state.farkReducer.fark
})

export default connect(mapStateToProps, null)(AddCommentChat)
