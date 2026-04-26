import {useState} from 'react'
import './IncomeSourceForm.css'

export type IncomeSourceFormProps = {
    name:string;
    sourceId:number | null;
    onSubmit:(name:string)=>void;
    onClose:()=>void;

}

function IncomeSourceForm(props: IncomeSourceFormProps) {

  const [formData,setFormData] = useState<{name:string}>({name:props.name});
  const isEditMode = props.sourceId !== null;

  return (
    <div className='modal-content'>
      <h3 className='title'>{!isEditMode? 'Create new Source':'Update Source'}</h3>

      <form className='modal-input' onSubmit={(e)=>
      {e.preventDefault();
       props.onSubmit(formData.name)}}>
                <label >
                    Name:
                    <input 
                    name = "name"
                    type="text"  
                    placeholder='Name'
                    value = {formData.name}
                    onChange ={(e)=>{
                        setFormData({...formData,
                            name : e.target.value
                        })
                    }
                    }
                    />
                </label>
            <div className="action-button">
                <button  type="submit">
                    {isEditMode ? 'Update' : 'Create'}
                    </button>
                <button onClick = {props.onClose}>close</button>
            </div>
        </form>
    </div>
  )
}


export default IncomeSourceForm

