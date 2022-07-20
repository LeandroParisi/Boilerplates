import React from 'react'
import Loader from 'assets/Loaders/Loader'
import { getImage } from '../../assets/Loaders/loaderDictionary'

const useLoading = ({ show, image = 'loading', background = '' }) => {
  const { src, bgColor = '' } = getImage(image)

  return (
    show && (
      <Loader src={src} backgroundColor={background || bgColor} centered />
    )
  )
}

export default useLoading
