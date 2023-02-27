import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";

import { PLAYER_COLLECTION } from "@storage/storageConfig"

import { PlayerStorageDTO } from'./PlayerStorageDTO';
import { PlayersGetByGroup } from "./playersGetByGroup";

export async function playerAddByGroup(newPlayer:PlayerStorageDTO, group:string ){

    try{
        const storagePlayers = await PlayersGetByGroup(group);
        const playerAlReadyExists = storagePlayers.filter(player => player.name === newPlayer.name);

        if(playerAlReadyExists.length > 0){
            throw new AppError('Essa pessoa ja foi adicionada em um time.')
        }
        const storage = JSON.stringify([...storagePlayers, newPlayer])

        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage)
    }catch(error){
        throw error;
    }
}