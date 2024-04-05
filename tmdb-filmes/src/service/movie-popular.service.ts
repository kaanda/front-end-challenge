import axios from "axios";
import Movie from "../interfaces/movie.interface";

interface ApiResponse {
    results: Movie[];
    page: number;
    total_pages: number;
    total_results: number;
}

const movieListPopular = async (apiKey: string, currentPage: number) => {
    const apiUrl = 'https://api.themoviedb.org/3/movie/popular';
    const url = `${apiUrl}?api_key=${apiKey}&page=${currentPage}`
    try {
        const response = await axios.get<ApiResponse>(url);
        return (response.data);
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
    } 
};   

export { movieListPopular }