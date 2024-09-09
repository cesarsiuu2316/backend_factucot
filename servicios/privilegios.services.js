const db = require('../db');

const getAllPrivilegios = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM "Privilegios"', (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const getAllPrivilegiosOfUser = (id_user) => {
   
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM "Privilegios_Asignados" WHERE id_user = $1',[id_user], (err, results) => {
            if (err) {
                reject(err);
            } else if (results==null) {
                console.log("No se encontraron privilegios asignados.");
                resolve([]); 
            } else {
                resolve(results);
            }
        });
    });
};

const AsignarPrivilegios = (PrivelgiosData) => {
    const {id_privilegios, id_user } = PrivelgiosData;
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO "Privilegios_Asignados" (id_Privilegios, id_user) VALUES ($1, $2) RETURNING id_Privilegios',
            [id_privilegios, id_user],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id_privilegios: result.id_privilegios, id_user: result.id_user });
                }
            }
        );
    });
};

const QuitarPrivilegios = (id_privilegios, id_user) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM "Privilegios_Asignados" WHERE id_Privilegios = $1 AND id_user = $2', [id_privilegios, id_user], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

module.exports = {
    AsignarPrivilegios,
    QuitarPrivilegios,
    getAllPrivilegios,
    getAllPrivilegiosOfUser
};