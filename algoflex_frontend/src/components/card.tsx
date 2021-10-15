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
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

interface cardData {

  themeName?: string;
  themeDesc?: string;
  themeImage?: string;
  exerciseCount?: number;
  finishedExerciseCount?: number;
  favoriteStatus?: boolean;
}

export default function MultiActionAreaCard(props: cardData) {
  const [favorite, setFavorite] = useState(props.favoriteStatus);
  console.log("Card Gen");
  let aPercentageFinished: number = 0;
  let themeFinished: boolean = false;
  let aFavorite: boolean = false;

  
  if (props.exerciseCount !== undefined && props.finishedExerciseCount !== undefined) {
    aPercentageFinished = Math.round(((props.finishedExerciseCount)/props.exerciseCount)*100);
    if (aPercentageFinished >= 100) {
      aPercentageFinished = 100;
      themeFinished = true;
    }
  }

  const testCompletion = () => {
    if (themeFinished) {
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
          image={props.themeImage}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.themeName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.themeDesc}
          </Typography>
          <LinearProgress variant="determinate" value={aPercentageFinished} />
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
