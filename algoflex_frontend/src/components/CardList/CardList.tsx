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
            <ImageList sx={{ overflow: 'auto' }} variant="woven" rowHeight={164} gap={10} >
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
    