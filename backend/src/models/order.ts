import Client from '../database'

export type Order = {
  id?: string
  user_id: string
  status: string
}

export class OrderStore {
  async index(user_id: string): Promise<Order[]> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT * FROM orders WHERE user_id=($1)'

      const result = await conn.query(sql, [user_id])

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`)
    }
  }

  async show(id: string): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)'
      const conn = await Client.connect()

      const result = await conn.query(sql, [id])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`)
    }
  }

  async create(o: Order): Promise<Order> {
    try {
      const sql = 'INSERT INTO orders (status,user_id) VALUES($1, $2) RETURNING *'
      const conn = await Client.connect()

      console.log(o.user_id)
      const result = await conn.query(sql, [o.status, o.user_id])
      const order = result.rows[0]

      conn.release()

      return order
    } catch (err) {
      throw new Error(`Could not add new order; Error: ${err}`)
    }
  }

  async edit(id: String, o: Order): Promise<Order> {
    try {
      const sql = 'UPDATE orders SET user_id=$1, status=$2 WHERE id=$3 RETURNING *'
      const conn = await Client.connect()

      const result = await conn.query(sql, [o.user_id, o.status, id])

      const order = result.rows[0]

      conn.release()

      return order
    } catch (err) {
      throw new Error(`Could not update order ${id}; Error: ${err}`)
    }
  }

  async delete(id: string): Promise<Order> {
    try {
      const sql = 'DELETE FROM orders WHERE id=($1)'
      const conn = await Client.connect()

      const result = await conn.query(sql, [id])

      const order = result.rows[0]

      conn.release()

      return order
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`)
    }
  }

  async addProduct(quantity: number, orderId: string, productId: string): Promise<Order> {
    try {
      const sql =
        'INSERT INTO products_orders (product_id, order_id,quantity) VALUES($1, $2, $3) RETURNING *'
      const conn = await Client.connect()
      const result = await conn.query(sql, [productId, orderId, quantity])
      const order = result.rows[0]

      conn.release()

      return order
    } catch (err) {
      throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
    }
  }
}
