import React, {Component} from 'react'
import { Router, Scene } from 'react-native-router-flux'
import FarkList from '../modules/farkList/FarkList'
import FarkAdd from '../modules/farkAdd/FarkAdd'

const App = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="farkList" component={FarkList} hideNavBar={1} panHandlers={null} hideTabBar={1} direction='vertical' initial/>
        <Scene key="farkAdd" component={FarkAdd} hideNavBar={1} panHandlers={null} hideTabBar={1} direction='vertical'/>
      </Scene>
    </Router>
  )
}

export default App;