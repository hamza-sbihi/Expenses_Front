import {useState,useEffect} from 'react'
import {coreApi} from '../../api/coreApi'
import CategoryForm from './CategoryForm'
import './CategoryTable.css'

type Category = {
  id: number;
  name: string;
}
type FormData = {
    name: string;
}

const CategoryTable = () => {
    const [categories,setCategories] = useState<Category[]>([]);
    const [showForm,setShowForm] = useState<boolean>(false);
    const [editCategory,setEditCategory] = useState<Category | null>(null);

    //fetch all categories from the backend
    const fetchData = async () =>{
        try{
            const responseCategories = await coreApi.category.getCategories();
            setCategories(responseCategories.data);
        }
        catch(error){
            console.error('Error fetching categories:', error);
        }
    }
    useEffect(() =>{
        
        fetchData();
        
    },[])
    const handleCreate = async (name:string)=> {
        try{
            const created = await coreApi.category.createCategory({name});
            //adding the newly created category to the list
            setCategories([...categories, created.data]);
        }
        catch(error){
            console.error('Error creating category:', error);
        }
        // Making sure the form data is reseted

        setShowForm(false);
    }
    const handleDelete = async (categoryId : number) =>{
        try{
            await coreApi.category.deleteCategory(categoryId);
            //filtering the deleted category from the list
            setCategories(categories.filter(category=>category.id !== categoryId));
        }
        catch(error){
            console.error('Error deleting category:', error);
        }
    }
    const handleUpdate = async (name:string) =>{

        try{
            if(editCategory){
            await coreApi.category.updateCategory(editCategory.id,{name});
            setCategories(categories.map(category=>category.id === editCategory.id ? {...category, name} : category));

            }
            else{
                throw new Error("No category selected for update");
            }
        }
        catch(error){
            console.error('Error updating category:', error);
        }
        //resetting the form data
        setShowForm(false);
        setEditCategory(null);

    }
    
  return (
    <div>
      <div className = "category-header">
      <h2>Categories</h2>
      {!showForm && <button onClick ={()=>{
        setShowForm(true);
        setEditCategory(null);}
        }>Add Category</button>}
      {showForm && (
        <CategoryForm
            name = {editCategory ? editCategory.name : ''}
            categoryId={editCategory? editCategory.id:null}
            onSubmit = {!editCategory ? handleCreate: handleUpdate}
            onClose = {()=>{
                setShowForm(false);
                setEditCategory(null);  
            }}
            />
        
      )}
      </div>
        <table className='category-table'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {categories.map((category)=>(
                    <tr key = {category.id}>
                        <td>{category.id}</td>
                        <td>{category.name}</td>
                        <td className='action-buttons'>
                            <button onClick = {() =>{
                                setShowForm(true);
                                setEditCategory(category);

                            }}>Edit</button>

                            <button onClick = {()=>{handleDelete(category.id)}}>Delete</button>                   
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default CategoryTable
