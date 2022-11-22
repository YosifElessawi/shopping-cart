import { User, UserStore } from '../../models/user'
import Client from '../../database'

const store = new UserStore()
describe('Test ALL users methods', async () => {
  describe('Test Authentication method', () => {
    it('Should have authenticate method', () => {
      expect(store.authenticate).toBeDefined()
    })
    const user: User = {
      firstname: 'test',
      lastname: 'user',
      email: 'testuser@test.com',
      password: 'testpass'
    }

    beforeAll(async () => {
      const newuser = await store.create(user)
      user.id = newuser.id
    })

    afterAll(async () => {
      const conn = await Client.connect()
      const sql = 'DELETE FROM users'
      await conn.query(sql)
      conn.release()
    })

    it('Should return user for authenticated users', async () => {
      const authuser = await store.authenticate(user.email, user.password)
      expect(authuser?.firstname).toBe(user.firstname)
      expect(authuser?.lastname).toBe(user.lastname)
      expect(authuser?.email).toBe(user.email)
    })
  })

  //Test logic of methods
  describe('Test Users CRUD methods ', () => {
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
      const user: User = {
        firstname: 'test',
        lastname: 'user',
        email: 'testuser@test.com',
        password: 'testpass'
      }
      beforeAll(async () => {
        const newuser = await store.create(user)
        user.id = newuser.id
      })
      afterAll(async () => {
        const conn = await Client.connect()
        const sql = 'DELETE FROM users'
        await conn.query(sql)
        conn.release()
      })

      it('Should create new user', async () => {
        const newuser: User = await store.create({
          firstname: 'test2',
          lastname: 'user2',
          email: 'testuser2@test.com',
          password: 'testpass2'
        })
        expect(newuser).toEqual({
          id: newuser.id as string,
          firstname: 'test2',
          lastname: 'user2',
          email: 'testuser2@test.com'
        } as User)
      })
      it('Should return all users', async () => {
        const users = await store.index()
        expect(users.length).toBe(2)
      })
      it('Should return one user with specified ID', async () => {
        const specuser = await store.show(user.id as string)
        expect(specuser.id).toBe(user.id)
        expect(specuser.firstname).toBe(user.firstname)
        expect(specuser.lastname).toBe(user.lastname)
        expect(specuser.email).toBe(user.email)
      })
      it('Should update user with specified ID', async () => {
        const edituser = await store.edit(user.id as string, {
          firstname: 'testedit',
          lastname: 'testedit',
          email: 'testedit@user.com',
          password: 'passedit'
        })
        expect(edituser.id).toBe(user.id)
        expect(edituser.firstname).toBe('testedit')
        expect(edituser.lastname).toBe('testedit')
        expect(edituser.email).toBe('testedit@user.com')
      })
      it('Should delete user with specified ID', async () => {
        const deluser = await store.delete(user.id as string)
        expect(deluser).toBeFalsy()
      })
    })
  })
})
