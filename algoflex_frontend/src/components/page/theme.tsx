import React from "react";
import CardList from "../cardList";
import { CardItemProps } from "../interfaces";



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
        cardName: 'Theme01',
        cardDesc: 'Test Value',
        exerciseCount: 35,
        finishedExerciseCount: 7,
        cardImage: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        favoriteStatus: true,
    },
    {
        cardName: 'Theme02',
        cardDesc: 'Desc012',
        exerciseCount: 5,
        finishedExerciseCount: 5,
        cardImage: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        favoriteStatus: false,

    },
    {
        cardName: 'Theme03',
        cardDesc: 'Desc03',
        exerciseCount: 25,
        finishedExerciseCount: 20,
        cardImage: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        favoriteStatus: true,

    },
    {
        cardName: 'Theme04',
        cardDesc: 'Desc04',
        exerciseCount: 50,
        finishedExerciseCount: 34,
        cardImage: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
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