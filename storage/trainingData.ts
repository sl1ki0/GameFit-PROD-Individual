import localForage from 'localforage';
import { APP_NAME } from '~/constants/branding';

const trainingDataStorage = localForage.createInstance({
    driver: [
        localForage.INDEXEDDB,
        localForage.LOCALSTORAGE,
        localForage.WEBSQL,
    ],
    name: APP_NAME + '-trainingData',
});

export default trainingDataStorage;