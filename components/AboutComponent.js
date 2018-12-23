import React, {Component} from 'react';
import {ScrollView, View, Text, FlatList, Image} from 'react-native';
import {Card, ListItem} from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const mapStateToProps = (state) => 
{
    return {leaders: state.leaders}
}

class About extends Component
{

    render()
    {
        const History = () =>
        {
            return(
            <Card
                title="Our History"
                >  
                <Text>Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.</Text>
                <Text></Text>
                <Text>The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.</Text>
            </Card>
            );
        }
        const renderLeader = ({item, index}) =>
        {
            return(
                <ListItem
                key={index}
                title={item.name}
                subtitle={
                    <View>
                        <Text>{item.description}</Text>
                    </View>
                }
                hideChevron={true}
                avatar={
                    <View>
                        <Image style={{height: 50, width: 50, borderRadius:25, margin: 5}} source= { {uri: baseUrl + item.image}} />
                    </View>
                }
                />
            );
        }

        if (this.props.leaders.isLoading)
        {
            return(
                <ScrollView style={{flex:1}}>
                    <History/>
                    <Card title='Corporate Leadership'>
                        <Loading/>
                    </Card>
                </ScrollView>  
            )
        }
        else if(this.props.leaders.errMess)
        {
            return(
                <ScrollView style={{flex:1}}>
                    <History/>
                    <Card title='Corporate Leadership'>
                        <Text>{this.props.leaders.errMess}</Text>
                    </Card>
                </ScrollView>
            )
        }
        else{
            return(
            <ScrollView style={{flex:1}}>
                <History/>
                <Card
                    title="Corporate leaders"
                    >
                <FlatList
                    data={this.props.leaders.leaders} //iterates through every item in array
                    renderItem={renderLeader} //renders in provided view
                    keyExtractor={item => item.id.toString()} //key for looping
                    />
                </Card>
            </ScrollView>
            );
        }
    }
}

export default connect(mapStateToProps)(About);