import React from 'react';
import { Permissions } from 'expo';
import * as Notifications from 'expo-notifications';
import { AsyncStorage } from 'react-native';



const CHANNELID = 'DailyReminder';
const NOTIFICATION_KEY = 'fouadmagdy:noti';

export function clearNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
        Notifications.cancelScheduledNotificationAsync
    );
}

function createNotification() {
    return {
        body: "You don't study for today please take a one",
        title: 'Reminder',
        ios: {
            sound: true
        },
        android: {
            channelId: CHANNELID,
            sticky: false,
        }
    };
}

function channelCreation() {
    return {
        name: 'Daily Reminder',
        description: 'daily reminder',
        sound: true,
        priority: 'high'
    };
}

export function setNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then(data => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
                    if (status === 'granted') {
                        Notifications.channelCreationAndroidAsync(CHANNELID, channelCreation())
                            .then(() => {
                                Notifications.cancelAllScheduledNotificationsAsync();
                                const tomorrow = new Date();
                                tomorrow.setDate(tomorrow.getDate() + 1);
                                tomorrow.setHours(20);
                                tomorrow.setMinutes(0);
                                Notifications.scheduleLocalNotificationAsync(
                                    createNotification(),
                                    {
                                        time: tomorrow,
                                        repeat: 'day'
                                    }
                                );
                                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                            })
                            .catch(error => {
                                console.log('error', error);
                            });
                    }
                });
            }
        });
}