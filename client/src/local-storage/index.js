const TOKEN_KEY = 'TOKEN';
const USER_ID_KEY = 'USER_ID';

import LocalStorage from '@/local-storage/LocalStorage';

export const localStorageToken = new LocalStorage(TOKEN_KEY);
export const localStorageUserId = new LocalStorage(USER_ID_KEY);
