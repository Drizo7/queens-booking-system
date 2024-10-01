// database/knexfile.js
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './hospital.db'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './migrations'
    }
  }
};
