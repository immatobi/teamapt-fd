let storage = {};

storage.checkToken = () => {
    return localStorage.getItem('token') ? true : false;
}

storage.getToken = () => {
    return localStorage.getItem('token');
}

storage.keep = (key, data) => {

    if(data && data !== undefined && data !== null){
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    }else{
        return false
    }
    
}

storage.keepLegacy = (key, data) => {

    if(data){
        localStorage.setItem(key, data);
        return true;
    }else{
        return false
    }
    
}

storage.fetch = (key) => {

    const data = JSON.parse(localStorage.getItem(key))
    return data;
}

storage.fetchLegacy = (key) => {

    const data = localStorage.getItem(key);
    return data;
}

storage.delete = (key, legacy) => {
    
    let data; 
    if(legacy && legacy === true){
        data = localStorage.getItem(key);
    }else{
        data = storage.fetch(key);
    }

    if(data && data !== null && data !== undefined){
        localStorage.removeItem(key)
        return true;
    }else{
        return false;
    }
}


export default storage;