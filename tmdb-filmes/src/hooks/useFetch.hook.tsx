import axios from "axios";
import { useEffect, useState } from "react";

export default function useFetch<T = unknown>(url: string){
    const [movies, setMovies] = useState<T | null>(null);
    const [ isFetching, setIsFetching ] = useState(true);

    useEffect(() => {
        axios.get(url)
        .then(response => {
            setMovies(response.data.results);
        })
        .finally(() => {
            setIsFetching(false);
        })
    }, [])  
    return { movies, isFetching }
}
// fiz um componente de hook genérico para fazer qlqr requisição de api, só passar a url e o tipo de retorno
// a api vai estar dentro do componente que chamar o hook, nesse caso será o page.tsx
// usei a tipagem T para poder passar qlqr tipo de retorno para a api, no caso do tmdb é um array de objetos
