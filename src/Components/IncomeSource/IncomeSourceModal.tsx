import type { IncomeSourceFormProps } from './IncomeSourceForm'
import IncomeSourceForm from './IncomeSourceForm'
import './IncomeSourceModal.css'


const IncomeSourceModal = (props:IncomeSourceFormProps) => {
  return (
    <div className='modal-backdrop'>
        <IncomeSourceForm {...props}/>
      
    </div>
  )
}


export default IncomeSourceModal
