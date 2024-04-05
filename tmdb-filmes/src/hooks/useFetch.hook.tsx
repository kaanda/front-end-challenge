import { useState } from "react";
import Movie from "../interfaces/movie.interface";
import { movieListPopular } from "../service/movie-popular.service";

export default function useFetch(apiKey: string, initialPage: number):{ 
    movies: Movie[] | null | undefined, 
    isFetching: boolean, 
    nextPage: () => void, 
    prevPage: () => void, 
    currentPage: number | undefined, 
    totalPages: number | undefined,
    goToPage: (page: number) => void,
    fetchData: () => void} {

    const [movies, setMovies] = useState<Movie[] | null | undefined>(null);
    const [isFetching, setIsFetching] = useState(true);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [totalPages, setTotalPages] = useState<number | undefined>(0);
    const apiUrl = 'https://api.themoviedb.org/3/movie/popular';

   
    const fetchData = async () => {
        try {
            const response = await movieListPopular(apiKey, currentPage);
            setMovies(response?.results);
            setTotalPages(response?.total_pages);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        } finally {
            setIsFetching(false);
        }
    };    

    const nextPage = () => {
        if (totalPages && currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }else {
            setCurrentPage(1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToPage = (page: number) => {
        if (totalPages && page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return { movies, isFetching, nextPage, prevPage, currentPage, totalPages, goToPage, fetchData };
}