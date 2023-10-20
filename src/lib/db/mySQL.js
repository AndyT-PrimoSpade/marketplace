
import mysql from "mysql2/promise";

/**
 * @type {Promise<mysql.Connection> | null}
 */
let mysqlconn = null;

/**
 * @param {string} host
 * @param {string} user
 * @param {string} password
 * @param {string} database
 */
export function mysqlconnFn(host, user, password, database) {
  
    if (!mysqlconn) {
    // used for development with MAMP
    mysqlconn = mysql.createConnection({
       host: host,
       user: user,
       password: password,
       database: database,
     });

  }

  return mysqlconn;
}