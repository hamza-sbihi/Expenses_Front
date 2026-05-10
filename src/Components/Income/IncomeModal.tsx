import type{ IncomeFormProps } from './IncomeForm'
import IncomeForm from './IncomeForm'


const IncomeModal = (props:IncomeFormProps) => {
  return (
    <div className='modal-backdrop'>
      <IncomeForm {...props}/>
    </div>
  )
}



export default IncomeModal
