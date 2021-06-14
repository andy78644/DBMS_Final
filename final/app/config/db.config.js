module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "z6901003",
    DB: "db_final",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };