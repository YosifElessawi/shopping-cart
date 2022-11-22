import { Product, ProductStore } from '../../models/product'
import Client from '../../database'

const store = new ProductStore()

//Test logic of methods
describe('Test Products CRUD methods for', () => {
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
    const product: Product = {
      pname: 'testprod',
      price: 10
    }
    beforeAll(async () => {
      const newproduct = await store.create(product)
      product.id = newproduct.id
    })
    afterAll(async () => {
      const conn = await Client.connect()
      const sql = 'DELETE FROM products'
      await conn.query(sql)
      conn.release()
    })

    it('Should create new product', async () => {
      const newproduct: Product = await store.create({
        pname: 'testprod2',
        price: 12
      })
      expect(newproduct).toEqual({
        id: newproduct.id as string,
        pname: 'testprod2',
        price: 12
      } as Product)
    })
    it('Should return all products', async () => {
      const products = await store.index()
      expect(products.length).toBe(2)
    })
    it('Should return one product with specified ID', async () => {
      const specproduct = await store.show(product.id as string)
      expect(specproduct.id).toBe(product.id)
      expect(specproduct.pname).toBe(product.pname)
      expect(specproduct.price).toBe(product.price)
    })
    it('Should update product with specified ID', async () => {
      const editproduct = await store.edit(product.id as string, {
        pname: 'testprodedit',
        price: 14
      })
      expect(editproduct.id).toBe(product.id)
      expect(editproduct.pname).toBe('testprodedit')
      expect(editproduct.price).toBe(14)
    })
    it('Should delete product with specified ID', async () => {
      const delproduct = await store.delete(product.id as string)
      expect(delproduct).toBeFalsy()
    })
  })
})
