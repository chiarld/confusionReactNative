import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import {ListItem } from 'react-native-elements';
import { DISHES } from '../shared/dishes';

class Menu extends Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            dishes: DISHES
        };
    }

    static navigationOptions = {
        title: 'Menu'
    }; // specific to this component

    render()
    {
        const renderMenuItem = ({item, index}) =>
        {
            return(
                <ListItem
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    onPress={() => navigate('DishDetail', { dishId: item.id})}
                    avatar={require('./images/uthappizza.png')}
            />
            );
        }   

        const { navigate } = this.props.navigation;

        return(
            <FlatList
                data={this.state.dishes} //iterates through every item in array
                renderItem={renderMenuItem} //renders in provided view
                keyExtractor={item => item.id.toString()} //key for looping
                />
        );
    }
}

export default Menu;