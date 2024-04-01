'use client'
import useFetch from '../hooks/useFetch.hook';

type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

export default function Home() {
  const { movies, isFetching } = 
    useFetch<Movie[]>('https://api.themoviedb.org/3/movie/popular?api_key=a352517fe7e6d51669a8265b5ee67dab&language=pt-BR&page=1');

  return (
    <div>
      <h1>TMDB Filmes</h1>
      <ul>
        {isFetching && <p>Carregando...</p>}
        {movies?.map(movie => (
          <li key={movie.id}>
            <h2>{movie.title}</h2>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <p>{movie.overview}</p>
            <p>{movie.release_date}</p>
            <p>{movie.vote_average}</p>
          </li>
        ))}
      </ul>

    </div>
    
    );
  }
  
  // const options = {
  //   method: 'GET',
  //   headers: {
  //     accept: 'application/json',
  //     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzUyNTE3ZmU3ZTZkNTE2NjlhODI2NWI1ZWU2N2RhYiIsInN1YiI6IjY2MGFiNjM5MGI1ZmQ2MDE2MjM2MjAyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KSm6o5Kb9644iG85dZqq8qSEx_w0QVbyO1tBU1sDYCM'
  //   }
  // };
  
  // fetch('https://api.themoviedb.org/3/configuration', options)
  //   .then(response => response.json())
  //   .then(response => console.log(response))
  //   .catch(err => console.error(err));