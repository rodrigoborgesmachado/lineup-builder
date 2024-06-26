import { useState } from "react";
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PublishIcon from '@mui/icons-material/Publish';

function Formulario({setQuantidadeJogadoresLinha, quantidadeJogadoresLinha, montaTimes}){
    const maxPlayers = 10;
    const maxNota = 5;
    const playersSession = 'PLAYERS';
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalImportIsOpen, setModalImportIsOpen] = useState(false);
    
    const[players, setPlayers] = useState(localStorage.getItem(playersSession) ? JSON.parse(localStorage.getItem(playersSession)) : []);  
    const[nome, setNome] = useState('');
    const[lista, setlista] = useState('');
    const[nota, setNota] = useState(0);
    const[index, setIndex] = useState(-1);

    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setNome('');
        setNota(0);
        setIndex(-1);
        setModalIsOpen(false);
    }

    function openModalImport() {
        setModalImportIsOpen(true);
    }

    function closeModalImport() {
        setModalImportIsOpen(false);
    }

    function openModalEdit(index) {
        setIndex(index);
        setNome(players[index].nome);
        setNota(players[index].nota);
        setModalIsOpen(true);
    }

    const handleChangeInputNumber = (event) => {
        const value = event.target.value;
        if (value <= maxPlayers) {
            setQuantidadeJogadoresLinha(value);
        } else {
            toast.info(`Máximo de ${maxPlayers} jogadores`);
        }
    };

    function adicionaJogador(){
        setPlayers([
            ...players,
            { 
                nome: nome, 
                nota: nota 
            },
        ]);

        setNome('');
        setNota(0);
        closeModal();
    }

    function editaJogador(index){
        openModal();
        setPlayers([
            ...players.slice(0, index),
            { nome: nome, nota: nota},
            ...players.slice(index+1),
        ]);

        closeModal();
    }

    function removeJogador(index){
        setPlayers([
            ...players.slice(0, index),
            ...players.slice(index+1),
        ]);
        setNome('');
        setNota(0);
        setIndex(-1);
    }

    function montarTimes(){
        localStorage.setItem(playersSession, JSON.stringify(players));
        montaTimes(players);
    }

    function customStyles(){
        return {
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                border: '0',
                background: '#2B2C33',
                marginRight: '-50%',
                borderRadius: '5px',
                transform: 'translate(-50%, -50%)',
                width: '60%',
                overflow: 'auto',
                position: 'fixed'
            },
        };
    }

    function extractPlayers() {
        const lines = lista.split('\n');
        const players = [];
        let isInLinhaSection = false;
        

        for (let line of lines) {
          line = line.trim();
      
          if (line.startsWith("Linha")) {
            isInLinhaSection = true;
            continue;
          }
      
          if (line.startsWith("Espera")) {
            break;
          }
      
          if (isInLinhaSection && line) {
            const match = line.match(/^(\d+)\s*-\s*(.+?)(?:\s+(\d))?$/);
      
            if (match) {
              const nota = match[3] ? (match[3] > 0 && match[3] <= maxNota ? match[3] : 1) : 1;
              const nome = match[2].trim();
              players.push({ nota, nome });
            }
          }
        }

        setPlayers(players);
        setlista('');
        closeModalImport();
      }

    return(
        <div className="form-players">
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                ariaHideApp={false}
                style={customStyles()}
                contentLabel="Jogador"
            >
                <div className="modal-body">
                    <div className="modal-form">
                        <h3>Nome:</h3>
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)}/>
                        <h3>Nota:</h3>
                        <input type="number" value={nota} onChange={(e) =>{

                            const inputValue = e.target.value;

                            // Ensure the input value is an integer
                            if(e.target.value > maxNota){
                                toast.info(`Valor não pode ser maior que ${maxNota}`);
                            }
                            else if (/^\d+$/.test(inputValue) || inputValue == '') {
                                setNota(e.target.value);
                            }
                            else{
                                toast.info(`Valor precisa ser inteiro!`);
                            }
                        } }/>
                    </div>
                    <div className="modal-options">
                        <button onClick={() => closeModal()}>Cancelar</button>
                        {
                            index == -1 ?
                            <button onClick={() => adicionaJogador()}>Adicionar</button>
                            :
                            <button onClick={() => editaJogador(index)}>Editar</button>
                        }
                    </div>
                </div>
            </Modal>
            <Modal
                isOpen={modalImportIsOpen}
                onRequestClose={closeModalImport}
                ariaHideApp={false}
                style={customStyles()}
                contentLabel="Jogador"
            >
                <div className="modal-body">
                    <div className="modal-form">
                        <h3>Lista:</h3>
                        <textarea type="text" value={lista} onChange={(e) => setlista(e.target.value)} rows={20} cols={40}/>
                    </div>
                    <div className="modal-options">
                        <button onClick={() => closeModalImport()}>Cancelar</button>
                        <button onClick={() => extractPlayers()}>Importar</button>
                    </div>
                </div>
            </Modal>
            <h2>Informações</h2>
            <div className="div-pattern">
                <div className="config">
                    <h3>Quantidade de jogadores de linha por time:</h3>
                    <input type="number" value={quantidadeJogadoresLinha} onChange={handleChangeInputNumber} max={maxPlayers}/>
                </div>
            </div>

            <h2>Jogadores:</h2>
            <div className="separe-itens link" onClick={openModalImport} >
                <h3>Importar</h3>
                <PublishIcon label='Importar lista'/>
            </div>
            <div className="div-pattern">
                <div className="players">
                    {
                        players.map((item, index) => 
                            (
                                <div key={index} className="players-item">
                                    <h3>{index+1}: {item.nome} ({item.nota})</h3>
                                    <div>
                                        <EditIcon className="link" onClick={() => openModalEdit(index)}/>
                                        <DeleteForeverIcon className="link" onClick={() => removeJogador(index)}/>
                                    </div>
                                </div>
                            )
                        )
                    }
                </div>
                <div className="confirm-option">
                    <button className="button-vini button-style2" onClick={openModal}>Adicionar Jogador</button>
                </div>
            </div>
            
            <div className="confirm-option">
                <button className="button-vini button-confirm" onClick={montarTimes}>Montar Times</button>
            </div>
        </div>
    )
}

export default Formulario;