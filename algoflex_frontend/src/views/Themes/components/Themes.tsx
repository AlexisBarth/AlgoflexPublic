import { CardList } from "@components";
import axios from "axios";
import React, {useEffect, useState} from "react";
import { Grid } from "@mui/material";



const Themes = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`https://staging-algoflex.herokuapp.com/problems/themes`,  { withCredentials: true})
        .then(res => {
        setData(res.data);
        })
    }, [])
    
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                </Grid>
                    <Grid item xs={6}>
                        <CardList cardDatas={data} />
                    </Grid>
            </Grid>  
        </div>
    );
}

export default Themes;
