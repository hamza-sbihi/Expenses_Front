import React from 'react'
import type { CategoryFormProps } from './CategoryForm'
import CategoryForm from './CategoryForm'

const CategoryModal = (props:CategoryFormProps) => {
  return (
    <div className='modal-backdrop'>
        <CategoryForm {...props}/>
      
    </div>
  )
}


export default CategoryModal
