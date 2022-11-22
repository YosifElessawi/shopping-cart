import { Order, OrderStore } from '../../models/order'
import Client from '../../database'
import { User, UserStore } from '../../models/user'
const store = new OrderStore()
const userStore = new UserStore()

//Test logic of methods
describe('Test Orders CRUD methods', () => {
  describe('Methods should exist test', () => {
    it('Should have index method', () => {
      expect(store.index).toBeDefined()
    })
    it('Should have show method', () => {
      expect(store.show).toBeDefined()
    })
    it('Should have create method', () => {
      expect(store.create).toBeDefined()
    })
    it('Should have update method', () => {
      expect(store.edit).toBeDefined()
    })
    it('Should have delete method', () => {
      expect(store.delete).toBeDefined()
    })
  })
  describe('Methods logic test', () => {
    const order: Order = {
      user_id: '1',
      status: 'test'
    }
    const user: User = {
      firstname: 'test',
      lastname: 'user',
      email: 'testuser@test.com',
      password: 'testpass'
    }
    beforeAll(async () => {
      const newuser: User = await userStore.create(user)
      user.id = newuser.id
      const newOrder: Order = await store.create(order)
      order.id = newOrder.id
    })
    afterAll(async () => {
      const conn = await Client.connect()
      const sql = 'DELETE FROM Orders'
      await conn.query(sql)
      conn.release()
    })

    it('Should create new Order', async () => {
      const newOrder: Order = await store.create({
        user_id: '1',
        status: 'test2'
      })
      expect(newOrder).toEqual({
        id: newOrder.id as string,
        user_id: '1',
        status: 'test2'
      } as Order)
    })
    it('Should return all Orders', async () => {
      const orders = await store.index(order.id as string)
      expect(orders.length).toBe(2)
    })
    it('Should return one Order with specified ID', async () => {
      const specOrder = await store.show(order.id as string)
      expect(specOrder.id).toBe(order.id)
      expect(specOrder.user_id).toBe(order.user_id)
      expect(specOrder.status).toBe(order.status)
    })
    it('Should update Order with specified ID', async () => {
      const editOrder = await store.edit(order.id as string, {
        user_id: '1',
        status: 'editstatus'
      })
      expect(editOrder.id).toBe(order.id)
      expect(editOrder.user_id).toBe('1')
      expect(editOrder.status).toBe('editstatus')
    })
    it('Should delete Order with specified ID', async () => {
      const delOrder = await store.delete(order.id as string)
      expect(delOrder).toBeFalsy()
    })
  })
})
