import { Button } from '@mui/material';
import { useState } from 'react';
import ImageList from '@mui/material/ImageList';
import CardItem from './cardItem';
import { CardItemProps } from './interface';


interface CardListProps {
    cardDatas: CardItemProps[]; 
}



const CardList = ({cardDatas}: CardListProps) => {
    
    const [ a, setA] = useState<number>(0);
    console.log("Theme display");
    console.log(cardDatas);

    return (
        <div>
            <Button onClick={() => setA(a + 1)} >Bouton</Button>
            <ImageList sx={{ width: 500 , maxHeight: 1500, overflow: 'auto' }} cols={3} rowHeight={164} >
            {cardDatas.map((item) => (
                <CardItem
                    themeName={item.themeName} 
                    themeDesc={item.themeDesc}
                    themeImage={item.themeImage}
                    exerciseCount={item.exerciseCount} 
                    finishedExerciseCount={item.finishedExerciseCount}
                    favoriteStatus = {item.favoriteStatus} />
            ))}
            </ImageList>
        </div>
    );
}




export default CardList;
    