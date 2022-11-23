import { Request, Response } from 'express'
import { Order, Product_Order, OrderStore } from '../models/order'

const store = new OrderStore()
export const index = async (req: Request, res: Response) => {
  const orders = await store.index(req.body.user_id)
  res.json(orders)
}

export const show = async (req: Request, res: Response) => {
  const order: Order = await store.show(req.params.id)
  res.json(order)
}

export const create = async (req: Request, res: Response) => {
  try {
    const order: Order = await store.create(req.body)
    res.json({
      status: 'Successful',
      data: { order }
    })
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const order: Order = await store.edit(req.params.id, req.body)
    res.json({
      status: 'Successful',
      data: { order }
    })
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

export const destroy = async (req: Request, res: Response) => {
  const deleted: Order = await store.delete(req.params.id)
  res.json({
    status: 'Successful'
  })
}

export const addProduct = async (req: Request, res: Response) => {
  let productOrder: Product_Order = {
    product_id: req.params.id,
    order_id: req.body.product_id,
    quantity: req.body.quantity
  }
  try {
    const addedProduct = await store.addProduct(productOrder)
    res.json(addedProduct)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}
