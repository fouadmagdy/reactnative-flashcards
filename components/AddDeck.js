import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { gray, green, white } from '../utils/colors';
import { addDeck } from '../actions/index';
import { saveDeckTitleAsyncStorage } from '../utils/api';
import BtnContainer from './BtnContainer';

export class AddDeck extends Component {

    state = {
        text: ''
    };
    handleChange = text => {
        this.setState({ text });
    };
    handleSubmit = () => {
        const { addDeck, navigation } = this.props;

        addDeck(this.state.text);
        saveDeckTitleAsyncStorage(this.state.text);
        this.setState(() => ({ text: '' }));
        navigation.goBack();
    };
    render() {
        return (
            <View style={styles.container}>
                <View style={{ height: 40 }} />
                <View>
                    <Text style={styles.titleDeck}>Enter your new deck name !</Text>
                </View>
                <View style={[styles.block]}>
                    <TextInput
                        style={styles.inputDeck}
                        value={this.state.text}
                        onChangeText={this.handleChange}
                    />
                </View>
                <BtnContainer
                    btnStyle={{ backgroundColor: green, borderColor: white }}
                    onPress={this.handleSubmit}
                    disabled={this.state.text === ''}
                >
                    Create Deck
        </BtnContainer>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 14,
        paddingLeft: 14,
        paddingRight: 14,
        paddingBottom: 14,
        backgroundColor: gray
    },

    titleDeck: {
        textAlign: 'center',
        fontSize: 35
    },
    inputDeck: {
        borderRadius: 5,
        borderColor: gray,
        height: 50,
        paddingRight: 11,
        borderWidth: 1,
        backgroundColor: white,
        fontSize: 21,
        paddingLeft: 11,
        marginBottom: 21
    }
});

export default connect(
    null,
    { addDeck }
)(AddDeck);