import { useEffect, useState } from "react";

import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import confetti from 'canvas-confetti';

import { pokeApi } from "../../api";
import { Layout } from "../../components/layouts";
import { Pokemon } from "../../interfaces";
import localFavorites from "../../utils/localFavorites";
import { PokemonDetails } from "../../components/pokemon";
import { PokemonListResponse, SmallPokemon } from '../../interfaces/pokemon-list';
import { getPokemonInfo } from '../../utils/';

interface Props {
    pokemon: Pokemon
    // id: string,
    // name: string
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
    const [isInFavorites, setIsInFavorites] = useState(false);
    // const router = useRouter();
    // const { name } = router.query;

    const onToggleFavorite = () => {
        localFavorites.toggleFavorite(pokemon.id)
        setIsInFavorites(s => !s)

        if (isInFavorites) return;

        confetti({
            zIndex: 999,
            particleCount: 100,
            spread: 160,
            angle: -100,
            origin: {
                x: 1,
                y: 0,
            }
        })
    }

    useEffect(() => {
        setIsInFavorites(localFavorites.existsInFavoirtes(pokemon.id));

        return () => {
            // Cleanup
        }
    }, [])

    return (
        <Layout title={pokemon.name}>
            <PokemonDetails pokemon={pokemon} isInFavorites={isInFavorites} onToggleFavorite={onToggleFavorite} />
        </Layout>
    );
}


// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const { data: { results: pokemons151 } } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

    return {
        paths: pokemons151.map(({ name }) => ({
            params: { name }
        })),
        fallback: false
    }
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { name } = params as { name: string }

    return {
        props: {
            pokemon: await getPokemonInfo( name )
        }
    }
}

export default PokemonByNamePage;