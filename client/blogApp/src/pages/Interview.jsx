import React, { useEffect, useState } from 'react'

const Interview = () => {
    const arr = ['React','Prisma','Redux'];
    const [item, setItem] = useState(arr);
    const [status, setStatus] = useState(false);
    const[ID, setId] = useState();

    const handleChange = (event,id)=>{
        if(event.target.value==="on"){
            setStatus(true)
        }
        setId(id); 
    }

    const handleDelete = (id) =>{
        console.log(id);
        const newArr = item.filter((elm,ind)=>{
            return ind!= id;
           
        })
        setItem(newArr)
        setStatus(false)

    }
    useEffect(()=>{

    },[item])

  return (
    <>
     <h1>Interviw questions</h1>
     <ul>
     {
        item.map((elm,id)=>{
            return(
                <li key={id} >
                <input type="checkbox" name='check' onChange={()=>handleChange(event,id)}/>
                {elm} { ID==id &&status && <button onClick={()=>handleDelete(id)}>Delete Item</button>}</li>

        )
        })
     }
     </ul>
    </>
  )
}

export default Interview
