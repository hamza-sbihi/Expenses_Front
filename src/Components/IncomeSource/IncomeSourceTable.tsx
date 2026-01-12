import {useState,useEffect} from 'react'
import {coreApi} from '../../api/coreApi'
import './IncomeSourceTable.css'
import IncomeSourceForm from './IncomeSourceForm';
import IncomeSourceCard from './IncomeSourceCard';

type Source = {
  id: number;
  name: string;
}
type FormData = {
    name: string;
}

const IncomeSourceTable = () => {
    const [sources,setSources] = useState<Source[]>([]);
    const [showForm,setShowForm] = useState<boolean>(false);
    const [editSource,setEditSource] = useState<Source | null>(null);

    //fetch all categories from the backend
    const fetchData = async () =>{
        try{
            const responseSources = await coreApi.incomeSource.getSources();
            setSources(responseSources.data);
        }
        catch(error){
            console.error('Error fetching sources:', error);
        }
    }
    useEffect(() =>{
        
        fetchData();
        
    },[])
    const handleCreate = async (name:string)=> {
        try{
            const created = await coreApi.incomeSource.createSource(name);
            //adding the newly created source to the list
            setSources([...sources, created.data]);
        }
        catch(error){
            console.error('Error creating source:', error);
        }
        // Making sure the form data is reseted

        setShowForm(false);
    }
    const handleDelete = async (sourceId : number) =>{
        try{
            await coreApi.incomeSource.deleteSource(sourceId);
            //filtering the deleted category from the list
            setSources(sources.filter(source=>source.id !== sourceId));
        }
        catch(error){
            console.error('Error deleting source :', error);
        }
    }
    const handleUpdate = async (name:string) =>{

        try{
            if(editSource){
            await coreApi.incomeSource.updateSource(editSource.id,{name});
            setSources(sources.map(source=>source.id === editSource.id ? {...source, name} : source));

            }
            else{
                throw new Error("No source selected for update");
            }
        }
        catch(error){
            console.error('Error updating source:', error);
        }
        //resetting the form data
        setShowForm(false);
        setEditSource(null);

    }
    const handleCardUpdate = (updatedSource: Source) => {
        console.log("here");
        console.log(updatedSource);
        setEditSource(updatedSource);
        setShowForm(true);
    }
    
  return (
    <div>
      <div className = "source-header">
      <h2>Income Sources</h2>
      {!showForm && <button onClick ={()=>{
        setShowForm(true);
        setEditSource(null);}
        }>Add Source</button>}
      {showForm && (
        <IncomeSourceForm
            name = {editSource ? editSource.name : ''}
            sourceId={editSource? editSource.id:null}
            onSubmit = {!editSource ? handleCreate: handleUpdate}
            onClose = {()=>{
                setShowForm(false);
                setEditSource(null);  
            }}
            />
        
      )}
      </div>
        <div className='cards'>
        {sources.map((source)=>(
            <IncomeSourceCard key={source.id} source={source} OnDelete={handleDelete} OnUpdate={handleCardUpdate} />
        ))}
        </div>
    </div>
  )
}

export default IncomeSourceTable
