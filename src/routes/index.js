import React from 'react'
import { Router, Scene, Stack } from 'react-native-router-flux'

import FarkList from '../modules/farkList/FarkList'
import FarkAdd from '../modules/farkAdd/FarkAdd'
import UserPage from '../modules/user/UserPage'
import LoginPage from '../modules/login/LoginPage'
import TabMenu from '../modules/shares/TabMenu'
import store from '../redux/store'
import { Provider } from 'react-redux'

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<Stack key="root">
					<Scene key="tabMenu" component={TabMenu} hideNavBar hideTabBar direction='vertical' initial/>
					<Scene key="farkList" component={FarkList} hideNavBar hideTabBar direction='vertical'/>
					<Scene key="farkAdd" component={FarkAdd} hideNavBar hideTabBar direction='vertical'/>
					<Scene key="userpage" component={UserPage} hideNavBar hideTabBar direction='vertical'/>
					<Scene key="loginpage" component={LoginPage} hideNavBar hideTabBar direction='vertical'/>
				</Stack>
			</Router>
		</Provider>
	)
}

export default App