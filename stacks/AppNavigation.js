import { createStackNavigator } from "react-navigation-stack";

import Tabs from "./Tabs";
import AddCard from "../components/AddCard";
import DeckDetail from "../components/DeckDetail";
import Quiz from "../components/Quiz";

const Stacks = createStackNavigator(
    {
        Decks: {
            screen: Tabs
        },
        DeckDetail: {
            screen: DeckDetail,
            path: "DeckDetail"
        },
        AddCard: {
            screen: AddCard,
            path: "AddCard"
        },
        Quiz: {
            screen: Quiz,
            path: "Quiz"
        },
    },
    {
        initialRouteName: "Decks"
    }
);

export default Stacks;
