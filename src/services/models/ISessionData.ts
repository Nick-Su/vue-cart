import { IProductCartItem } from './IProductCartItem'

export interface ISessionData {
  sessionId: string,
  alias: number,
  trunstile: [],
  products: IProductCartItem[],
  isSubmitted: boolean
}
