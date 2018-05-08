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
				<Scene key="tabMenu" component={TabMenu} hideNavBar={1} type="reset" hideTabBar={1} direction='vertical' initial/>
				<Scene key="farkList" component={FarkList} hideNavBar={1} type="reset" hideTabBar={1} direction='vertical'/>
				<Scene key="farkAdd" component={FarkAdd} hideNavBar={1} type="reset" hideTabBar={1} direction='vertical'/>
				<Scene key="userpage" component={User} hideNavBar={1} type="reset" hideTabBar={1} direction='vertical'/>
			</Stack>
		</Router>
	)
}

export default App