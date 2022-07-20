import React, { useEffect, useState } from 'react'
import Loader from 'assets/Loaders/Loader'
import { getImage } from '../../assets/Loaders/loaderDictionary'

const useLoader = (image) => {
  const [display, setDisplay] = useState(true)

  const { src, timer } = getImage(image)

  useEffect(() => {
    setTimeout(() => {
      setDisplay(false)
    }, timer)
  }, [])

  return (
    display && <Loader src={src} />
  )
}

export default useLoader
