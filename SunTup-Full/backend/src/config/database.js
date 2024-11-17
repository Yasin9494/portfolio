const logger = require('./logger');
const { Pool } = require('pg');

class Database {
  static _instance = null;

  constructor() {
    this.pool = null;
  }

  static getInstance() {
    if (!Database._instance) {
      Database._instance = new Database();
    }
    return Database._instance;
  }

  async createPool() {
    if (!this.pool) {
      this.pool = new Pool({
        user: 'gen_user',
        host: 'localhost',
        database: 'default_db',
        password: '290lCx8|3_2:nu',
        port: 5432
      });
      logger.info('Connection to DB is created');
    }
    return this.pool;
  }

  async closeConnection() {
    if (this.pool) {
      await this.pool.end();
      this.pool = null;
      logger.info('Connection to DB is closed');
    } else {
      logger.warn('Trying to close a non-open connection');
    }
  }

  async getData(query, params = []) {
    try {
      if (!this.pool) {
        await this.createPool();
      }
      const result = await this.pool.query(query, params);
      logger.debug(`Executed query: ${query} with params: ${params}`);
      return result.rows;
    } catch (err) {
      logger.error(`Error while fetching list: ${err}`);
      throw err;
    }
  }

  async setData(query, params = []) {
    try {
      if (!this.pool) {
        await this.createPool();
      }
      const result = await this.pool.query(query, params);
      logger.debug(`Executed query: ${query} with params: ${params}`);
      return result;
    } catch (err) {
      logger.error(`Error while executing query: ${err}`);
      throw err;
    }
  }

  async getList(query, params = []) {
    const result = await this.getData(query, params);
    return result;
  }

  async getFetchval(query, params = []) {
    try {
      if (!this.pool) {
        await this.createPool();
      }
      const result = await this.pool.query(query, params);
      logger.debug(`Executed query: ${query} with params: ${params}`);
      if (result.rows.length === 0) {
        return null; // Возвращаем null, если результат пуст
      }
      return result.rows[0][Object.keys(result.rows[0])[0]];
    } catch (err) {
      logger.error(`Error while fetchval list: ${err}`);
      throw err;
    }
  }

  async getAll(query, params = []) {
    return this.getData(query, params);
  }
}

module.exports = Database.getInstance();
