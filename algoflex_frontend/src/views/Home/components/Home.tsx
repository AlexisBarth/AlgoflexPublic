import React, {useEffect} from "react";
import {Grid, Card, Typography, Box} from "@mui/material";
import Image from "../../../img/logo.png";

const Home = () => {
    useEffect(() => {
        let script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.integrity = "sha384-+WKoS+sXCt/fwZxO8IOpYtJ/AIJIDhzpXZomciIYeIRKuxyQHpmp6oLiXsM8fq4G";
        script.crossOrigin= "anonymous";
        script.async = true;
        document.body.appendChild(script);
    }, [])

    return (
        <div style={{marginTop:"8vh"}}>
            <Grid container
            columns={{ xs: 4, md: 18 }}>

                <Grid item xs={4} md={6}>
                    <Card variant="outlined" style={{padding:'5vh', margin:'3vh', height:'75vh', overflow:'auto'}}>
                    <a className="twitter-timeline" href="https://twitter.com/AlgoflexPro?ref_src=twsrc%5Etfw">Tweets by
                        AlgoflexPro</a>
                    </Card>
                </Grid>

                <Grid item xs={4} md={12}>
                    <Box style={{display: 'flex', flexDirection: 'row', margin:'3vh'}}>
                    <img src={Image} alt="logo" height="200vh"/>
                    <Typography variant='h1' style={{padding:'5vh', marginLeft:'1vh'}}>AlgoFlex</Typography>
                    </Box>
                    <Card variant="outlined" style={{padding:'5vh', margin:'3vh', height:'20vh', display: 'flex'}}>
                        <Box style={{display: 'flex', flexDirection: 'row'}}>
                            <Typography variant='body2'>
                                &emsp; Maecenas efficitur, mi lacinia blandit laoreet, elit augue eleifend mauris, ac consequat ante nisl nec turpis.
                                Nam varius velit eleifend mauris sodales rhoncus. Aenean congue mauris nisl, tincidunt feugiat felis suscipit non.
                                Vivamus laoreet, enim eget maximus congue, massa urna pulvinar erat, eget tempor diam urna vitae velit.
                            </Typography>
                            <Typography variant='body2'>
                                &emsp; Maecenas efficitur, mi lacinia blandit laoreet, elit augue eleifend mauris, ac consequat ante nisl nec turpis.
                                Nam varius velit eleifend mauris sodales rhoncus. Aenean congue mauris nisl, tincidunt feugiat felis suscipit non.
                                Vivamus laoreet, enim eget maximus congue, massa urna pulvinar erat, eget tempor diam urna vitae velit.
                                Maecenas varius justo ac efficitur facilisis. Donec et mollis dolor. Donec nec turpis sit amet nisi cursus fringilla.
                                Donec vitae orci eget velit luctus dictum eget quis orci. Nunc vel orci et leo gravida blandit.
                            </Typography>
                        </Box>
                    </Card>
                    <Card variant="outlined" style={{padding:'5vh', margin:'3vh', height:'17.5vh'}}>
                        <Typography variant='body2'>
                            &emsp; Sed fermentum lacinia urna, in efficitur ante vestibulum sed. Etiam leo dolor, cursus sed purus
                            efficitur, interdum congue sapien. Etiam lacinia nisi et lacus laoreet pellentesque.
                            Morbi sit amet elit sollicitudin, sagittis turpis in, facilisis mi. In hac habitasse platea dictumst.
                            Pellentesque vitae risus at massa condimentum fermentum in ac arcu. Ut ut velit at ipsum aliquam dapibus.
                            Mauris tristique, felis ac lobortis malesuada, nunc odio lacinia est, nec venenatis ipsum tortor id nunc.
                            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                            Sed feugiat metus rhoncus velit aliquam porta. Integer cursus libero vitae lacus elementum, at vehicula purus viverra.
                            Vivamus ante erat, sollicitudin dapibus pellentesque ut, elementum sed arcu.
                        </Typography>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}
