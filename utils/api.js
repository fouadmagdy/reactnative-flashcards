import { AsyncStorage } from 'react-native';
import { decks } from './_DATA';

const ASYNC_STORAGE_KEY = 'fouadmagdy';

export function getData() {
    return decks;
}

function formatDeckResults(results) {
    return results === null ? decks : JSON.parse(results);
}

export function getDecksOld() {
    return AsyncStorage.getItem(ASYNC_STORAGE_KEY).then(formatDeckResults);
}

export async function getDecks() {
    try {
        const storeResults = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);

        if (storeResults === null) {
            AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(decks));
        }

        return storeResults === null ? decks : JSON.parse(storeResults);
    } catch (err) {
        console.log(err);
    }
}

export async function getDeck(id) {
    try {
        const storeResults = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);

        return JSON.parse(storeResults)[id];
    } catch (err) {
        console.log(err);
    }
}

export async function addCardToDeckAsyncStorage(title, card) {
    try {
        const deck = await getDeck(title);

        await AsyncStorage.mergeItem(
            ASYNC_STORAGE_KEY,
            JSON.stringify({
                [title]: {
                    questions: [...deck.questions].concat(card)
                }
            })
        );
    } catch (err) {
        console.log(err);
    }
}

export async function saveDeckTitleAsyncStorage(title) {
    try {
        await AsyncStorage.mergeItem(
            ASYNC_STORAGE_KEY,
            JSON.stringify({
                [title]: {
                    title,
                    questions: []
                }
            })
        );
    } catch (err) {
        console.log(err);
    }
}

export async function removeDeckAsyncStorage(key) {
    try {
        const results = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
        const data = JSON.parse(results);
        data[key] = undefined;
        delete data[key];
        AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
        console.log(err);
    }
}


export async function resetDecks() {
    try {
        await AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(decks));
    } catch (err) {
        console.log(err);
    }
}