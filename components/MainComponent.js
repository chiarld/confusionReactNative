import React, {Component} from 'react';
import {DISHES} from '../shared/dishes';
import Menu from './MenuComponent';
import { View } from "react-native";
import DishDetailComponent from './DishDetailComponent';

class Main extends Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            dishes: DISHES,
            selectedDish: null
        }
    }
    
    onDishSelect(dishId)
    {
        this.setState({selectedDish: dishId});
    }

    render()
    {
        return(
            <View>
                <Menu dishes={this.state.dishes}
                onPress={(dishId) => this.onDishSelect(dishId)}/>
                <DishDetailComponent dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}/>
            </View>
        );
    }
}

export default Main;