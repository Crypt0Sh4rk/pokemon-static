import { Layout } from '../../components/layouts'
import { NoFavorites } from '../../components/ui'
import { useState, useEffect } from 'react';
import localFavorites from '../../utils/localFavorites';
import { FavoritesPokemons } from '../../components/pokemon';

const FavoritesPage = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritePokemons( localFavorites.pokemons );
  
    return () => {
      //
    }
  }, []);
  

  return (
    <Layout title='Pokémons - Favoritos'>
      {
        favoritePokemons.length === 0
          ? <NoFavorites />
          : ( <FavoritesPokemons pokemons={ favoritePokemons } /> )
      }
      
    </Layout>
  )
}

export default FavoritesPage