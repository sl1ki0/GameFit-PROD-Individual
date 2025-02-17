import localForage from 'localforage';

const exerciseDataStorage = localForage.createInstance({
    driver: [
        localForage.INDEXEDDB,
        localForage.LOCALSTORAGE,
        localForage.WEBSQL,
    ],
    name: 'IndexedDB-exerciseDara',
});

export default exerciseDataStorage;