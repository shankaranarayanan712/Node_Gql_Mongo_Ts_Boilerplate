const bcrypt = require('bcrypt');
const saltRounds = 10;

export const encryptPassword = (plainPassword:string) => {
    return bcrypt.hash(plainPassword, saltRounds).then(function(hash) {
        return hash
    });
}

export const decryptPassword = (plainPassWord:string, hash:string) => {
    return bcrypt.compare(plainPassWord, hash).then(function(result) {
        return result
    });
}