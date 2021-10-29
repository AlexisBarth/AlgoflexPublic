import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Button, CardActionArea, CardActions, LinearProgress } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { CardItemProps } from './interfaces';

export default function CardItem(props: CardItemProps) {
  const [favorite, setFavorite] = useState(props.favoriteStatus);
  let percentageFinished: number = 0;
  let isThemeFinished: boolean = false;


  
  if (props.exerciseCount !== undefined && props.finishedExerciseCount !== undefined) {
    percentageFinished = Math.round(((props.finishedExerciseCount)/props.exerciseCount)*100);
    if (percentageFinished >= 100) {
      percentageFinished = 100;
      isThemeFinished = true;
    }
  }

  const testCompletion = () => {
    if (isThemeFinished) {
      return <CheckCircleOutlineIcon />;
    } else {
      return <PlayCircleIcon />;
    }
  }

  const testFavorite = () => {
    if (favorite) {
      return <FavoriteIcon />;
    } else {
      return <FavoriteBorderIcon />;
    }
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={props.cardImage}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.cardName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.cardDesc}
          </Typography>
          <LinearProgress variant="determinate" value={percentageFinished} />
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
        {testCompletion()}
        </Button>
        <Button size="small" color="secondary" onClick={() => setFavorite(!favorite)} >
          {testFavorite()}
        </Button>
      </CardActions>
    </Card>
  );
}
