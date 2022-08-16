import { useEffect, useState } from "react";

import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router"
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";

import confetti from 'canvas-confetti';

import { pokeApi } from "../../api";
import { Layout } from "../../components/layouts";
import { Pokemon } from "../../interfaces";
import localFavorites from "../../utils/localFavorites";
import { PokemonDetails } from "../../components/pokemon";
import { getPokemonInfo } from '../../utils/getPokemonInfo';

interface Props {
    pokemon: Pokemon
    // id: string,
    // name: string
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
    const [isInFavorites, setIsInFavorites] = useState( false );
    // const router = useRouter();
    // const { id } = router.query;

    const onToggleFavorite = () => {
        // console.log('Hola Mundo');
        // localStorage.setItem('favorites', `${ pokemon.id }`)
        localFavorites.toggleFavorite( pokemon.id )
        setIsInFavorites(s => !s)

        if (isInFavorites)  return;

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
      setIsInFavorites( localFavorites.existsInFavoirtes( pokemon.id ) );
    
      return () => {
        // Cleanup
      }
    }, [])
    

    // console.log(localStorage.getItem('favorites'))
    // console.log( typeof window )

    return (
        <Layout title={ pokemon.name }>
            <PokemonDetails pokemon={pokemon} isInFavorites={isInFavorites} onToggleFavorite={onToggleFavorite} />
        </Layout>
    );
}


// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const pokemons151 = [...Array(151)].map((value, index) => `${index + 1}`)

    return {
        // paths: [
        //     {
        //         params: { id: '1' }
        //     },
        //     {
        //         params: { id: '2' }
        //     },
        //     {
        //         params: { id: '3' }
        //     },
        // ],
        paths: pokemons151.map(id => ({
            params: { id }
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
    const { id } = params as { id: string }

    return {
        props: {
            // id,
            // name: data.name
            pokemon: await getPokemonInfo( id )
        }
    }
}


export default PokemonPage