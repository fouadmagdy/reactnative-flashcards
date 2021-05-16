import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import Deck from './Deck';
import { gray, black } from '../utils/colors';
import { initialData } from '../actions/index';

export class DeckList extends Component {

    componentDidMount() {
        this.props.initialData();
    }
    render() {
        const { decks, navigation } = this.props;

        return (
            <ScrollView style={styles.container}>
                <Text style={styles.title}>Mobile Flashcards</Text>
                {Object.values(decks).map(deck => {
                    return (
                        <TouchableOpacity
                            key={deck.title}
                            onPress={() =>
                                navigation.navigate('DeckDetail', { title: deck.title })
                            }
                        >
                            <Deck id={deck.title} />
                        </TouchableOpacity>
                    );
                })}
                <View style={{ marginBottom: 30 }} />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingRight: 14,
        paddingBottom: 14,
        paddingTop: 14,
        paddingLeft: 14,
        backgroundColor: gray
    },
    title: {
        fontSize: 40,
        textAlign: 'center',
        marginBottom: 16,
        color: black
    }
});

const mapStateToProps = state => ({ decks: state });

export default connect(
    mapStateToProps,
    { initialData }
)(DeckList)