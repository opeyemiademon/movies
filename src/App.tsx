
import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import { sortMovies } from './component/includes';

function App() {

  interface Movies {
    name: string,
    summary: string,
    images:string,
    first_release_date:number

}
  const apiUrl = 'https://adaorachi.github.io/esetech-assessment-api/game-data.json';
  const [movies, setMovies] = useState([])
  const [movieList, setMovieList] = useState([])
  const [search, setSearch] = useState({
      title:'',
      sort:''
  })

  
      
const clearItem =()=>{
 // setMovies(movieList)

  setSearch({
    title:'',
      sort:''
  })
  fetchMovies()
}


const handleChangeSelect = (event:ChangeEvent<HTMLSelectElement>) =>{	
  let {name, value} = event.target;		
 setSearch({...search, [name] : value });
 if (name==='release'){
   setMovies(movies.sort((a:any, b:any) =>(Number(a.first_release_date) > Number(b.first_release_date)) ? 1 : -1))
 }else{
  setMovies(movies.sort((a:any, b:any) =>(Number(a.rating) > Number(b.rating)) ? 1 : -1))
 }
}


  const handleChange = (event:ChangeEvent<HTMLInputElement>) =>{	
    let {name, value} = event.target;	
    setSearch({...search, title:value})
const newMovies = [...movies]
    const newList = movies.filter((item:any) => item.name.toLowerCase().match(value))
    //const newList = movies.filter((item:any) => item.title.includes(value))

   
     if(value==''){
      setMovies(newMovies)
    }else{
      setMovies(newList)
    } 
    
}


  const fetchMovies = async()=>{

    await  axios.get(apiUrl).then((result:any)=>{
        if(Array.isArray(result.data)&&result.data.length!==0){
          setMovieList(result.data)
          setMovies(result.data)
        }
    })
}

useEffect(()=>{
  fetchMovies()

   },[]);
  return (
    <div className="container">
      <div className="mt-20" style={{ height:'30px' }}>


      </div>
    <div className="row ">

    <div className="col-md-4">

    <div className="card" >
  <div className="card-body">
    <h5 className="card-title">Filter Results</h5>
    <p className="card-text">Name (contains)</p>
<input className='form-control' name='title' placeholder='Text String' value={search.title} onChange={handleChange} />



<p className="card-text">Order By</p>
<select className='form-control mb-3' name='sort' onChange={handleChangeSelect} value={search.sort}>
  <option selected disabled></option>
  <option value='release'>Release Date</option>
  <option value='Ratings'>Ratings</option>
</select>


    <button type='button' onClick={clearItem} className="btn btn-info pull-right">Clear</button>
  </div>
</div>

    </div>

<div className="col-md-8">
{movies&&movies.map((item:any, id)=>
<div className="card mb-4" key={id} >
  <div className="card-body">
  <img className="card-img-top" style={{ height:'100px', width:'100px' }} src="https://static.wikia.nocookie.net/ideas/images/e/e4/Movie_night.jpg" alt="Image" />
    <h5 className="card-title">{ item.name}</h5>
    <span>Release Date: {new Date(item.first_release_date).toISOString().slice(0,10)}</span>
    <p className="card-text"> { item.summary.length>150?item.summary.slice(0, 150)+'...':item.summary}</p>
  </div>
</div>
)}



    </div>

    </div>

    </div>
  );
}

export default App;
