require('dotenv').config()

module.exports = () => {
  if (!process.env.ENV) {
    return {
      port: 8082,
      db: {
        database: 'pdiauth',
        user: 'root',
        password: process.env.DB_PASSWORD,
        options: {
          host: 'localhost',
          port: 3306,
          dialect: 'mysql',
          pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
          }
        }
      },
      ssh: {
        username: 'root',
        host: '49.232.28.116',
        port: 22,
        dstHost: 'localhost',
        dstPort: 3306,
        keepAlive: true
      },
      authentication: {
        jwtSecret: 'DawsenSu'
      }
    }
  } else {
    return {
      port: parseInt(process.env.PORT),
      db: {
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        options: {
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT),
          dialect: process.env.BD_DIALECT,
          pool: {
            max: parseInt(process.env.DB_POOL_MAX),
            min: parseInt(process.env.DB_POOL_MIN),
            acquire: parseInt(process.env.DB_POOL_ACQUIRE),
            idle: parseInt(process.env.DB_POOL_IDLE),
          }
        }
      },
      authentication: {
        jwtSecret: process.env.JWT_SECRET
      },
      baseUrl: '/api/v1'
    }
  }
}