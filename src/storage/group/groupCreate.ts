import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { AppError } from "@utils/AppError";
import { groupGetAll } from "./groupGetAll";

export async function groupCreat(newGroup:string) {
    try{
        const storageGroups = await groupGetAll();

        const groupReadyExists = storageGroups.includes(newGroup);

        if(groupReadyExists){
            throw new AppError('Grupo ja criado, utilize outro nome de grupo')
        }

        const storage = JSON.stringify([...storageGroups, newGroup])

        await AsyncStorage.setItem(GROUP_COLLECTION, storage);

    }catch(error){
        throw error;
    }
}