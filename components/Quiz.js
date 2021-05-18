import React, { Component } from 'react';
import Quiz_io from './Quiz_io';
import { setNotification, clearNotification } from '../utils/Notification';

export class Quiz extends Component {

    static navigationOptions = ({ navigation }) => {
        const title = navigation.getParam('title', '');
        return {
            title: `${title} Quiz`
        };
    };

    componentDidMount() {
        clearNotification().then(setNotification);
    }

    render() {
        const { navigation } = this.props;
        const title = navigation.getParam('title', '');

        return <Quiz_io title={title} />;
    }
}

export default Quiz;