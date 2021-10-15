import { Button, ThemeProvider } from '@mui/material';
import React from 'react';
import axios from 'axios';
import Card from '../card';
import { useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';





// Page Thème:
// Ajouter navbar
// Afficher liste thèmes
//     afficher titre thème
//     afficher image thème
//     afficher desc thème
//     afficher bar progression thème
//     afficher liste exo via "go to activity"


//requête axios Thème à ouverture de page
//générer cartes pour les thèmes trouvé
//pagination des thèmes
//recherche thèmes

// themeName?: string;
//   themeDesc?: string;
//   themeImage?: string;
//   exerciseCount?: number;
//   finishedExerciseCount?: number;


const Theme = () => {
    
    const [ a, setA] = useState<number>(0);
    console.log("Theme display");

    return (
        <div>
            <Button onClick={() => setA(a + 1)} >Bouton</Button>
            <ImageList sx={{ width: 500 , maxHeight: 1500, overflow: 'auto' }} cols={3} rowHeight={164} >
            {itemData.map((item) => (
                <Card 
                    themeName={item.themeName} 
                    themeDesc={item.themeDesc}
                    themeImage={item.themeImage}
                    exerciseCount={item.exerciseCount} 
                    finishedExerciseCount={item.finishedExercisecount+a}
                    favoriteStatus = {item.favoriteStatus} />
            ))}
            </ImageList>
        </div>
    );
}

const itemData = [
    {
        themeName: 'Theme01',
        themeDesc: 'Desc01 Desc01 Desc01 Desc01',
        exerciseCount: 35,
        finishedExercisecount: 7,
        themeImage: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        favoriteStatus: true,
    },
    {
        themeName: 'Theme02',
        themeDesc: 'Desc012',
        exerciseCount: 5,
        finishedExercisecount: 5,
        themeImage: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        favoriteStatus: false,

    },
    {
        themeName: 'Theme03',
        themeDesc: 'Desc03',
        exerciseCount: 25,
        finishedExercisecount: 20,
        themeImage: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        favoriteStatus: true,

    },
    {
        themeName: 'Theme04',
        themeDesc: 'Desc04',
        exerciseCount: 50,
        finishedExercisecount: 34,
        themeImage: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        favoriteStatus: false,

    },
];


export default Theme;
    