export interface Item {
  id: number;
  data: any;
}

export class CrudStore {
  private items: Item[] = [];
  private nextId = 1;

  // CREATE
  create(data: any): Item {
    const item: Item = { id: this.nextId++, data };
    this.items.push(item);
    return item;
  }

  // READ (single)
  get(id: number): Item | undefined {
    return this.items.find((item) => item.id === id);
  }

  // READ ALL
  getAll(): Item[] {
    return [...this.items];
  }

  // UPDATE
  update(id: number, data: any): Item | undefined {
    const item = this.get(id);
    if (!item) return undefined;
    item.data = data;
    return item;
  }

  // DELETE
  delete(id: number): boolean {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) return false;
    this.items.splice(index, 1);
    return true;
  }
}

