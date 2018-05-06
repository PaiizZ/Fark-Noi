import React, { Component } from 'react'
import { Text } from 'react-native';
import { Router, Scene } from 'react-native-router-flux'

import FarkList from '../modules/farkList/FarkList'
import FarkAdd from '../modules/farkAdd/FarkAdd'
import User from '../modules/user/User'

const TabIcon = ({ selected, title }) => {
  return (
    <Text style={{color: selected ? 'red' :'black'}}>{title}</Text>
  );
}

const App = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="tabbar" tabs={true} hideNavBar tabBarStyle={{ backgroundColor: '#FFFFFF' }}>
          <Scene key="list" title={'List'} icon={TabIcon}>
            <Scene key="farkList" title={'FARK LIST'} component={FarkList}/>
          </Scene>
          <Scene key="add" title={'User'} icon={TabIcon}>
            <Scene key="farkAdd" title={'FARK ADD'} component={FarkAdd}/>
          </Scene>
          <Scene key="user" title={'User'} icon={TabIcon}>
            <Scene key="userpage" title={'USER'} component={User}/>
          </Scene>
        </Scene>
      </Scene>
    </Router>
  )
}

export default App;