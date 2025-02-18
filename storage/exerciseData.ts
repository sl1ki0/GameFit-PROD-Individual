import localForage from 'localforage';
import { APP_NAME } from '~/constants/branding';

const exerciseDataStorage = localForage.createInstance({
    driver: [
        localForage.INDEXEDDB,
        localForage.LOCALSTORAGE,
        localForage.WEBSQL,
    ],
    name: APP_NAME + 'IndexedDB-exerciseDara',
});

export default exerciseDataStorage;