import React, { Component } from 'react'
import { StyleSheet, PixelRatio, View, Text } from 'react-native'
import { Router, Scene, Tabs } from 'react-native-router-flux'

import FarkList from '../modules/farkList/FarkList'
import FarkAdd from '../modules/farkAdd/FarkAdd'
import User from '../modules/user/User'

import Ionicons from 'react-native-vector-icons/Ionicons'

// const TabIcon = ({ selected, title, iconName }) => {
//   var color = selected ? '#00f240' : '#301c2a';
//   return (
//     <View style={{flex:1, flexDirection:'column', alignItems:'center', alignSelf:'center', justifyContent: 'center'}}>
//       <Ionicons style={{color: color}} name={iconName || "circle"} size={18}/>
//       <Text style={{color: color, fontSize: 12}}>{title}</Text>
//     </View>
//   );
// }

class TabIcon extends Component {
	render() {
		var color = this.props.selected ? '#00f240' : '#301c2a'
		console.log(this.props.iconName, 'this.props.iconName')
		return (
			<View style={{flex: 1, flexDirection: 'column', alignItems: 'center', alignSelf: 'center', justifyContent: 'center'}}>
				<Ionicons style={{color: color}} name={this.props.iconName} size={18}/>
				<Text style={{color: color, fontSize: 12}}>{this.props.title}</Text> 
			</View>
		)
	}
}

const App = () => {
	return (
		<Router>
			<Scene key="root">
				{/* <Scene key="tabbar" tabs={true} gestureEnabled={false} type='reset' hideNavBar tabBarStyle={{ backgroundColor: '#FFFFFF' }}>
           <Scene key="list" title={'List'} iconName="ios-list" icon={TabIcon}> 
            <Scene key="farkList" title={'FARK LIST'} component={FarkList} iconName="ios-list" icon={TabIcon}/>
          </Scene>
          <Scene key="add" title={'User'} iconName="ios-list" icon={TabIcon}>
            <Scene key="farkAdd" title={'FARK ADD'} component={FarkAdd}/>
          </Scene>
          <Scene key="user" title={'User'} iconName="ios-list" icon={TabIcon}>
            <Scene key="userpage" title={'USER'} component={User}/>
          </Scene>
        </Scene> */}
				<Tabs hideNavBar>
					<Scene key="list" title={'List'} iconName="ios-list" icon={TabIcon}> 
						<Scene key="farkList" title={'FARK LIST'} component={FarkList}/>
					</Scene>
					<Scene key="add" title={'Add'} initial>
						<Scene key="farkAdd" title={'FARK ADD'} component={FarkAdd}/>
					</Scene>
					<Scene key="user" title={'User'}>
						<Scene key="userpage" title={'USER'} component={User}/>
					</Scene>
				</Tabs>
			</Scene>
		</Router>
	)
}

export default App