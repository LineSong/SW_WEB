const mysql = require('mysql2');
const dbConfig = require('./config/database');

// Create the connection pool using the configuration
const pool = mysql.createPool(dbConfig);

const Received = async (NUID) => {
    const promisePool = pool.promise(); 
    const [rows] = await promisePool.query('UPDATE line SET ReceiptConfirmation = 1 WHERE NUID = ?', [NUID]);
    console.log(rows);
    return rows;
};

const NotReceived = async (NUID) => {
    const promisePool = pool.promise(); 
    const [rows] = await promisePool.query('UPDATE line SET ReceiptConfirmation = 0 WHERE NUID = ?', [NUID]);
    console.log(rows);
    return rows;
};

const minusQuantity = async () => {
    const promisePool = pool.promise(); 
    const [rows] = await promisePool.query('UPDATE quantity SET remainingQuantity = remainingQuantity - 1');
    console.log(rows);
    return rows;
};

const setQuantity = async (num) => {
  const promisePool = pool.promise(); 
  const [rows] = await promisePool.query('UPDATE quantity SET remainingQuantity = ?', [num]);
  console.log(rows);
  return rows;
};

const UpdateAlphabet = async (userId, Alphabet) => {
    const promisePool = pool.promise(); 
    const [rows] = await promisePool.query('UPDATE users SET Alphabet = ? WHERE ID = ?', [Alphabet, userId]);
    console.log(rows);
    return rows;
};

  
  
  module.exports = 
  {
      Received, NotReceived, minusQuantity, setQuantity
  };
   