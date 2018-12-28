import React, {Component} from 'react';
import {View, FlatList, Image} from 'react-native';
import { ListItem } from 'react-native-elements';
import { baseUrl } from '../shared/baseUrl';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';

const mapStateToProps = (state) => 
{
    return {
        dishes: state.dishes,
        favorites: state.favorites
    }
}

class Favorites extends Component
{
    static navigationOptions = {
        title: 'My Favorites'
    }

    render()
    {
        const { navigate } = this.props.navigation; 
        const renderMenuItem = ({item, index}) => {
            return(
                <ListItem
                    key = {index}
                    title = {item.name}
                    subtitle = {item.description}
                    hideChevron = {true}
                    onPress = {() => navigate('DishDetail', {dishId: item.id})}
                    avatar={
                        <View>
                            <Image style={{height: 50, width: 50, borderRadius:25, margin: 5}} source= { {uri: baseUrl + item.image}} />
                        </View>
                    }                
                />
            );
        }

        if (this.props.dishes.isLoading)
        {
            return(
                <Loading/>
            )
        }
        else if(this.props.dishes.errMess)
        {
            return(
                <View>
                    <Text>{this.props.dishes.errMess}</Text>
                </View>
            )
        }
        else
        {
            return(
                <FlatList 
                    data={this.props.dishes.dishes.filter(dish => this.props.favorites.some(el => el === dish.id))}
                    renderItem = {renderMenuItem}
                    keyExtractor = { item => item.id.toString()}
                />
            )
        }
    }
}

export default connect(mapStateToProps)(Favorites);