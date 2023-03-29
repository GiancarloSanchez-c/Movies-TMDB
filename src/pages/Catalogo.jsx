import React from 'react'
import { useParams } from 'react-router-dom'
import { category as cat } from '../api/tmdbApi'
import { Movies } from '../components'

export const Catalogo = () => {


  const { category } = useParams();

  return (
    <>
      <div className='container'>
        <div className='section'>
          <Movies category = {category} />
        </div>
      </div>
    </>

  )
}
