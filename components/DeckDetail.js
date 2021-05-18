import React, { Component } from 'react';
import { connect } from 'react-redux';
import BtnContainer from './BtnContainer';
import { View, StyleSheet } from 'react-native';
import Deck from './Deck';
import { removeDeck } from '../actions/index';
import { gray, green, white } from '../utils/colors';
import { removeDeckAsyncStorage } from '../utils/api';

export class DeckDetail extends Component {

    shouldComponentUpdate(nextProps) {
        return nextProps.deck !== undefined;
    }
    handleDelete = id => {
        this.props.removeDeck(id);
        removeDeckAsyncStorage(id)
        this.props.navigation.goBack();
    };
    render() {
        const { deck } = this.props;

        return (
            <View style={styles.container}>
                <Deck id={deck.title} />
                <View>
                    <BtnContainer
                        textStyle={{ color: gray }}
                        btnStyle={{ backgroundColor: white, borderColor: gray }}
                        onPress={() =>
                            this.props.navigation.navigate('AddCard', { title: deck.title })
                        }
                    >
                        Add Card
          </BtnContainer>
                    <BtnContainer
                        btnStyle={{ backgroundColor: green, borderColor: white }}
                        textStyle={{ color: white }}
                        onPress={() =>
                            this.props.navigation.navigate('Quiz', { title: deck.title })
                        }
                    >
                        Start Quiz
          </BtnContainer>
                </View>
                <BtnContainer
                    onPress={() => this.handleDelete(deck.title)}
                    textStyle={{ color: white }}
                >
                    Delete Deck
        </BtnContainer>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        backgroundColor: gray,
        paddingTop: 14,
        paddingLeft: 14,
        paddingRight: 14,
        paddingBottom: 14
    }
});

const mapStateToProps = (state, { navigation }) => {
    const title = navigation.getParam('title', 'undefined');
    const deck = state[title];

    return {
        deck
    };
};

export default connect(
    mapStateToProps,
    { removeDeck }
)(DeckDetail);