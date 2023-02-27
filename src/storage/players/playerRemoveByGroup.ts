import AsyncStorage from "@react-native-async-storage/async-storage";

import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { PlayersGetByGroup } from "./playersGetByGroup";


export async function playerRemoveByGroup(playerName:string, group:string) {
    try {
        const storage = await PlayersGetByGroup(group);
        const filtored = storage.filter(players => players.name !== playerName);
        const players = JSON.stringify(filtored);

        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`,players)
    } catch (error) {
        throw error;
    }
}