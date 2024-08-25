const db= require("../db")

const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM user', (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const getUserbyId= (Id) =>{
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM user WHERE id_user = ?',[Id], (err, results) => {
            if (err) {
                reject(err);
            } else if(results.lengths===0){
               resolve(null);
            }else {
                resolve(results);
            }
        });
    });
};

const getUserByUsername= (usuario) =>{
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM user WHERE usuario = ?',[usuario], (err, results) => {
            if (err) {
                reject(err);
            } else if(results.lengths===0){
               resolve(null);
            }else {
                resolve(results);
            }
        });
    });
}

const loginUser = (usuario, password) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM user WHERE usuario = ? AND contraseña = ?', [usuario, password], 
        (err, results) => {
            if (err) {
                reject(err);
            } else if (results.length === 0) {
                resolve(null);
            } else {
                resolve(results); 
            }
        });
    });
};

const CreateUser = (usuario,password,Nombre) =>{
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO user(usuario,Nombre,contraseña,rol) VALUES(?,?,?,?)', [usuario, password, Nombre, 2], 
        (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve({ usuario, password, Nombre }); 
            }
        });
    });
};

module.exports={
    getAllUsers,
    getUserbyId,
    getUserByUsername,
    CreateUser,
    loginUser
}