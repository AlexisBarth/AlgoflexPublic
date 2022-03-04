import { CardList } from "@components";
import { client } from '@services/Axios.client';
import React, {useEffect, useState} from "react";
import { Grid } from "@mui/material";



const Themes = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        client.get(`/problems/themes`,  { withCredentials: true})
        .then(res => {
        setData(res.data);
        })
    }, []);
    
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
