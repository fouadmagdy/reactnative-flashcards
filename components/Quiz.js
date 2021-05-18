import React, { Component } from 'react';
import Quiz_io from './Quiz_io';

export class Quiz extends Component {

    static navigationOptions = ({ navigation }) => {
        const title = navigation.getParam('title', '');
        return {
            title: `${title} Quiz`
        };
    };
    render() {
        const { navigation } = this.props;
        const title = navigation.getParam('title', '');

        return <Quiz_io title={title} />;
    }
}

export default Quiz;