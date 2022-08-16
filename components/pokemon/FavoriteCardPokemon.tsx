import { useRouter } from 'next/router';
import { FC } from "react"

import { Card, Grid } from "@nextui-org/react"

export const FavoriteCardPokemon: FC<{ pokemonId: number }> = ({ pokemonId: id }) => {
    const router = useRouter();

    const onFavoriteClicked = () => {
        // const { id } = router.query;
        router.push(`/pokemon/${id}`);
    }


    return (
        <Grid xs={6} sm={3} md={2} xl={1} key={id}>
            <Card
                isHoverable
                isPressable
                css={{
                    padding: 10
                }}
                onPress={onFavoriteClicked}
            >
                <Card.Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
                    width={'100%'}
                    height={140}
                />
            </Card>
        </Grid>
    )
}
