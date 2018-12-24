import React, {Component} from 'react';
import {View, Text, ScrollView, FlatList} from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { baseUrl } from '../shared/baseUrl';
import { connect } from 'react-redux';
import { postFavorite } from '../redux/ActionCreators';

const mapStateToProps = (state) => 
{
    return {dishes: state.dishes, comments: state.comments, favorites: state.favorites}
}

const mapDispatchToProps = (dispatch) => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId))
})

const RenderDish = (props) =>
{
    const dish = props.dish;
    if(dish != null)
    {
        return(
            <Card
                featuredTitle={dish.name}
                image={{uri: baseUrl + dish.image}}>
                <Text style={{margin: 10}}>
                    {dish.description}
                </Text>
                <Icon
                    raised // displays icon like button
                    reverse // reverses the color
                    name= {props.favorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                />
            </Card>
        );
    }
    else
    {
        return(<View></View>);
    }
}

function RenderComments(props){
    const comments = props.comments;

    const renderCommentItem = ({ item, index }) => {
        return(
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date}</Text>
            </View>
        )
    }

    return(
        <Card title='Comments'>
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

class DishDetail extends Component
{

    markFavorite(dishId)
    {
        this.props.postFavorite(dishId);
    }

    static navigationOptions = {
        title: 'Dish Details'
    }; // specific to this component

    render()
    {
        const dishId = this.props.navigation.getParam('dishId', '');
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)} // will return true if matches some (like SQL)
                    onPress={() => this.markFavorite(dishId)}
                    />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);