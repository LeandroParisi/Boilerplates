import { useState } from 'react'
import rootActions from './actions'
import rootSelectors from './selectors'
import useCreateStore from '../useCreateStore'

const initialState = {
  teste: 1,

}

const RootStore = useCreateStore(() => {
  const [$root, setRoot] = useState(initialState)
  const actions = rootActions(setRoot)
  const selectors = rootSelectors($root)

  return { $root, ...actions, ...selectors }
})

export const useRoot = () => RootStore()
export const RootContext = RootStore.Context
export const RootProvider = RootStore.Provider
