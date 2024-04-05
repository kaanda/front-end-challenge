import axios from "axios";
import Movie from "../interfaces/movie.interface";

const movieById = async (apiKey: string, movieId: number) => {
    const apiUrl = 'https://api.themoviedb.org/3/movie';
    try {
        const response = await axios.get<Movie>(`${apiUrl}/${movieId}?api_key=${apiKey}`);
        return response;
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
    } 
};   

export default movieById

