import React from 'react'
import { Router, Scene, Stack } from 'react-native-router-flux'

import FarkList from '../modules/farkList/FarkList'
import FarkAdd from '../modules/farkAdd/FarkAdd'
import User from '../modules/user/User'
import TabMenu from '../modules/shares/TabMenu'

const App = () => {
	return (
		<Router>
			<Stack key="root">
				<Scene key="tabMenu" component={TabMenu} hideNavBar hideTabBar direction='vertical' initial/>
				<Scene key="farkList" component={FarkList} hideNavBar hideTabBar direction='vertical'/>
				<Scene key="farkAdd" component={FarkAdd} hideNavBar hideTabBar direction='vertical'/>
				<Scene key="userpage" component={User} hideNavBar hideTabBar direction='vertical'/>
			</Stack>
		</Router>
	)
}

export default App