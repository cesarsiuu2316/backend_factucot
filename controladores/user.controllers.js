const userService = require('../servicios/user.services');


const getUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getUserById = async (req, res) => {
    const {id} = req.params;
    try {
        const user = await userService.getUserbyId(id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getUserByUsername = async (req, res) => {
    const {username} = req.params;
    try {
        const user = await userService.getUserByUsername(username);
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const loginUser = async (req, res) => {
    const {usuario, password} = req.body;
    try {
        const user = await userService.loginUser(usuario, password);
        if (user) {
            res.json({ message: 'Login exitoso!', user });
        } else {
            res.status(401).send('usuario or password incorrecto');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const CreateUser = async (req, res) => {
    const {usuario, password, Nombre} = req.body;
    try {
        const newUser = await userService.CreateUser(usuario, password, Nombre);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await userService.deleteUser(id);
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err.message);
    }
};


module.exports = {
    getUsers,
    getUserById,
    getUserByUsername,
    loginUser,
    CreateUser,
    deleteUser
};
