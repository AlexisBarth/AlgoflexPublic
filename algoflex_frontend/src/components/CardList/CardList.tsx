import ImageList from '@mui/material/ImageList';
import { CardItem } from '@components';
import { CardItemProps } from '../interfaces';
import { Box } from '@mui/material';

interface CardListProps {
    cardDatas: CardItemProps[]; 
}

const CardList = ({cardDatas}: CardListProps) => {
    return (
        <Box marginTop={6}>
            <ImageList sx={{ overflow: 'auto' }} rowHeight={10} gap={10} cols={3}>
            {cardDatas.map((item) => (
                <CardItem
                    key={item.uid}
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
        </Box>
    );
}

export default CardList;
    