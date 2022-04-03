import { CardList } from "@components";
import { client } from '@services/Axios.client';
import React, {useEffect, useState} from "react";
import { Grid } from "@mui/material";



const Themes = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        client.get(`/problems/themes`)
            .then(res => {
                setData(res.data);
            });
    }, []);

    return (
        <div style={{marginTop:"8vh"}}>
            <Grid container spacing={8}>
                <Grid item xs={2}>
                </Grid>
                    <Grid item xs={8}>
                        <CardList cardDatas={data} />
                    </Grid>
            </Grid>  
        </div>
    );
}

export default Themes;
