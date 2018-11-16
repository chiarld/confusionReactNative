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
                avatar={require('./images/uthappizza.png')}
          />
        )
    }

    return(
        <FlatList
            data={props.dishes} //iterates through every item in array
            renderItem={renderMenuItem} //renders in provided view
            keyExtractor={item => item.id.toString()} //key for looping
            />
    );
}

export default Menu;