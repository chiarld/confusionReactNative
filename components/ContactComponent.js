import React, {Component} from 'react';
import {View, Text, Alert} from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { MailComposer } from 'expo'
import * as Animatable from 'react-native-animatable'

const sendMail = () =>
{
    MailComposer.composeAsync({
        recipients: ['confusion@food.net'],
        subject: 'Enquiry',
        body: 'To whom it may concern:'
    })
        .catch(() => Alert.alert(
            'Unable to send e-mail',
            'We apologize for the incovenience'
        ))
}

const Contact = () =>
{
    return(
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
            <Card
                title="Contact Information"
                >
            
            <Text>121, Clear Water Bay Road</Text>
            <Text></Text>
            <Text>Clear Water Bay, Kowloon</Text>
            <Text></Text>
            <Text>HONG KONG</Text>
            <Text></Text>
            <Text>Tel: +852 1234 5678</Text>
            <Text></Text>
            <Text>Fax: +852 8765 4321</Text>
            <Text></Text>
            <Text>Email:confusion@food.net</Text>
            <Button
                title='Send Email'
                buttonStyle={{backgroundColor: '#512DA8'}}
                icon={<Icon name='envelope-o' type='font-awesome' color='white'/>}
                onPress = {sendMail}
            />
            </Card>
        </Animatable.View>
    );
}

export default Contact;