import { client } from "@services/Axios.client";
import { useEffect, useState } from "react";
import { Box, Button, MenuItem, Select, TextareaAutosize, TextField } from "@mui/material";
import { CardItemProps } from "@components/interfaces";
import { Markdown } from "@components";

const CreateExercice = () => {

    const [themes, setThemes] = useState<CardItemProps[]>();
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [prompt, setPrompt] = useState<string>('');
    const [testcase, setTestCase] = useState<string>('');
    const [selectedtheme, setSelectedtheme] = useState<unknown>();
    useEffect(() => {
        client.get("/problems/themes").then(result => {
            setThemes(result.data);
        });
    }, []);

    const submit = () => {
        client.post("/problems/coding-questions", {
            "name": name,
            "description": description,
            "theme": selectedtheme,
            "testCases": testcase,
            "prompt": prompt
        },).then(value => console.log(value));
    }

    return (
        <div>
        <Box marginTop={6}>
        <Select
            labelId="themes"
            id="Themes"
            label="Themes"
            onChange={value => setSelectedtheme(value.target.value)}
        >
            {themes?.map((item) => (
                <MenuItem
                    value={item.uid}
                >{item.name}</MenuItem>
            ))}
        </Select>
            <TextField id="outlined-basic" label="Nom" variant="outlined" 
            onChange={value => setName(value.target.value)} />
            <TextField
            label="Code"
            minRows={10}
            multiline
            style={{ width: 600 }}
            onChange={value => setPrompt(value.target.value)} 
            />
            <TextField
            label="Consigne"
            minRows={10}
            multiline
            style={{ width: 600 }}
            onChange={value => setDescription(value.target.value)} 
            />
            <TextField
            label="Exercices"
            minRows={10}
            multiline
            style={{ width: 600 }}
            onChange={value => setTestCase(value.target.value)} 
            />

            <Markdown text={description} />
            <Button variant="contained" onClick={submit}>Sauvegarde</Button>
            </Box>
        </div>
    );
}

export default CreateExercice;