const db= require("../db")

const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM "user"', (err, results) => {
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
        db.query('SELECT * FROM "user" WHERE id_user = $1',[Id], (err, result) => {
            if (err) {
                reject(err);
            } else if(result.rows.lengths===0){
               resolve(null);
            }else {
                resolve(result);
            }
        });
    });
};

const getUserByUsername= (usuario) =>{
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM "user" WHERE usuario = $1',[usuario], (err, result) => {
            if (err) {
                reject(err);
            } else if(result.rows.lengths===0){
               resolve(null);
            }else {
                resolve(result);
            }
        });
    });
}

const loginUser = (usuario, password) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM "user" WHERE usuario = $1 AND contraseña = $2', [usuario, password], 
        (err, result) => {
            if (err) {
                reject(err);
            } else if (result.rows.length === 0) {
                resolve(null);
                console.log("found user");
            } else {
                resolve(result.rows[0]); 
            }
        });
    });
};

const CreateUser = (usuario,password,Nombre) =>{
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO "user"(usuario,contraseña,nombre,rol) VALUES($1,$2,$3,$4)', [usuario, password, Nombre, 2], 
        (err, result) => {
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