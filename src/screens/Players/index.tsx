import { Button } from "@components/Button";
import { ButtonIcon } from "@components/ButtonIcon";
import { CardPlayer } from "@components/CardPlayers";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { ListEmpty } from "@components/ListEmpty";
import { Conteiner, Form, HeaderList, NumbersOfPlayers } from "./style";

import { AppError } from "@utils/AppError";

import { useNavigation, useRoute } from "@react-navigation/native";
import { Alert, FlatList, TextInput } from "react-native";
import { useEffect, useRef, useState } from "react";

import { playerAddByGroup } from '@storage/players/playerAddByGroup'
import { PlayersGetByGroupAndTeam } from "@storage/players/playerAddByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/players/PlayerStorageDTO";
import { PlayersGetByGroup } from "@storage/players/playersGetByGroup";
import { playerRemoveByGroup } from "@storage/players/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";

type RouteParams = {
    group:string
}

export function Players(){

    const newPlayerNameInputRef = useRef<TextInput>(null);

    const [newPlayersName, setNewPlayersName] = useState('');
    const [team, setTeam] = useState('Time A');
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

    const routes = useRoute();
    const navigation = useNavigation();

    const {group} = routes.params as RouteParams;

    async function handleAddPlayer() {
        if(newPlayersName.trim().length === 0){
            return Alert.alert( 'Nova pessoa', 'Informe o nome da pessoa para adicionar.')
        }

        const newPlayer = {
            name: newPlayersName,
            team,
        }
        try{
            await playerAddByGroup(newPlayer, group);
            newPlayerNameInputRef.current?.blur();
            setNewPlayersName('');
            fetchPlayersByTeam();

        }catch(error){
            if(error instanceof AppError){
                Alert.alert('Novo Player', error.message);
            }else{
                Alert.alert('Novo Player', 'Por algum motivo não foi possivel add o player');
                console.log(error);
            }
            throw error;
        }
    }

    async function fetchPlayersByTeam() {
        try{
            const playersByTeam = await PlayersGetByGroupAndTeam(group, team);
            setPlayers(playersByTeam);
        }catch(errpr){
            Alert.alert('Pessoas', 'Não foi possivel carregar as pessoas do time selecionado!');
        }
    }

    async function handlePlayerRemove(playerName:string) {
        try {
            await playerRemoveByGroup(playerName, group);
            fetchPlayersByTeam();
        } catch (error) {
            console.log(error)
            Alert.alert('Remove Pessoa', 'Não foi possivel remover essa pessoa.')            
        }
    }

    async function groupRemove(){
        try {
            await groupRemoveByName(group);
            navigation.navigate('groups');
        } catch (error) {
            
            Alert.alert('Remover', 'Não foi possivel remover o grupo');
        }
    }

    async function handleRemoveGroup() {
        Alert.alert(
            'Remover',
            'Deseja remover esse grupo',
            [
                {text: 'Não', style:'cancel'},
                {text: 'sim', onPress: () => groupRemove()}
            ]
        )
    }

    useEffect(() => {
        fetchPlayersByTeam();
    },[team])
    return(

        <Conteiner>
            <Header showBackButton/>
            <Highlight
                title={group}
                subTitle="Adicione a galera e separe os times"
            />

            <Form>
                <Input
                    inputRef={newPlayerNameInputRef}
                    onChangeText={setNewPlayersName}
                    value={newPlayersName}
                    placeholder="Nome da pessoa"
                    autoCorrect={false}
                    onSubmitEditing={handleAddPlayer}
                    returnKeyType='done'
                />

                <ButtonIcon 
                    onPress={handleAddPlayer}
                    icon="add"/>
            </Form>
            <HeaderList>
                <FlatList
                    data={["time A", "Time B"]}
                    keyExtractor={item=>item}
                    renderItem={({item}) =>(
                        
                        <Filter
                            title={item}
                            isActive={item === team}
                            onPress={() => setTeam(item)}
                        />  
                    )}
                    horizontal
                />
                <NumbersOfPlayers>
                    {players.length}
                </NumbersOfPlayers>
            </HeaderList>
            <FlatList
                    data={players}
                    keyExtractor={item => item.name}
                    renderItem={({item}) =>(
                      <CardPlayer 
                        name={item.name}
                        onRemove={() => handlePlayerRemove(item.name)}                      
                      />  
                    )}
                    ListEmptyComponent={() =>(
                        <ListEmpty
                            message="Não há jogadores"
                        />
                    )}

                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[
                        {paddingBottom:100},
                        players.length === 0 && {flex:1}

                    ]}
                />
                <Button
                    title="Remover Turma"
                    type="SECUNDARY"
                    onPress={handleRemoveGroup}
                />
        </Conteiner>
    )

}