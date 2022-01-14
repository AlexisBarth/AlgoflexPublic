import React, {useEffect} from "react";
import {Grid, Card, Typography} from "@mui/material";

const Home = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        document.body.appendChild(script);
    }, [])

    return (
        <div style={{marginTop:"8vh"}}>
    <Grid container columns={{ xs: 4, md: 18 }}>
        <Grid item xs={4} md={6}>
            <Card variant="outlined" style={{padding:'5vh', margin:'3vh', height:'75vh', overflow:'auto'}}>
            <a className="twitter-timeline" href="https://twitter.com/AlgoflexPro?ref_src=twsrc%5Etfw">Tweets by
                AlgoflexPro</a>
            </Card>
        </Grid>
        <Grid item xs={4} md={12}>
            <Card variant="outlined" style={{padding:'5vh', margin:'3vh', height:'75vh'}}>
                <Typography variant='h2'>Bienvenue chez AlgoFlex</Typography>
                <Typography variant='h4'> &emsp; votre partenaire dans l'apprentissage algorithmique</Typography>
                <br/>
                <Typography variant='body2'>
                    &emsp; Maecenas efficitur, mi lacinia blandit laoreet, elit augue eleifend mauris, ac consequat ante nisl nec turpis.
                    Nam varius velit eleifend mauris sodales rhoncus. Aenean congue mauris nisl, tincidunt feugiat felis suscipit non.
                    Vivamus laoreet, enim eget maximus congue, massa urna pulvinar erat, eget tempor diam urna vitae velit.
                    Maecenas varius justo ac efficitur facilisis. Donec et mollis dolor. Donec nec turpis sit amet nisi cursus fringilla.
                    Donec vitae orci eget velit luctus dictum eget quis orci. Nunc vel orci et leo gravida blandit.
                    Curabitur dictum sagittis enim eleifend porttitor. Pellentesque ac feugiat ligula. Ut condimentum tempor nunc ac pulvinar.
                    In pretium mollis enim, quis faucibus massa mattis id. Fusce rutrum sed lacus et placerat.
                    Nullam tristique, ipsum eu consectetur pellentesque, sem erat facilisis justo, eget consectetur nisi tellus vitae dolor.
                </Typography>
                <br/>
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
                <br/>
                <Typography variant='body2'>
                    &emsp; Quisque commodo, lacus sit amet posuere condimentum, dui libero porttitor augue, vitae porta massa magna eu nisi.
                    Ut ullamcorper mattis aliquam. Phasellus rutrum cursus tempus. Aliquam erat volutpat. Duis et iaculis nibh.
                    Suspendisse pharetra maximus euismod. Vivamus placerat sem id arcu accumsan, eu imperdiet ex viverra.
                    Vivamus nisl tellus, condimentum sed magna ultrices, egestas sollicitudin arcu. Aliquam erat volutpat.
                    Vestibulum fermentum volutpat erat, at volutpat nulla porta ac.
                </Typography>
            </Card>
        </Grid>
    </Grid>
        </div>
    )
}

export default Home;