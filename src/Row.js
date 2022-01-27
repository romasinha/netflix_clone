import React, {useState, useEffect} from 'react'
import axios from './axios'
import './row.css'

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({title, fetchUrl, isLargeRow}) {
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
            <h2>{title}</h2>
            <div className='row__posters'>
                
                
                {movies.map(movie=>( 
                    //maping through every 'movie', appending the image path to base Url
                    <img key={movie.id} 
                    className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                    src={`${base_url}${isLargeRow? movie.poster_path:movie.backdrop_path }`} alt={movie.poster_path} />
                ))}

            </div>
           
        </div>
    )
}

export default Row
