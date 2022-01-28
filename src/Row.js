import React, {useState, useEffect} from 'react'
import axios from './axios'
import YouTube from 'react-youtube';
import './row.css'
import movieTrailer from 'movie-trailer';


const base_url = "https://image.tmdb.org/t/p/original/";

function Row({title, fetchUrl, isLargeRow}) {
    const[movies, setMovies] = useState([]);
    const[trailerUrl, setTrailerUrl ] = useState("");

    //a code snippet which runs based on spedcific conditions

    useEffect(()=>{

        //we write an async await func
        async function fetchData(){
            
            const request = await axios.get(fetchUrl); 
            //gets the entire url
    
            setMovies(request.data.results);
            return request;
        }

        fetchData();
        
    }, [fetchUrl]); //if the dependency is empty, this code will run only when the row loads and never again


    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        }
    }

    const handleClick = (movie)=>{
        if(trailerUrl){ //trailer already running then on clicking stop it that is settrailer to empty
           setTrailerUrl("");
        }
        else{
            movieTrailer(movie?.name || "") //npm module that is going to find the movie trailer after taking name and promises to return its URL
            .then((url) =>{
                //https://www.youtube.com/watch?v=XTMakjfao34 we just need the id thats why use URL Params
                const urlParams = new URLSearchParams( new URL(url).search);
                setTrailerUrl(urlParams.get('v')); //get anything after v=
            })
            .catch((error)=>{
                console.log(error);
            })
        }
    }

    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className='row__posters'>
                
                
                {movies.map((movie)=>( 
                    //maping through every 'movie', appending the image path to base Url
                    <img key={movie.id} 
                    onClick={()=> handleClick(movie)}
                    className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                    src={`${base_url}${isLargeRow? movie.poster_path:movie.backdrop_path }`} alt={movie.poster_path} />
                ))}

            </div>
            
            {//if trailerUrl is fetched then play trailer
            trailerUrl && <YouTube videoId = {trailerUrl} opts = {opts}/>}
           
        </div>
    )
}

export default Row
