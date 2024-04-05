'use client'
import React, { useEffect, useState } from "react";
import MovieById from "../../../service/movie.service";
import Movie from "@/interfaces/movie.interface";

interface FilmDetailsPageProps {
  params: { id: string };
}

const FilmDetailsPage: React.FC<FilmDetailsPageProps> = ({ params }) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const apiKey = 'a352517fe7e6d51669a8265b5ee67dab';
 
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const result = await MovieById(apiKey, Number(params.id));
        console.log(result?.data);
        if (result && result.data) {
          // Define o primeiro filme da lista como o filme
          setMovie(result.data);
        } else {
          setMovie(null); // Define null se não houver resultados
        }
      } catch (error) {
        console.error("Erro ao buscar filme:", error);
      }
    };

    fetchMovie();
  }, [params.id]);

  if (!movie) {
    return <div>Filme não encontrado</div>;
  }
  return (
    <div>
      <div>
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
        {/* Adicione aqui os detalhes adicionais do filme que deseja exibir */}
      </div>
    </div>
  );
};

export default FilmDetailsPage;