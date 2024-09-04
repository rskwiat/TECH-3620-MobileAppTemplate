import Pocketbase, { AsyncAuthStore } from 'pocketbase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const store = new AsyncAuthStore({
  save: async (serialized) => AsyncStorage.setItem('pb_auth', serialized),
  initial: AsyncStorage.getItem('pb_auth'),
});

const BASE_URL = 'https://tech-3620-fall-2024.fly.dev';
const pb = new Pocketbase(BASE_URL, store);

export default pb;
