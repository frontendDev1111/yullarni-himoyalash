import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import './app.css'
import axios from 'axios';
function App() {
let orders = {
  select:"",
  description:"",
  product:[
    
  ]
}
const [modalVisible,setModalVisible] = useState(false)
const [products,setProducts] = useState([])
const [formData,setFormData] = useState(orders)
const [currentItem,setCurrentItem]= useState("")
useEffect(()=>{
getProducts()
},[])
function getProducts(){
  axios({
    url:"http://localhost:3011/products",
    method:"get"
  }).then((res)=>{
    setProducts(res.data)
  })
}
function selectedUser(e){
formData.select = e.target.value
setFormData({...formData})
}
function addProduct(){
  formData.product.push({
    type:"",
    weight:0
  })
  setFormData({...formData})
}
function selectProduct(e,index){
formData.product[index].type=e.target.value
setFormData({...formData})
}
function changeWeight(e,index){
  formData.product[index].weight=e.target.value 
  setFormData({...formData})
}
function handleSave(){


  if(currentItem===""){
    axios({
      url:"http://localhost:3011/products",
      method:"post",
      data:formData
    }).then((res)=>{
     getProducts()
     setFormData(orders)
  
    })
  }else{
    axios({
      url:"http://localhost:3011/products/"+currentItem.id,
      method:"put",
      data:formData
    }).then((res)=>{
      setCurrentItem("")
      setFormData(orders)
     getProducts()
  
    })
  }

  setModalVisible(false)
}

function delItem(index){
  formData.product.splice(index,1)
setFormData({...formData})
}
function DeleteItem(id){
  axios({
    url:"http://localhost:3011/products/"+id,
    method:"delete",
  }).then((res)=>{
   getProducts()

  })
}
function EditItem(item){
  setCurrentItem(item)
  setModalVisible(true)
  setFormData(item)
}
  return (
    <div className='container'>

      <button onClick={()=>setModalVisible(true)} className='btn btn-info'>buyProduct</button>
      <table className='table'>
        <thead className='table-dark'>
          <tr>
            <th>id</th>
            <th>status</th>
            <th>description</th>
            <th>product status</th>
        
            <th>action</th>
          </tr>
        </thead>
        <tbody>
{
  products.map((item,index)=>{
    return <tr key={item.id}>
      <th>{item.id}</th>
      <th>{item.select}</th>
      <th>{item.description}</th>
   <td>
    {item.product.map((item1,index)=>{
      return <li> maxsulot nomi :{item1.type } // {item1.weight} kg</li>

    })}
   </td>
      <td><button onClick={()=>DeleteItem(item.id)} className='btn btn-danger'>delete</button>
      <button onClick={()=>EditItem(item)} className='btn btn-success'>edit</button>
      
      </td>
    </tr>
  })
}
        </tbody>
      </table>
<Rodal height={"auto"} visible={modalVisible} onClose={()=>setModalVisible(false)}>
<select onChange={selectedUser} value={formData.select} className='form-select my-3'>
  <option disabled selected value="">all</option>
  <option value="CREATE">CREATE</option>
  <option value="INPROGRES">INPROGRES</option>
  <option value="COMPLETED">COMPLETED</option>
</select>
<textarea onChange={(e)=>setFormData({...formData,description:e.target.value})} value={formData.description} className='form-control' placeholder='description' cols="30" rows="5"></textarea>
<div>
  {
    formData.product.map((item,index)=>{
      return <div className='d-flex my-3'>
        <select onChange={(e)=>selectProduct(e,index)} value={item.type} className='form-select'>
          <option disabled selected value="">all product</option>
          <option value="OLMA">olma</option>
          <option value="ANOR">anor</option>
          <option value="MANDARIN">mandarin</option>
          <option value="LIMON">limon</option>
        </select>
        <input onChange={(e)=>changeWeight(e,index)}  value={item.weight} className='form-control ' type="number" placeholder='enter kg' />
        <button onClick={()=>delItem(index)} className='btn btn-danger'>X</button>

      </div>
    })
  }
</div>

<button onClick={addProduct} className='btn btn-warning my-3'>addProduct</button>
<br />

<button onClick={handleSave} className='btn btn-success my-5 '>save</button>
</Rodal>
    </div>
  );
}

export default App;
