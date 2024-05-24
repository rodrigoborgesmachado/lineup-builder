import { useState } from "react";
import Formulario from "../formulario/formulario";
import api from "../../services/api";
import { toast } from "react-toastify";
import Times from "../times/times";

function Principal(){
    const[isFormulario, setIsFormulario] = useState(true);
    const[times, setTimes] = useState(true);
    const[quantidadeJogadoresLinha, setQuantidadeJogadoresLinha] = useState(4);

    async function montaTimes(formulario){
        await api.post('/RandomRaxa/getRandomTeam?numeroJogadoresLinha=' + quantidadeJogadoresLinha, formulario)
        .then((response) => {
            if(response.data.success){
                setTimes(response.data.object);
                setIsFormulario(false);
            }
            else{
                toast.warn('Erro ao montar times');    
            }
        })
        .catch(() => {
            toast.warn('Erro ao buscar time');
        })
    }

    return(
        <div>
            {
                isFormulario ?
                <Formulario setQuantidadeJogadoresLinha={setQuantidadeJogadoresLinha} quantidadeJogadoresLinha={quantidadeJogadoresLinha} montaTimes={montaTimes}/>
                :
                <Times times={times} setIsFormulario={setIsFormulario}/>
            }
        </div>
    )
}

export default Principal;