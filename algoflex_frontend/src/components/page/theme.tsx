import React from "react";
import CardList from "../cardList";
import { CardItemProps } from "../interface";



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


const itemData: CardItemProps[] = [
    {
        themeName: 'Theme01',
        themeDesc: 'Test Value',
        exerciseCount: 35,
        finishedExerciseCount: 7,
        themeImage: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        favoriteStatus: true,
    },
    {
        themeName: 'Theme02',
        themeDesc: 'Desc012',
        exerciseCount: 5,
        finishedExerciseCount: 5,
        themeImage: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        favoriteStatus: false,

    },
    {
        themeName: 'Theme03',
        themeDesc: 'Desc03',
        exerciseCount: 25,
        finishedExerciseCount: 20,
        themeImage: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        favoriteStatus: true,

    },
    {
        themeName: 'Theme04',
        themeDesc: 'Desc04',
        exerciseCount: 50,
        finishedExerciseCount: 34,
        themeImage: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        favoriteStatus: false,

    },
];


const Theme = () => {

    return (
        <div>
            <CardList cardDatas={itemData} />
        </div>

    );
}

export default Theme;