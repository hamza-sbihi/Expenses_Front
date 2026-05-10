import {useState} from 'react'

export type CategoryFormProps = {
    name:string;
    categoryId:number | null;
    onSubmit:(name:string)=>void;
    onClose:()=>void;

}

function CategoryForm(props: CategoryFormProps) {

  const [formData,setFormData] = useState<{name:string}>({name:props.name});
  const isEditMode = props.categoryId !== null;

  return (
    <div className='modal-content'>
        <h2 className='title'>{isEditMode? "Edit Category":"Create Category"}</h2>
      <form className='form' onSubmit={(e)=>
      {e.preventDefault();
       props.onSubmit(formData.name)}}>
            <label>
                Name:
                <input 
                 name = "name"
                 type="text"  
                 value = {formData.name}
                 onChange ={(e)=>{
                    setFormData({...formData,
                        name : e.target.value
                    })
                 }
                }
                 />
            </label>
            <div className='action-buttons'>
                <button  type="submit">
                    {isEditMode ? 'Update' : 'Create'}
                    </button>
                <button onClick = {props.onClose}>close</button>
            </div>
        </form>
    </div>
  )
}


export default CategoryForm

