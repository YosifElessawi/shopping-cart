import Client from '../database'

export type Product = {
  id?: string
  pname: string
  price: number
}

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT * FROM products'

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`)
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)'
      const conn = await Client.connect()

      const result = await conn.query(sql, [id])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`)
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      const sql = 'INSERT INTO products (pname, price) VALUES($1, $2) RETURNING *'
      const conn = await Client.connect()

      const result = await conn.query(sql, [p.pname, p.price])

      const product = result.rows[0]

      conn.release()

      return product
    } catch (err) {
      throw new Error(`Could not add new product Error: ${err}`)
    }
  }

  async edit(id: String, p: Product): Promise<Product> {
    try {
      const sql = 'UPDATE products SET pname=$1, price=$2 WHERE id=$3 RETURNING *'
      const conn = await Client.connect()

      const result = await conn.query(sql, [p.pname, p.price, id])

      const product = result.rows[0]

      conn.release()

      return product
    } catch (err) {
      throw new Error(`Could not update product ${id}. Error: ${err}`)
    }
  }

  async delete(id: string): Promise<Product> {
    try {
      const sql = 'DELETE FROM products WHERE id=($1)'
      const conn = await Client.connect()

      const result = await conn.query(sql, [id])

      const product = result.rows[0]

      conn.release()

      return product
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`)
    }
  }
}
