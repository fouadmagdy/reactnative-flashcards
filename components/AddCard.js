import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import BtnContainer from './BtnContainer';
import { gray, black } from '../utils/colors';
import { connect } from 'react-redux';
import { addCard } from '../actions/index';

export class AddCard extends Component {

    state = {
        question: '',
        answer: ''
    };
    handleQuesChange = question => {
        this.setState({ question });
    };
    handleAnsChange = answer => {
        this.setState({ answer });
    };
    handleSubmit = () => {
        const { addCard, title, navigation } = this.props;
        const card = {
            question: this.state.question,
            answer: this.state.answer
        };

        addCard(title, card);
        this.setState({ question: '', answer: '' });
        navigation.goBack();
    };
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <View style={styles.spaceing}>
                        <Text style={styles.titleSpacing}>Add a question</Text>
                    </View>
                    <View style={[styles.spaceing]}>
                        <TextInput
                            style={styles.input}
                            value={this.state.question}
                            onChangeText={this.handleQuesChange}
                            placeholder="Question"
                        />
                    </View>
                    <View style={[styles.spaceing]}>
                        <TextInput
                            style={styles.input}
                            value={this.state.answer}
                            onChangeText={this.handleAnsChange}
                            placeholder="Answer"
                        />
                    </View>
                    <BtnContainer
                        btnStyle={{ backgroundColor: black, borderColor: '#fff' }}
                        onPress={this.handleSubmit}
                        disabled={this.state.question === '' || this.state.answer === ''}
                    >
                        Submit
          </BtnContainer>
                </View>
                <View style={{ height: '30%' }} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 16,
        backgroundColor: gray,
        justifyContent: 'space-around'
    },
    spaceing: {
        marginBottom: 20
    },
    titleSpacing: {
        textAlign: 'center',
        fontSize: 30
    },
    input: {
        borderWidth: 1,
        fontSize: 25,
        borderColor: 'gray',
        backgroundColor: '#fff',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        height: 50
    }
});

const mapStateToProps = (state, { navigation }) => {
    const title = navigation.getParam('title', 'undefined');

    return {
        title
    };
};

export default connect(
    mapStateToProps,
    { addCard }
)(AddCard);