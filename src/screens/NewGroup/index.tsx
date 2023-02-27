import { useNavigation } from '@react-navigation/native';

import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { Conteiner, Contente, Icon } from "./style";
import { useState } from 'react';
import { groupCreat } from '@storage/group/groupCreate';
import { AppError } from '@utils/AppError';
import { Alert } from 'react-native';



export function NewGroup(){

    const [group, setGroup] = useState('')

    const Navigation = useNavigation();

    async function handleNewPlayers(){
        try{
            if(group.trim().length === 0){
                return Alert.alert('Novo Grupo', 'Digite o nome da turma');
            }

            await groupCreat(group);
            Navigation.navigate('players', {group} );
        }catch(error){
            if(error instanceof AppError){
                Alert.alert('Novo grupo', error.message);
            }else{
                Alert.alert('Novo Grupo', 'Por algum motivo não foi possivel criar o grupo');
                console.log(error);
            }
            throw error;
        }
      }
    
    
    
    return(
        <Conteiner>
            <Header showBackButton/>
            <Contente>
                <Icon/>
                <Highlight
                    title="Nova turma"
                    subTitle="Crie uma nova turma para adicionar as pessoas"
                />
                <Input
                    placeholder="Nome da turma"
                    onChangeText={setGroup}
                />
                <Button
                    onPress={handleNewPlayers}
                    title="Criar"
                    style={{marginTop: 20}}
                />
            </Contente>
        </Conteiner>
    )
}