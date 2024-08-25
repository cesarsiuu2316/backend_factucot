const {Client} = require("pg");
const connectionString ='postgresql://root:F9kwTt3HvqfHkaxxSK3tQMbpq6GGQRdF@dpg-cr56lkdumphs73e1au6g-a.oregon-postgres.render.com/factucot_bd';
const connection2 = 'postgresql://root:F9kwTt3HvqfHkaxxSK3tQMbpq6GGQRdF@dpg-cr56lkdumphs73e1au6g-a/factucot_bd';


const connection = new Client({
    connection2,
    ssl: {
        rejectUnauthorized: false
    }
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to the database');
});

module.exports=connection;
