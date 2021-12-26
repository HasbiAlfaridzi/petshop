import React,{Component} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {Container, Root} from 'native-base';
import {Provider} from 'react-redux';
import {configureStore} from './store/store';
import {AppStack} from './navigations/AppNavigator';


export default class App extends Component{
   render(){
     return(
      <Provider store={configureStore()} >
        <Root>
          <NavigationContainer>
            <AppStack />
          </NavigationContainer>
        </Root>
      </Provider>
     )
   } 
}
