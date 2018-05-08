import React from 'react'
import { Router, Scene, Stack } from 'react-native-router-flux'

import FarkList from '../modules/farkList/FarkList'
import FarkAdd from '../modules/farkAdd/FarkAdd'
import UserPage from '../modules/user/UserPage'
import LoginPage from '../modules/login/LoginPage'
import SettingPage from '../modules/user/components/SettingPage'
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
					<Scene key="userPage" component={UserPage} hideNavBar hideTabBar direction='vertical'/>
					<Scene key="loginPage" component={LoginPage} hideNavBar hideTabBar direction='vertical'/>
					<Scene key="settingPage" component={SettingPage} hideNavBar hideTabBar direction='vertical'/>
				</Stack>
			</Router>
		</Provider>
	)
}

export default App