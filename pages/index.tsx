import type { NextPage } from 'next';
import { GetStaticProps } from 'next'
import Head from 'next/head';
import Image from 'next/image';
import { Button, Card, Grid, Row, Text } from '@nextui-org/react';

import styles from '../styles/Home.module.css';
import { Layout } from '../components/layouts';

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
import pokeApi from '../api/pokeApi';
import { PokemonListResponse } from '../interfaces';
import { SmallPokemon } from '../interfaces/pokemon-list';
import { PokemonCard } from '../components/pokemon';

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  // console.log(pokemons)

  return (
    <>
      <Layout title='Fermi App'>
        <Grid.Container gap={2} justify='flex-start'>
          {
            pokemons.map(
              (pokemon: SmallPokemon) => (
                <PokemonCard key={ pokemon.id } pokemon={ pokemon } />
              )
            )
          }
        </Grid.Container>
      </Layout>
    </>
  );
};



export const getStaticProps: GetStaticProps = async (ctx) => {
  // const { data } = await  // your fetch function here 

  // console.log('Hola Mundo')
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
  // console.log(data)
  const pokemons: SmallPokemon[] = data.results.map(
    (poke, index) => {
      return {
        ...poke,
        id: index + 1,
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index + 1}.svg`
      }
    }
  )

  return {
    props: {
      pokemons
    }
  }
}

export default HomePage
