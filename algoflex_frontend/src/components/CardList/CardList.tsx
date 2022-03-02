import { Button } from '@mui/material';
import { useState } from 'react';
import ImageList from '@mui/material/ImageList';
import { CardItem } from '@components';
import { CardItemProps } from '../interfaces';

interface CardListProps {
    cardDatas: CardItemProps[]; 
}

const CardList = ({cardDatas}: CardListProps) => {
    const [ a, setA] = useState<number>(0);

    return (
        <div>
            <Button onClick={() => setA(a + 1)} >Bouton</Button>
            <ImageList sx={{ overflow: 'auto' }} rowHeight={164} >
            {cardDatas.map((item) => (
                <CardItem
                    uid={item.uid}
                    name={item.name} 
                    description={item.description}
                    imageUrl={item.imageUrl}
                    exerciseCount={item.exerciseCount} 
                    finishedExerciseCount={item.finishedExerciseCount}
                    favoriteStatus = {item.favoriteStatus}
                />
            ))}
            </ImageList>
        </div>
    );
}

export default CardList;
    