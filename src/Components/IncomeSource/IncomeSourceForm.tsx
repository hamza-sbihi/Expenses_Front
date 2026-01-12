import {useState} from 'react'

type IncomeSourceFormProps = {
    name:string;
    sourceId:number | null;
    onSubmit:(name:string)=>void;
    onClose:()=>void;

}

function IncomeSourceForm(props: IncomeSourceFormProps) {

  const [formData,setFormData] = useState<{name:string}>({name:props.name});
  const isEditMode = props.sourceId !== null;

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


export default IncomeSourceForm

