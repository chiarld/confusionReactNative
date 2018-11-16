import React, {Component} from 'react';
import {DISHES} from '../shared/dishes';
import Menu from './MenuComponent';
import { View, Platform } from "react-native";
import DishDetail from './DishDetailComponent';
import { createStackNavigator } from "react-navigation";

const MenuNavigator = createStackNavigator({
    Menu: { screen: Menu},
    DishDetail: {screen: DishDetail}
}, {
   initialRouteName: 'Menu',
   navigationOptions: {
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff', // iconse
        headerTitleStyle: {
            color: '#fff'
        }
   } // applies to all screens. 
});

class Main extends Component 
{
    render()
    {
        return(
            <View style={{flex: 1, paddingTop: Expo.Constants.statusBarHeight}}>
                <MenuNavigator/>
            </View>
        );
    }
}

export default Main;