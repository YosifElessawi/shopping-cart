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
  username: string
  pwd: string
}

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT id, username FROM users'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`)
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = 'SELECT id, username FROM users WHERE id=($1)'
      const conn = await Client.connect()
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`)
    }
  }

  async create(u: User): Promise<User | null> {
    try {
      const sql = `SELECT username FROM users WHERE EXISTS (SELECT username FROM users WHERE username='${u.username}')`
      const conn = await Client.connect()
      let result = await conn.query(sql)
      let user = result.rows[0]
      console.log(user)
      if (!user) {
        result = await conn.query(
          'INSERT INTO users (username, pwd) VALUES($1, $2) RETURNING id, username',
          [u.username, hashPassword(u.pwd)]
        )
        user = result.rows[0]
        console.log(user)
        return user
      }
      return null
      conn.release()
    } catch (err) {
      throw new Error(`Could not add new user ${u.username}. Error: ${err}`)
    }
  }

  async edit(id: string, u: User): Promise<User> {
    try {
      const sql =
        'UPDATE users SET username=$1, pwd=$2 WHERE id=$3 RETURNING id, firstname, lastname, email'
      const conn = await Client.connect()
      const result = await conn.query(sql, [u.username, hashPassword(u.pwd), id])
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

  async authorize(u: User): Promise<User | null> {
    try {
      const pepper = process.env.BCRYPT_PASSWORD
      const sql = 'SELECT pwd FROM users WHERE username=($1)'
      const conn = await Client.connect()
      console.log(u.username)
      const result = await conn.query(sql, [u.username])
      if (result.rows.length) {
        console.log('hena')
        const user = result.rows[0]
        if (bcrypt.compareSync(u.pwd + pepper, user.pwd)) {
          return user
        }
      }
      conn.release()
      return null
    } catch (error) {
      throw new Error(`Can not login: ${(error as Error).message}`)
    }
  }
}
