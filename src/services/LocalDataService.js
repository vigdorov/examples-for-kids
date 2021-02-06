import {LOCAL_DATA_KEY} from '../consts';

const getData = defaultData => {
    try {
        return JSON.parse(localStorage.getItem(LOCAL_DATA_KEY)) || defaultData;
    } catch (e) {
        return defaultData;
    }
};
const setData = data => {
    localStorage.setItem(LOCAL_DATA_KEY, JSON.stringify(data));
};

export const LocalDataService = {
    getData,
    setData,
};
