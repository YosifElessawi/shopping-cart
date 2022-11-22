import { Request, Response } from 'express'
import { Product, ProductStore } from '../models/product'

const store = new ProductStore()
export const index = async (_req: Request, res: Response) => {
  const Products = await store.index()
  res.json(Products)
}

export const show = async (req: Request, res: Response) => {
  const product = await store.show(req.params.id)
  res.json(product)
}

export const create = async (req: Request, res: Response) => {
  try {
    const product: Product = await store.create(req.body)
    res.json({
      status: 'Successful',
      data: { product }
    })
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const product: Product = await store.edit(req.params.id, req.body)
    res.json({
      status: 'Successful',
      data: { product }
    })
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

export const destroy = async (req: Request, res: Response) => {
  const deleted: Product = await store.delete(req.params.id)
  res.json({
    status: 'Successful'
  })
}
