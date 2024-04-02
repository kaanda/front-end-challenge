import axios from "axios";
import { useEffect, useState } from "react";
import Movie from "../interfaces/movie.interface";

interface ApiResponse {
    results: Movie[];
    page: number;
    total_pages: number;
}

export default function useFetch(url: string, initialPage: number):{ 
    movies: Movie[] | null, isFetching: boolean, nextPage: () => void, 
    prevPage: () => void, currentPage: number, totalPages: number,
    goToPage: (page: number) => void } {
        
    const [movies, setMovies] = useState<Movie[] | null>(null);
    const [isFetching, setIsFetching] = useState(true);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<ApiResponse>(`${url}&page=${currentPage}`);
                setMovies(response.data.results);
                setTotalPages(response.data.total_pages);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            } finally {
                setIsFetching(false);
            }
        };

        fetchData();
    }, [url, currentPage]);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToPage = (page: number) => {
        setCurrentPage(page);
    };

    return { movies, isFetching, nextPage, prevPage, currentPage, totalPages, goToPage };
}