import {useState,useEffect} from 'react'
import {coreApi} from '../../api/coreApi'
import CategoryForm from './CategoryForm'
import './CategoryTable.css'
import CategoryCard from './CategoryCard'

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
    const handleCardUpdate = (updatedCategory: Category) => {
        setEditCategory(updatedCategory);
        setShowForm(true);
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
        <div className='cards'>
        {categories.map((category)=>(
            <CategoryCard category={category} OnDelete={handleDelete} OnUpdate={handleCardUpdate} />
        ))}
        </div>
    </div>
  )
}

export default CategoryTable
