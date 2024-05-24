import { useState } from "react";
import Formulario from "../formulario/formulario";
import api from "../../services/api";
import { toast } from "react-toastify";
import Times from "../times/times";

function Principal(){
    const[isFormulario, setIsFormulario] = useState(true);
    const[times, setTimes] = useState(true);
    const[quantidadeJogadoresLinha, setQuantidadeJogadoresLinha] = useState(4);

    function reorderTeams(apiResponse) {
        return apiResponse.map(team => {
          const players = team.playears;
          const thomasIndex = players.indexOf('Thomas');
      
          if (thomasIndex !== -1) {
            // Remove Thomas from the current position
            players.splice(thomasIndex, 1);
            // Add Thomas to the start of the list
            players.unshift('Thomas');
          }
      
          return { playears: players };
        });
      }

    async function montaTimes(formulario){
        await api.post('/RandomRaxa/getRandomTeam?numeroJogadoresLinha=' + quantidadeJogadoresLinha, formulario)
        .then((response) => {
            if(response.data.success){
                console.log(reorderTeams(response.data.object));
                setTimes(reorderTeams(response.data.object));
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