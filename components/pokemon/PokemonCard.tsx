import { Card, Grid, Row, Text } from '@nextui-org/react';
import { FC } from 'react';
import { SmallPokemon } from '../../interfaces/';
import { useRouter } from 'next/router';

interface Props {
    pokemon: SmallPokemon;
}

export const PokemonCard: FC<Props> = ({ pokemon }) => {
    const router = useRouter();
    
    const onClick = () => {
        // router.push(`/pokemon/${pokemon.id}`);
        router.push(`/pokemonbyname/${pokemon.name}`);
    }

    const { id, img, name } = pokemon; 

    return (
        <Grid key={id} xs={6} sm={3} md={2} xl={1} >
            {/* <li key={`#${id}`}>#{id} - {name}</li>
                  <Image key={`${id} - ${name}`} src={img} width={70} height={70} /> */}
            <Card
                isHoverable
                isPressable
                onPress={ onClick }
            >
                <Card.Body>
                    <Card.Image
                        src={img}
                        width="100%"
                        height={140}
                    />
                </Card.Body>
                <Card.Footer>
                    <Row justify='space-between'>
                        <Text transform='capitalize'>{name}</Text>
                        <Text>#{id}</Text>
                    </Row>
                </Card.Footer>
            </Card>
        </Grid>
    );
}
