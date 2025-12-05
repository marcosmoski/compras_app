import AsyncStorage from '@react-native-async-storage/async-storage';
import { FilterStatus } from '@/types/FilterStatus';

export const ITEMS_STORAGE_KEY = '@comprar:items';

export type ItemStorage = {
    id: string;
    description: string;
    status: FilterStatus;
}
 
async function saveItems(items: ItemStorage[]) {
    try {
        await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
        console.error(error);
    }
}

async function add(item: ItemStorage) {
    try {
        const items = await getItems();
        const newItems = [...items, item];
        await saveItems(newItems);
        return newItems;
    } catch (error) {
        console.error(error);
    }
}

export async function getItems(): Promise<ItemStorage[]> {
    try {
        const items = await AsyncStorage.getItem(ITEMS_STORAGE_KEY);
        return items ? JSON.parse(items) : [];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getItemsByStatus(status: FilterStatus): Promise<ItemStorage[]> { 
    try {
        const items = await getItems();
        return items.filter((item: ItemStorage) => item.status === status);
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function remove(id: string) {
    try {
        const items = await getItems();
        const newItems = items.filter((item: ItemStorage) => item.id !== id);
        await saveItems(newItems);
        return newItems;
    } catch (error) {
        console.error(error);
    }
}

export async function clear() {
    try {
        await AsyncStorage.removeItem(ITEMS_STORAGE_KEY);
    } catch (error) {
        console.error(error);
    }
}

export const itemsStorage = { 
    add,
    getItems,
    getItemsByStatus,
    remove,
    clear
}