import { toast } from "react-toastify";
import Squad from "../squad/squad";

function Times({times, setIsFormulario}){

    function Voltar(){
        setIsFormulario(true);
    }

    function CreateText(){
        var texto = '';
        times.forEach((element, i) => {
            if(i > 0)
                texto += `\n\n`;

            texto += `Time ${i+1}\n`;
            element.playears.forEach((item, j) => {
                texto += `${j+1} - ${item}\n`;
            })
        });

        texto += '\n\nDisponível em https://montatime.netlify.app/';

        return texto;
    }

    async function Copiar(){
        try {
            await navigator.clipboard.writeText(CreateText());
            toast.info('Copiado com sucesso!');
          } catch (err) {
            toast.error('Failed to copy text!');
          }
    }

    return(
        <div className="times">
            <h2>Squad:</h2>
            <div>
                {
                    times.map((item, i) => (
                        <div className="div-pattern div-space" key={i}>
                            <h3>Time {i + 1}:</h3>
                            <Squad playears={item.playears}/>
                        </div>
                    ))   
                }
            </div>
            <h2>Times:</h2>
            <div className="div-pattern">
                {
                    times.map((item, index) => 
                        (
                            <div className="item-time" key={index}>
                                <h3>
                                    Time {index + 1}:
                                    <ul>
                                        {
                                            item.playears.map(item2 => (
                                                <li key={item2}>{item2}</li>
                                            ))
                                        }
                                    </ul>
                                </h3>
                            </div>
                        )
                    )
                }
                <div className="confirm-option">
                    <button className="button-confirm" onClick={Copiar}>Copiar</button>
                </div>
            </div>
            <div className="confirm-option">
                <button className="button-confirm" onClick={Voltar}>Voltar</button>
            </div>
        </div>
    )
}

export default Times;