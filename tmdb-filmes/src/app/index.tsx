import Link from 'next/link';
import useFetch from '@/hooks/useFetch.hook';
import Movie from '@/interfaces/movie.interface';

const HomePage: React.FC = () => {
  const apiKey = 'a352517fe7e6d51669a8265b5ee67dab';
  const { movies, isFetching } = useFetch(apiKey, 1);

  if (isFetching) return <div>Carregando...</div>;

  return (
    <div>
      <h1>Lista de Filmes</h1>
      <ul>
        {movies?.map((movie: Movie) => (
          <li key={movie.id}>
            <Link href={`/filmDetails/${movie.id}`}>
              <a>{movie.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
