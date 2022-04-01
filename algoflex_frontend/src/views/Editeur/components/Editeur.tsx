import { Ide } from "@components";
import { CodingQuestionInterface } from "@components/interfaces";
import { client } from "@services/Axios.client";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

const Editeur = () => {

    const idPage = useParams<any>();
    const [exercice, setExercice] = useState<CodingQuestionInterface>();

    useEffect(() => {
        client.get(`/problems/coding-questions/${idPage.id}`).then((result) => {
            setExercice(result.data);
        });
    }, [idPage]);

    return (
        <div>
            <Ide uid={exercice?.uid} prompt={exercice?.prompt} name={exercice?.name} theme={exercice?.theme} description={exercice?.description} />
        </div>
    );
}

export default Editeur;