import { useCallback, useState } from 'react';
import { FlatList } from 'react-native';

import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { Conteiner } from './style'

import {groupGetAll} from '@storage/group/groupGetAll'

import { GroupCard } from '@components/GroupCard';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

export function Groups() {

  const [ group, setGroup] = useState<string[]>([]);

  const Navigation = useNavigation();
  
  function handleNewGroup(){
    Navigation.navigate('new')
  }

  function handleOpemGroup(group:string){
    Navigation.navigate('players', {group})
  }

  async function fetchGroups() {
    try{
      const data = await groupGetAll();
      setGroup(data)
    }catch(error){
      throw error
    }
  }

  useFocusEffect(useCallback(() =>{
    console.log('useFocusEffect carregou');
    fetchGroups();
  },[]))
  return (
    <Conteiner>
      <Header/>
      <Highlight
       title='Turmas'
       subTitle='Jogue com a sua turma' />

      <FlatList
        data={group}
        keyExtractor={item => item}
        renderItem={({ item }) =>(
          <GroupCard title={ item }
            onPress={()=> handleOpemGroup(item)}
          />
        )}

        ListEmptyComponent={() =>(
          <ListEmpty message="Cadastre uma turma"/>
        )}
      />
      <Button
        title='Criar nova turma'
        onPress={handleNewGroup}
      />
    </Conteiner>
  );
}

