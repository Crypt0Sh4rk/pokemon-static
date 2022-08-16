const toggleFavorite = ( id: number ) => {

    // console.log('toggleFavorite Llamado')

    // Intentar grabar en el localStorage
    let favorites: number[] = JSON.parse( localStorage.getItem('favorites') || '[]' );

    if ( favorites.includes( id )) {
        // excluir todos los pokémon que tengan ese id
        favorites = favorites.filter( pokeId => pokeId !== id )
    } else {
        favorites.push( id );
    }

    // Update localStorage
    localStorage.setItem('favorites', JSON.stringify( favorites ));
}

const existsInFavoirtes = ( id: number ): boolean => {

    if ( typeof window === 'undefined' ) return false;

    const favorites: number[] = JSON.parse( localStorage.getItem('favorites') || '[]' );

    return favorites.includes( id );
}

const pokemons = ():number[] => {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
}

export default {
    toggleFavorite,
    existsInFavoirtes,
    pokemons,
}