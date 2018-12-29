import React, {Component} from 'react';
import {View, Text, ScrollView, FlatList, Modal, Button, StyleSheet, TextInput} from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { baseUrl } from '../shared/baseUrl';
import { connect } from 'react-redux';
import { postFavorite } from '../redux/ActionCreators';
import { postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = (state) => 
{
    return {dishes: state.dishes, comments: state.comments, favorites: state.favorites}
}

const mapDispatchToProps = (dispatch) => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
})



const RenderDish = (props) =>
{
    const dish = props.dish;
    if(dish != null)
    {
        return(
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                <Card
                    featuredTitle={dish.name}
                    image={{uri: baseUrl + dish.image}}>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <View style={{flexDirection: 'row', justifyContent:'center'}}>
                    <Icon
                        raised // displays icon like button
                        reverse // reverses the color
                        name= {props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                    />
                    <Icon
                        raised // displays icon like button
                        reverse // reverses the color
                        name= 'pencil'
                        type='font-awesome'
                        color='#512DA8'
                        onPress={() => props.writeComment()}
                    />
                    </View>
                </Card>
            </Animatable.View>
        );
    }
    else
    {
        return(<View></View>);
    }
}

const RenderModal = (props) =>
{
    return(
        <Modal
        animationType='slide'
        transparent={false}
        visible={props.showModal}
        onRequestClose={() => props.toggleModal}
        >
        <View style={{flex: 1}}>
            <View style={{flex:1}}>
                <Rating
                    showRating
                    onFinishRating={(rating) => props.changeRating(rating)}
                    style={styles.modalRating}
                />
            </View>
            <View style={{flex: 1,
                }}>
                <View style={{flexDirection:'row',
            borderBottomWidth: 1, 
            marginBottom: 10}}>
                    <Icon
                        name= 'user-o'
                        type='font-awesome'
                    />
                    <TextInput 
                        style={{margin: 10,
                        fontSize: 18}}
                        onChangeText={(text) => {props.changeAuthor(text)}}
                        placeholder="Author"
                    />
                    {/* For some reason I would keep getting
                    an erro with RNE's input so I just did it
                    the oldstyle way with normal react native
                    and styling. */}
                </View>
                <View style={{flexDirection:'row',
            borderBottomWidth: 1}}>
                    <Icon
                        name= 'comment-o'
                        type='font-awesome'
                    />
                    <TextInput 
                        style={{margin: 10,
                        fontSize: 18}}
                        multiline = {true}
                        numberOfLines = {4}
                        onChangeText={(text) => {props.changeComment(text)}}
                        placeholder="Comment"
                    />
                </View>
            </View>
            <View style={{flex:2}}>
                <Button
                    onPress={() => props.handleSubmit()}
                    title='Confirm'
                    color='#512DA8'/>
                    <Button
                    onPress={() => props.toggleModal()}
                    title='Cancel'
                    color='red'/>
            </View>
        </View>
        </Modal>
    );
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
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <Card title='Comments'>
                <FlatList
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                />
            </Card>
        </Animatable.View>
    );
}

class DishDetail extends Component
{
    constructor(props)
    {
        super(props);
        this.state=
        {
            showModal: false,
            rating: 3,
            author: '',
            comment: ''

        }    
    }

    toggleModal()
    {
        this.setState({showModal: !this.state.showModal,
            rating: 3,
            author: '',
            comment: ''})
    }

    handleSubmit(dishId, rating, author, comment)
    {
        this.props.postComment(dishId, rating, author, comment)
        this.toggleModal();
    }

    changeRating(value)
    {
        this.setState({rating: value});
    }

    changeAuthor(value)
    {
        this.setState({author: value});
    }
    
    changeComment(value)
    {
        this.setState({comment: value});
    }

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
                    writeComment={() => this.toggleModal()}
                    />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)}/>
                <RenderModal showModal={this.state.showModal} 
                toggleModal={() => this.toggleModal()} 
                author={this.state.author} 
                comment={this.state.comment} 
                changeAuthor={(value) => this.changeAuthor(value)} 
                changeComment={(value) => this.changeComment(value)} 
                changeRating={(value) => this.changeRating(value)}
                handleSubmit={() => this.handleSubmit(dishId, this.state.rating, this.state.author, this.state.comment)}/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    modalView: {
        flex: 1
    },
    modalRating: {
        flex: 2,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalItem: {
        flex: 1,
        fontSize: 18,
        margin: 10,
        alignItems: 'center',
    },
    modalButton: {
        flex: 1, 
        margin: 20
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);