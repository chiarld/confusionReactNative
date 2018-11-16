import React, {Component} from 'react';
import { View, Text } from "react-native";

class Home extends Component {
    static navigationOptions = {
        title: 'Home'
    }; // specific to this component

    render()
    {
        return(
            <View>
                <Text>Home Component</Text>
            </View>
        );
    }
}

export default Home;