import React, {useState, useEffect} from 'react'
import axios from './axios'

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({title, fetchUrl}) {
    const[movies, setMovies] = useState([]);

    //a code snippet which runs based on spedcific conditions

    useEffect(()=>{

        //we write an async await func
        async function fetchData(){
            const request = await axios.get(fetchUrl); //gets the entire url
            setMovies(request.data.results);
            return request;
        }

        fetchData();
        
    }, [fetchUrl]); //if the dependency is empty, this code will run only when the row loads and never again


    return (
        <div className='row'>
            <div className='row_posters'>

                {movies.map(movie=>(
                    <img src={`${base_url}${movie.poster_path}`} alt={movie.poster_path} />
                ))}

            </div>
           
        </div>
    )
}

export default Row
