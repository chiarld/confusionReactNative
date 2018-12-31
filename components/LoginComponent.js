import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { Icon, Button, Input, CheckBox } from 'react-native-elements';
import { SecureStore, Permissions, ImagePicker, Asset, ImageManipulator } from 'expo';
import { createBottomTabNavigator } from 'react-navigation'
import { baseUrl } from '../shared/baseUrl'

class LoginTab extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            username: '',
            password: '',
            remember: false
        }
    }

    componentDidMount()
    {
        SecureStore.getItemAsync('userinfo')
            .then((userdata) => {
                let userinfo = JSON.parse(userdata);
                if(userinfo) // not null
                {
                    this.setState({username: userinfo.username})
                    this.setState({password: userinfo.password})
                    this.setState({remember: true})                
                }
            })
    }

    static navigationOptions = {
        title: 'Login',
        tabBarIcon: ({tintColor}) => (
        <Icon
            name='sign-in'
            type='font-awesome'
            size={24}
            iconStyle={{color: tintColor}}
        />)
    };

    handleLogin()
    {
        console.log(JSON.stringify(this.state));
        if(this.state.remember)
        {
            SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({username: this.state.username, password: this.state.password}))
                .catch((error) => console.log('Could not save user info', error))
        }
        else
        {
            SecureStore.deleteItemAsync('userinfo')
                .catch((error) => console.log('Could not save user info', error))
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Input
                    placeholder="Username"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Password"
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                    />
                <CheckBox title="Remember Me"
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({remember: !this.state.remember})}
                    containerStyle={styles.formCheckbox}
                    />
                <View style={styles.formButton}>
                <Button
                    onPress={() => this.handleLogin()}
                    icon={
                        <Icon 
                            name='sign-in' 
                            type='font-awesome' 
                            size={24}
                            color='white'
                        />
                        }
                    title="Login"
                    buttonStyle= {{backgroundColor:"#512DA8"}}
                />
                </View>
                <View style={styles.formButton}>
                <Button
                    onPress={() => this.props.navigation.navigate('Register')}
                    clear
                    icon={
                        <Icon 
                            name='user-plus' 
                            type='font-awesome' 
                            size={24}
                            color='blue'
                        />
                        }
                    title="Register"
                    titleStyle= {{color: 'blue'}}
                />                
                </View>
            </View>
        );
    }
}

class RegisterTab extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            remember: false,
            imageUrl: baseUrl + 'images/logo.png'
        }
    }

    getImageFromCamera = async () => 
    {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if(cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted')
        {
            let capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4,3]
            })

            if(!capturedImage.cancelled)
            {
                this.processImage(capturedImage.uri)
            }
        }
    }

    getImageFromGallery = async () =>
    {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if(cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted')
        {
            let capturedImage = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4,3]
            })

            if(!capturedImage.cancelled)
            {
                this.processImage(capturedImage.uri)
            }
        }        
    }

    processImage = async (imageUri) =>
    {
        let processedImage = await ImageManipulator.manipulateAsync(
            imageUri, 
            [
                {
                    resize: {width: 400}
                }
            ],
            {format: 'png'}
        );
        this.setState({imageUrl: processedImage.uri})
    }

    static navigationOptions = {
        title: 'Register',
        tabBarIcon: ({tintColor}) => (
        <Icon
            name='user-plus'
            type='font-awesome'
            size={24}
            iconStyle={{color: tintColor}}
        />)
    };

    handleRegister()
    {
        console.log(JSON.stringify(this.state));
        if(this.state.remember)
        {
            SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({username: this.state.username, 
                    password: this.state.password
                }))
                .catch((error) => console.log('Could not save user info', error))
        }
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{uri: this.state.imageUrl}}
                            loadingIndicatorSource={require('./images/logo.png')}
                            style={styles.image}
                        />
                        <Button
                            title='Camera'
                            onPress={this.getImageFromCamera}
                            buttonStyle= {{backgroundColor:"#512DA8", margin: 20}}
                        />
                        <Button
                            title='Gallery'
                            onPress={this.getImageFromGallery}
                            buttonStyle= {{backgroundColor:"#512DA8", margin: 20}}
                        />                        
                    </View>
                    <Input
                        placeholder="Username"
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        onChangeText={(username) => this.setState({username})}
                        value={this.state.username}
                        containerStyle={styles.formInput}
                        />
                    <Input
                        placeholder="Password"
                        leftIcon={{ type: 'font-awesome', name: 'key' }}
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                        containerStyle={styles.formInput}
                        />
                    <Input
                        placeholder="First name"
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        onChangeText={(firstname) => this.setState({firstname})}
                        value={this.state.firstname}
                        containerStyle={styles.formInput}
                        />
                    <Input
                        placeholder="Last name"
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        onChangeText={(lastname) => this.setState({lastname})}
                        value={this.state.lastname}
                        containerStyle={styles.formInput}
                        />  
                    <Input
                        placeholder="Email"
                        leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.email}
                        containerStyle={styles.formInput}
                        />                                                           
                    <CheckBox title="Remember Me"
                        center
                        checked={this.state.remember}
                        onPress={() => this.setState({remember: !this.state.remember})}
                        containerStyle={styles.formCheckbox}
                        />
                    <View style={styles.formButton}>
                        <Button
                            onPress={() => this.handleRegister()}
                            icon={
                                <Icon 
                                    name='user-plus' 
                                    type='font-awesome' 
                                    size={24}
                                    color='white'
                                />
                                }
                            title="Register"
                            buttonStyle= {{backgroundColor:"#512DA8"}}
                            />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const Login = createBottomTabNavigator({
    Login: LoginTab,
    Register: RegisterTab
})

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    image: {
        margin: 10,
        width: 80,
        height: 60
    },
    formInput: {
        margin: 40,
    },
    formCheckbox: {
        margin: 40,
        backgroundColor: null
    },
    formButton: {
        margin: 40
    }
})

export default Login;