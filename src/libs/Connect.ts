import { url } from "../const/api";
import { Model } from "../const/model";
import { TData } from "../types/data";

const fetchOptions: RequestInit = {
  method: 'GET',
  // mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
  },
}

export class Connect {
  async find<T>(model: Model): Promise<T[] | null> {
    const response = await fetch(`${url}/${model}`, fetchOptions)
    return await response.json();
  }

  async findOne<T>(model: Model, id: number): Promise<T | null> {
    const response = await fetch(`${url}/${model}/${id}`,fetchOptions)
    return await response.json();
  }

  async update<T>(model: Model, data: TData): Promise<T | null> {
    const response = await fetch(`${url}/${model}/${data.id}`, {
      ...fetchOptions,
      method: 'PUT',
      body: JSON.stringify(data)
    })
    return await response.json();
  }

  async insert<T>(model: Model, data: TData): Promise<T | null> {
    const response = await fetch(`${url}/${model}`, {
      ...fetchOptions,
      method: 'POST',
      body: JSON.stringify(data)
    })
    return await response.json();
  }

  async insertOrUpdate<T>(model: Model, data: TData): Promise<T | null> {
    if ('id' in data && (data.id || 0) > 0) {
      return this.update(model, data)
    } else {
      return this.insert(model, data)
    }
  }

  async remove<T>(model: Model, id: number): Promise<T> {
    const response = await fetch(`${url}/${model}/${id}`, {
      ...fetchOptions,
      method: 'DELETE',
    })
    return await response.json();
  }
}
