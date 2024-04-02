'use client'
import React from 'react';
import useFetch from "@/hooks/useFetch.hook";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Table: React.FC = () => {
    const { movies, isFetching, nextPage, prevPage, currentPage, totalPages, goToPage } 
    = useFetch('https://api.themoviedb.org/3/movie/popular?api_key=a352517fe7e6d51669a8265b5ee67dab&language=pt-BR', 1);

    const renderReleaseDate = (releaseDate: string) => {
        const formattedDate = new Date(releaseDate);
        return format(formattedDate, 'dd MMM yyyy', { locale: ptBR });
    };

    const renderPageButtons = () => {
        const buttons = [];
        const numPagesToShow = 5; 
        let startPage = Math.max(1, currentPage - Math.floor(numPagesToShow / 2));
        let endPage = Math.min(totalPages, startPage + numPagesToShow - 1);

        if (endPage - startPage + 1 < numPagesToShow) {
            startPage = Math.max(1, endPage - numPagesToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => goToPage(i)}
                    className={`mx-1 px-3 py-1 rounded-lg 
                    ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                    {i}
                </button>
            );
        }

        // Adicionar botão "Última" se houver mais de uma página
        if (totalPages > 1) {
            buttons.push(
                <button
                    key="last"
                    onClick={() => goToPage(totalPages)}
                    className="mx-1 px-3 py-1 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                    Última
                </button>
            );
        }

        return buttons;
    };

    return (
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
                {isFetching && <p>Carregando...</p>}
                {movies?.map(movie => (
                    <div key={movie.id} className="bg-gray-200 p-4 rounded-lg">
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-auto" />
                        <h2 className="text-lg font-bold mt-2">{movie.title}</h2>
                        <p className="text-sm">{renderReleaseDate(movie.release_date)}</p>
                    </div>
                ))}
            </div>
            <div className="flex justify-center items-center mt-4">
                <button onClick={prevPage} 
                disabled={isFetching} 
                className="mx-1 px-3 py-1 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300">Anterior</button>
                {renderPageButtons()}
                <button onClick={nextPage} 
                disabled={isFetching} 
                className="mx-1 px-3 py-1 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300">Próxima</button>
            </div>
        </div>
    );
}

export default Table;
