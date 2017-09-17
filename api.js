import axios from 'axios';

const getPublicKey = (user_id, cb) => {
    axios.post('https://us-central1-hackmit-805f4.cloudfunctions.net/getPubKey/', {
        userId: user_id 
    })
    .then((response) => {
        cb(response);
    })
    .catch((error) => {
        console.error(error);
    });
}

const createEncryption = (user_id, text, cb) => {
    axios.post('https://us-central1-hackmit-805f4.cloudfunctions.net/createRSA/', {
        userId: user_id,
        text: text
    })
    .then((response) => {
        console.log(response);
        cb(response);
    })
    .catch((error) => {
        console.error(error);
    })
}

export {getPublicKey, createEncryption}