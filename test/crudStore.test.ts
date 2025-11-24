// test/crudstore.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { CrudStore, type Item } from '../src'

describe('CrudStore', () => {
  let store: CrudStore

  beforeEach(() => {
    store = new CrudStore()
  })

  it('should create an item', () => {
    const item: Item = store.create('sdf')
    expect(item).toEqual({ id: 1, data: 'sdf' })
    expect(store.getAll()).toEqual([{ id: 1, data: 'sdf' }])
  })

  it('should get an item by id', () => {
    store.create('sdf')
    const item = store.get(1)
    expect(item).toEqual({ id: 1, data: 'sdf' })
  })

  it('should update an item', () => {
    store.create('sdf')
    store.update(1, 'xxxx')
    expect(store.get(1)?.data).toBe('xxxx')
    expect(store.getAll()).toEqual([{ id: 1, data: 'xxxx' }])
  })

  it('should update a none existing item', () => {
    store.create('sdf')
    expect(store.update(10, 'xxxx')).toBeUndefined()
    expect(store.get(1)?.data).toBe('sdf')
    expect(store.getAll()).toEqual([{ id: 1, data: 'sdf' }])
  })

  it('should delete an item', () => {
    store.create('sdf')
    store.create('asdf')
    store.delete(1)
    expect(store.getAll()).toEqual([{ id: 2, data: 'asdf' }])
  })

  it('should delete a none existing item', () => {
    store.create('asdf')
    expect(store.delete(10)).toBe(false)
    expect(store.getAll()).toEqual([{ id: 1, data: 'asdf' }])
  })

  it('should maintain auto-incrementing ids', () => {
    const first = store.create('first')
    const second = store.create('second')
    expect(first.id).toBe(1)
    expect(second.id).toBe(2)
  })
})

