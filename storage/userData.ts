import localForage from 'localforage'; // Дефолтный импорт

const userDataStorage = localForage.createInstance({
    driver: [
        localForage.INDEXEDDB,
        localForage.LOCALSTORAGE,
        localForage.WEBSQL,
    ],
    name: 'IndexedDB-userData',
});

export default userDataStorage;