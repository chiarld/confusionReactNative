import React, {Component} from 'react';
import Home from './HomeComponent'
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { View, Button } from "react-native";
import DishDetail from './DishDetailComponent';
import { createStackNavigator, createDrawerNavigator } from "react-navigation";

const MenuNavigator = createStackNavigator({
    Menu: { screen: Menu},
    DishDetail: {screen: DishDetail}
}, {
   initialRouteName: 'Menu',
   navigationOptions: {
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff', // icons
        headerTitleStyle: {
            color: '#fff'
        }
   } // applies to all screens. 
});

const HomeNavigator = createStackNavigator({
    Home: { screen: Home},
}, {
   navigationOptions: {
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff', // icons
        headerTitleStyle: {
            color: '#fff'
        }
   } // applies to all screens. 
});

const ContactNavigator = createStackNavigator({
    Contact: { screen: Contact},
}, {
   navigationOptions: {
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff', // icons
        headerTitleStyle: {
            color: '#fff'
        }
   } // applies to all screens. 
});

const AboutNavigator = createStackNavigator({
    About: { screen: About},
}, {
   navigationOptions: {
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff', // icons
        headerTitleStyle: {
            color: '#fff'
        }
   } // applies to all screens. 
});

const MainNavigator = createDrawerNavigator({
    Home: { 
        screen: HomeNavigator,
        navigationOptions: {
            title: 'Home',
            drawerLabel: 'Home'
        } // We use HomeNavigator so we can have navigation options
    },
    Menu: { 
        screen: MenuNavigator,
        navigationOptions: {
            title: 'Menu',
            drawerLabel: 'Menu'
        } // We use HomeNavigator so we can have navigation options
    }, 
    Contact: { 
        screen: ContactNavigator,
        navigationOptions: {
            title: 'Contact',
            drawerLabel: 'Contact'
        } // We use HomeNavigator so we can have navigation options
    },
    About: { 
        screen: AboutNavigator,
        navigationOptions: {
            title: 'About',
            drawerLabel: 'About'
        } // We use HomeNavigator so we can have navigation options
    }
}, {
    drawerBackgroundColor: '#D1C4E9'
})

class Main extends Component 
{

    render()
    {
        return(
            <View style={{flex: 1, paddingTop: Expo.Constants.statusBarHeight}}>
                <MainNavigator/>
            </View>
        );
    }
}

export default Main;