import Client from '../database'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

dotenv.config()
const hashPassword = (password: String) => {
  const salt = parseInt(process.env.SALT_ROUNDS as string, 10)
  const pepper = process.env.BCRYPT_PASSWORD
  return bcrypt.hashSync(`${password}${pepper}`, salt)
}

export type User = {
  id?: string
  firstname: string
  lastname: string
  email: string
  password: string
}

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT id, firstname, lastname, email FROM users'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`)
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = 'SELECT id, firstname, lastname, email FROM users WHERE id=($1)'
      const conn = await Client.connect()
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`)
    }
  }

  async create(u: User): Promise<User> {
    try {
      const sql =
        'INSERT INTO users (firstname, lastname, email, password) VALUES($1, $2, $3, $4) RETURNING id, firstname, lastname, email'
      const conn = await Client.connect()
      const result = await conn.query(sql, [
        u.firstname,
        u.lastname,
        u.email,
        hashPassword(u.password)
      ])
      const user = result.rows[0]
      conn.release()
      return user
    } catch (err) {
      throw new Error(`Could not add new user ${u.firstname}. Error: ${err}`)
    }
  }

  async edit(id: string, u: User): Promise<User> {
    try {
      const sql =
        'UPDATE users SET firstname=$1, lastname=$2, email=$3, password=$4 WHERE id=$5 RETURNING id, firstname, lastname, email'
      const conn = await Client.connect()
      const result = await conn.query(sql, [
        u.firstname,
        u.lastname,
        u.email,
        hashPassword(u.password),
        id
      ])
      const user = result.rows[0]
      conn.release()
      return user
    } catch (err) {
      throw new Error(`Could not update user ${id}. Error: ${err}`)
    }
  }

  async delete(id: string): Promise<User> {
    try {
      const sql = 'DELETE FROM users WHERE id=($1)'
      const conn = await Client.connect()
      const result = await conn.query(sql, [id])
      const user = result.rows[0]
      console.log(user)
      conn.release()
      return user
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`)
    }
  }

  async authenticate(email: string, password: string): Promise<User | null> {
    try {
      const pepper = process.env.BCRYPT_PASSWORD
      const sql = 'SELECT password FROM users WHERE email=($1)'
      const sql2 = 'SELECT id, firstname, lastname, email FROM users WHERE email=($1)'
      const conn = await Client.connect()
      const result = await conn.query(sql, [email])
      if (result.rows.length) {
        const user = result.rows[0]
        if (bcrypt.compareSync(password + pepper, user.password)) {
          const userInfo = await conn.query(sql2, [email])
          return userInfo.rows[0]
        }
      }
      conn.release()
      return null
    } catch (error) {
      throw new Error(`Can not login: ${(error as Error).message}`)
    }
  }
}
