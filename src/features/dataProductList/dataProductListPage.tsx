import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchDataProducts } from './dataProductListSlice'


export const DataProductListPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchDataProducts())
  }, [dispatch])

  return (
    <div></div>
  )
}