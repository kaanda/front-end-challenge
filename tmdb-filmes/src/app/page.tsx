
import Table from '../components/Table';
import 'tailwindcss/tailwind.css'
import Link from 'next/link';
import Logo from '@/components/Logo';


export default function Home() {

  
  return (
    <div>
      <div>
        <Logo height='39px' width='300px'/>
      </div>

      <h1>TMDB Filmes</h1>

      <Table />
     

      {/* <Link href={} /> */}
        
    </div>
    
    );
  }