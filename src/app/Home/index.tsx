
import {  View, Image, TouchableOpacity, Text, FlatList, Alert } from 'react-native';
import { useEffect } from 'react';
import { styles } from './styles';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Filter } from '@/components/Filter';
import { FilterStatus } from '@/types/FilterStatus';
import { Item } from '@/components/Item';
import { useState } from 'react';
import { itemsStorage } from '../../storage/itemsStorage';

const FILTER_STATUS = [FilterStatus.DONE, FilterStatus.PENDING]


export function Home() {
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.PENDING);
  const [description, setDescription] = useState('');
  const [items, setItems] = useState<any[]>([]);

    
  useEffect(() => {
   getItems()
  }, [filter]);

  async function getItems() {
    setItems(await itemsStorage.getItemsByStatus(filter))
  }

  async function addItem() { 
    const newItem = { 
      id: Math.random().toString(36).substring(2),
      description,
      status: FilterStatus.PENDING,
    }
    
    // sempre vai atualizar o valor, ou seja precisa do prevItems para modificar a array
    await itemsStorage.add(newItem);
  }


  async function handleAddItem() { 
    if (!description.trim()) { 
      return Alert.alert('Adicionar item', 'Por favor, insira uma descrição válida.');
    }
    
    await addItem();

    Alert.alert('Adicionado', `Adicionado ${description}`);
    setDescription('');
    setFilter(FilterStatus.PENDING);

  }

  function handleClear() { 
    Alert.alert('Limpar', 'Deseja remover todos', [{
      text: 'Sim',
      onPress: async () => {
        await itemsStorage.clear();
        getItems();
      }
    }, {
      text: 'Não',
      onPress: () => {console.log('ok')} 
    }])
  }

  async function handleToggleStatus(id:string) { 
    await itemsStorage.toogleStatus(id);
    getItems();
  }

  return (
    <View style={styles.container}>
        <Image style={styles.logo} source={require('@/assets/logo.png')}  />
        <View style={styles.form}>
          <Input 
            value={description}
            placeholder="O que você precisa comprar ? " 
            onChangeText={setDescription}
          />
       
          <Button title="Adicionar" onPress={handleAddItem} />
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            {FILTER_STATUS.map((status) => {
              return (
                <Filter 
                  key={status}
                  status={status}
                  isActive={status === filter}
                  onPress={() => setFilter(status)}
                />
              )
            })}
            <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
              <Text style={styles.clearText}>Limpar</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            showsVerticalScrollIndicator={false}
            data={items}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={() => <Text style={styles.emptyText}>Nenhum item encontrado</Text>}
            renderItem={({item}) => {
              return (
                <Item
                  data={item}
                  onStatus={() => {handleToggleStatus(item.id)}}
                  onRemove={() => {itemsStorage.remove(item.id)}}
                /> 
              )
            }}
          />
        </View>
    </View>
  );
}
