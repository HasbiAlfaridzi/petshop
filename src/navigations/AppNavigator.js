import * as React from 'react';
import {
  createStackNavigator,
  TransitionSpecs,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import DogListScreen from '../screens/doglistscreen/index';
import AuthLoading from '../screens/authloading/index';
import DogSubListScreen from '../screens/dogsublistscreen/index'
import DogSortListScreen from '../screens/dogsortlistscreen/index';
import DogSubSortListScreen from '../screens/dogsubsortlistscreen/index'

const Stack = createStackNavigator();

const MyTransition = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
};

export function AppStack() {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="AuthLoading">
      <Stack.Screen name="AuthLoading" component={AuthLoading} />
      <Stack.Screen name="DogListScreen" component={DogListScreen} />
      <Stack.Screen name="DogSubListScreen" component={DogSubListScreen} />
      <Stack.Screen name="DogSortListScreen" component={DogSortListScreen} />
      <Stack.Screen name="DogSubSortListScreen" component={DogSubSortListScreen} />
    </Stack.Navigator>
  );
}
