import * as React from 'react'
import PropTypes from 'prop-types'

export default (useValue) => {
  const Context = React.createContext()

  const Provider = (props) => {
    const { children } = props
    const value = useValue(props)

    return <Context.Provider value={value}>{children}</Context.Provider>
  }

  Provider.propTypes = {
    children: PropTypes.node.isRequired,
  }

  const useContext = () => React.useContext(Context)

  useContext.Context = Context

  useContext.Provider = Provider

  return useContext
}
