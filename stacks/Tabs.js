import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";

import DeckList from "../components/DeckList";
import AddDeck from "../components/AddDeck";

const Tabs = createBottomTabNavigator(
    {
        DeckList: {
            screen: DeckList
        },
        AddDeck: {
            screen: AddDeck
        }
    }
);

export default Tabs;
