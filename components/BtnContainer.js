
import React from 'react';

import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { white, disabledGray, gray, black } from '../utils/colors';

export default function BtnContainer({
    buttonStyle = {},
    textStyle = {},
    children,
    onPress,
    disabled = false
}) {
    const disabledButton = disabled ? styles.btnDisabled : {};
    const disabledButtonText = disabled ? styles.btnTextDisabled : {};
    return (
        <View style={styles.btnContainer}>
            <TouchableOpacity
                onPress={onPress}
                style={[styles.btn, buttonStyle, disabledButton]}
                disabled={disabled}
            >
                <Text
                    style={[
                        styles.btnText,
                        textStyle,
                        disabledButtonText
                    ]}
                >
                    {children}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    btnContainer: {
        alignItems: 'center',
        marginBottom: 20
    },
    btn: {
        width: 150,
        height: 60,
        borderWidth: 1,
        backgroundColor: black,
        borderRadius: 5,
        justifyContent: `center`,
        alignItems: `center`,
        borderColor: '#999'
    },
    btnText: {
        fontSize: 25,
        color: white
    },
    btnDisabled: {
        backgroundColor: gray,
        borderColor: disabledGray
    },
    btnTextDisabled: {
        color: disabledGray
    }
});

