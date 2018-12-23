import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import {Tile } from 'react-native-elements';
import { baseUrl } from '../shared/baseUrl';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';

const mapStateToProps = (state) => 
{
    return {dishes: state.dishes}
}
class Menu extends Component
{
    static navigationOptions = {
        title: 'Menu'
    }; // specific to this component

    render()
    {
        const renderMenuItem = ({item, index}) =>
        {
            return(
                <Tile
                    key={index}
                    title={item.name}
                    caption={item.description}
                    featured
                    onPress={() => navigate('DishDetail', { dishId: item.id})}
                    imageSrc={{uri: baseUrl + item.image}}
            />
            );
        }   

        const { navigate } = this.props.navigation;

        if(this.props.dishes.isLoading)
        {
            return(
                <Loading/>
            )
        }
        else if(this.props.dishes.errMess)
        {
            <View>
                <Text>{this.props.dishes.errMess}</Text>
            </View>
        }
        else{
            return(
                <FlatList
                    data={this.props.dishes.dishes} //iterates through every item in array
                    renderItem={renderMenuItem} //renders in provided view
                    keyExtractor={item => item.id.toString()} //key for looping
                    />
            );
        }
    }
}

export default connect(mapStateToProps)(Menu);