import {useState} from 'react'

type CategoryFormProps = {
    name:string;
    categoryId:number | null;
    onSubmit:(name:string)=>void;
    onClose:()=>void;

}

function CategoryForm(props: CategoryFormProps) {

  const [formData,setFormData] = useState<{name:string}>({name:props.name});
  const isEditMode = props.categoryId !== null;

  return (
    <div>
      <form onSubmit={(e)=>
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
            <button  type="submit">
                {isEditMode ? 'Update' : 'Create'}
                </button>
            <button onClick = {props.onClose}>close</button>
        </form>
    </div>
  )
}


export default CategoryForm

