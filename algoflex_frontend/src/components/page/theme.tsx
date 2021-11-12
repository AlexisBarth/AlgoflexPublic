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
        cardImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Cayley_Q8_quaternion_multiplication_graph.svg/330px-Cayley_Q8_quaternion_multiplication_graph.svg.png',
        favoriteStatus: true,
    },
    {
        cardName: 'Theme02',
        cardDesc: 'Desc012',
        exerciseCount: 5,
        finishedExerciseCount: 5,
        cardImage: 'https://media.wired.com/photos/5af2249a0b975d475fa7afbf/master/pass/algorithms_landlord-FINAL.jpg',
        favoriteStatus: false,

    },
    {
        cardName: 'Theme03',
        cardDesc: 'Desc03',
        exerciseCount: 25,
        finishedExerciseCount: 20,
        cardImage: 'https://d2jx2rerrg6sh3.cloudfront.net/image-handler/picture/2021/1/shutterstock_1691666992-1.jpg',
        favoriteStatus: true,

    },
    {
        cardName: 'Theme04',
        cardDesc: 'Desc04',
        exerciseCount: 50,
        finishedExerciseCount: 34,
        cardImage: 'http://d30ce0f8e9hxxq.cloudfront.net/0_live-card-images/16142/1436203361959_game-as-art.jpg?time=1436203363181',
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