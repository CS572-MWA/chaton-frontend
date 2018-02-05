import { createStore, compose, StoreEnhancer } from 'redux'
import { reducer } from './reducer'
import { IUserState } from './state'

const devtools: StoreEnhancer<IUserState> =
  window['devToolsExtension'] ?
  window['devToolsExtension']() : f => f;

export const store = createStore(reducer, compose(devtools));