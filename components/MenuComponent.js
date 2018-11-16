import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import {ListItem } from 'react-native-elements';

const Menu = (props) =>
{
    const renderMenuItem = ({item, index}) =>
    {
        return(
            <ListItem
                key={index}
                title={item.name}
                subtitle={item.description}
                hideChevron={true}
                onPress={() => props.onPress(item.id)}
                avatar={require('./images/uthappizza.png')}
          />
        )
    }

    return(
        <FlatList style={{margin: 20}}
            data={props.dishes} //iterates through every item in array
            renderItem={renderMenuItem} //renders in provided view
            keyExtractor={item => item.id.toString()} //key for looping
            />
    );
}

export default Menu;