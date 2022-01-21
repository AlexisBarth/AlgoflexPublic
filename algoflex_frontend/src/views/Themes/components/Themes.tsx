export default Themes;
import { CardList } from "@components";
import { CardItemProps } from "@components/interfaces";
import axios from "axios";
import React, {useEffect, useState} from "react";
import { Grid } from "@mui/material";


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

const itemData: CardItemProps[] = [
    {
        cardId: 1,
        cardName: 'Theme01',
        cardDesc: 'Test Value',
        exerciseCount: 35,
        finishedExerciseCount: 7,
        cardImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Cayley_Q8_quaternion_multiplication_graph.svg/330px-Cayley_Q8_quaternion_multiplication_graph.svg.png',
        favoriteStatus: true,
    },
    {
        cardId: 2,
        cardName: 'Theme02',
        cardDesc: 'Desc012',
        exerciseCount: 5,
        finishedExerciseCount: 5,
        cardImage: 'https://media.wired.com/photos/5af2249a0b975d475fa7afbf/master/pass/algorithms_landlord-FINAL.jpg',
        favoriteStatus: false,

    },
    {
        cardId: 3,
        cardName: 'Theme03',
        cardDesc: 'Desc03',
        exerciseCount: 25,
        finishedExerciseCount: 20,
        cardImage: 'https://d2jx2rerrg6sh3.cloudfront.net/image-handler/picture/2021/1/shutterstock_1691666992-1.jpg',
        favoriteStatus: true,

    },
    {
        cardId: 4,
        cardName: 'Theme04',
        cardDesc: 'Desc03',
        exerciseCount: 25,
        finishedExerciseCount: 20,
        cardImage: 'https://d2jx2rerrg6sh3.cloudfront.net/image-handler/picture/2021/1/shutterstock_1691666992-1.jpg',
        favoriteStatus: true,

    },
    {
        cardId: 5,
        cardName: 'Theme05',
        cardDesc: 'Desc03',
        exerciseCount: 25,
        finishedExerciseCount: 20,
        cardImage: 'https://d2jx2rerrg6sh3.cloudfront.net/image-handler/picture/2021/1/shutterstock_1691666992-1.jpg',
        favoriteStatus: true,

    },
    {
        cardId: 6,
        cardName: 'Theme06',
        cardDesc: 'Desc03',
        exerciseCount: 25,
        finishedExerciseCount: 20,
        cardImage: 'https://d2jx2rerrg6sh3.cloudfront.net/image-handler/picture/2021/1/shutterstock_1691666992-1.jpg',
        favoriteStatus: true,

    },
    {
        cardId: 7,
        cardName: 'Theme07',
        cardDesc: 'Desc03',
        exerciseCount: 25,
        finishedExerciseCount: 20,
        cardImage: 'https://d2jx2rerrg6sh3.cloudfront.net/image-handler/picture/2021/1/shutterstock_1691666992-1.jpg',
        favoriteStatus: true,

    }
];


const Theme = () => {
        


const Themes = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState(null);

    // useEffect(() => {
    //     axios.get('https://staging-algoflex.herokuapp.com/problems/themes')
    //         .then(res => res.json())
    //         .then(
    //             (result) => {
    //                 setIsLoaded(true);
    //                 setData(result.data);
    //             },
    //         )
    // }, [])
    
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                </Grid>
                    <Grid item xs={6}>
                        <CardList cardDatas={itemData} />
                    </Grid>
            </Grid>
                
        </div>

    );
}

export default Theme;
