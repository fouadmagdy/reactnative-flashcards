import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { gray, green, red, white } from '../utils/colors';
import BtnContainer from './BtnContainer';
import { withNavigation } from 'react-navigation';


const RESPONSIVE_SCREEN = Dimensions.get('window').width;

const screen = {
    QUESTION: 'question',
    ANSWER: 'answer',
    RESULT: 'result'
};
const answer = {
    CORRECT: 'correct',
    INCORRECT: 'incorrect'
};

class Quiz_io extends Component {

    state = {
        show: screen.QUESTION,
        correct: 0,
        incorrect: 0,
        questionCount: this.props.deck.questions.length,
        answered: Array(this.props.deck.questions.length).fill(0)
    };
    handleScrollEvent = () => {
        this.setState({
            show: screen.QUESTION
        });
    };
    handleAnswer = (response, page) => {
        if (response === answer.CORRECT) {
            this.setState(prevState => ({ correct: prevState.correct + 1 }));
        } else {
            this.setState(prevState => ({ incorrect: prevState.incorrect + 1 }));
        }
        this.setState(
            prevState => ({
                answered: prevState.answered.map((val, index) => (page === index ? 1 : val))
            }),
            () => {
                const { correct, incorrect, questionCount } = this.state;

                if (questionCount === correct + incorrect) {
                    this.setState({ show: screen.RESULT });
                } else {
                    this.scrollView.scrollTo({ x: (page + 1) * RESPONSIVE_SCREEN });
                    this.setState(prevState => ({
                        show: screen.QUESTION
                    }));
                }
            }
        );
    };
    handleReset = () => {
        this.setState(prevState => ({
            show: screen.QUESTION,
            correct: 0,
            incorrect: 0,
            answered: Array(prevState.questionCount).fill(0)
        }));
    };
    render() {
        const { questions } = this.props.deck;
        const { show } = this.state;

        if (questions.length === 0) {
            return (
                <View style={styles.pageContainer}>
                    <View style={styles.mt_20}>
                        <Text style={[styles.font_25, { textAlign: 'center' }]}>
                            please create a card to start a quiz !
            </Text>
                        <Text style={[styles.font_25, { textAlign: 'center' }]}>
                            Please add some cards !
            </Text>
                    </View>
                </View>
            );
        }

        if (this.state.show === screen.RESULT) {
            const { correct, questionCount } = this.state;
            const percent = ((correct / questionCount) * 100).toFixed(0);
            const resultStyle =
                percent >= 70 ? styles.rightResults : styles.wrongResults;

            return (
                <View style={styles.pageContainer}>

                    <View style={styles.mt_20}>
                        <Text style={[styles.font_25, { textAlign: 'center' }]}>
                            Quiz Complete!
            </Text>
                        <Text style={resultStyle}>
                            {correct} / {questionCount} correct
            </Text>
                    </View>
                    <View style={styles.mt_20}>
                        <Text style={[styles.font_25, { textAlign: 'center' }]}>
                            Percentage correct answers
            </Text>
                        <Text style={resultStyle}>{percent}%</Text>
                    </View>
                    <View>
                        <BtnContainer
                            btnStyle={{ backgroundColor: green, borderColor: white }}
                            onPress={this.handleReset}
                        >
                            Restart Quiz
            </BtnContainer>
                        <BtnContainer
                            btnStyle={{ backgroundColor: gray, borderColor: gray }}
                            textStyle={{ color: gray }}
                            onPress={() => {
                                this.handleReset();
                                this.props.navigation.navigate('Decks');
                            }}
                        >
                            Home
            </BtnContainer>
                    </View>
                </View>
            );
        }

        return (
            <ScrollView
                style={styles.container}
                onMomentumScrollBegin={this.handleScrollEvent}
                ref={scrollView => {
                    this.scrollView = scrollView;
                }}
                horizontal={true}
            >
                {questions.map((question, index) => (
                    <View style={styles.pageContainer} key={index}>
                        <View style={styles.mt_20}>
                            <Text style={styles.font_25}>
                                {index + 1} / {questions.length}
                            </Text>
                        </View>
                        <View style={[styles.mt_20, styles.questionContainer]}>
                            <Text style={styles.questionText}>
                                {show === screen.QUESTION ? 'Question' : 'Answer'}
                            </Text>
                            <View style={styles.questionContainer}>
                                <Text style={styles.title_style}>
                                    {show === screen.QUESTION
                                        ? question.question
                                        : question.answer}
                                </Text>
                            </View>
                        </View>
                        {show === screen.QUESTION ? (
                            <BtnContainer
                                textStyle={{ color: white, backgroundColor: gray }}
                                onPress={() => this.setState({ show: screen.ANSWER })}
                            >
                                Answer
                            </BtnContainer>
                        ) : (
                            <BtnContainer
                                textStyle={{ color: red }}
                                onPress={() => this.setState({ show: screen.QUESTION })}
                            >
                                Question
                            </BtnContainer>
                        )}
                        <View>
                            <BtnContainer
                                btnStyle={{ backgroundColor: green, borderColor: white }}
                                onPress={() => this.handleAnswer(answer.CORRECT, index)}
                                disabled={this.state.answered[index] === 1}
                            >
                                Correct
              </BtnContainer>
                            <BtnContainer
                                btnStyle={{ backgroundColor: red, borderColor: white }}
                                onPress={() => this.handleAnswer(answer.INCORRECT, index)}
                                disabled={this.state.answered[index] === 1}
                            >
                                Incorrect
              </BtnContainer>
                        </View>
                    </View>
                ))}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    pageContainer: {
        flex: 1,
        width: RESPONSIVE_SCREEN,
        paddingTop: 14,
        paddingLeft: 14,
        paddingBottom: 14,
        paddingRight: 14,
        backgroundColor: gray,
        justifyContent: 'space-around',
    },
    mt_20: {
        marginBottom: 20
    },
    font_25: {
        fontSize: 24
    },
    title_style: {
        fontSize: 30,
        textAlign: 'center'
    },
    questionContainer: {
        borderWidth: 1,
        borderColor: gray,
        paddingLeft: 14,
        paddingRight: 14,
        backgroundColor: white,
        borderRadius: 5,
        paddingTop: 15,
        paddingBottom: 15,
        flexGrow: 1
    },
    questionContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    questionText: {
        textAlign: 'center',
        textDecorationLine: 'underline',
        fontSize: 25
    },
    rightResults: {
        fontSize: 40,
        color: green,
        textAlign: 'center'
    },
    wrongResults: {
        fontSize: 40,
        color: red,
        textAlign: 'center'
    }
});

const mapStateToProps = (state, { title }) => {
    const deck = state[title];

    return {
        deck
    };
};

export default withNavigation(connect(mapStateToProps)(Quiz_io));