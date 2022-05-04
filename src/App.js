import {useState} from "react";
import { FcSearch } from 'react-icons/fc';
import './style.css';
import api from "./services/api"
function App() {

   //o valor input é para armazenar e o setInput é a função que vai mudar esse estado

  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  async function clicou(){
      if(input === ""){
        alert("preenchar o cep antes de enviar")
        return;
      }

      try{
         const response = await api.get(`${input}/json`)
         setCep(response.data);
         setInput("");
      }catch{
        alert("erro ao buscar")
        setInput("")
      }
   }
  
  return (
    <div className="container">

      <h1 className="title">Buscador de CEP</h1>

             <div className="containerInput">
          
                <input type={"text"}
                 placeholder="Digite seu cep..."
                 value={input}
                onChange={(e) => setInput(e.target.value)}
                />
                 
                <button className='button' onClick={clicou}>
                  <FcSearch size={25} color="#000" ></FcSearch>
                </button>
              </div> 
          
           {Object.keys(cep).length > 0 && (
              
            <main className='main'>
             <h2>CEP: {cep.cep}</h2>

             <span>Rua: {cep.logradouro}</span>
             <span>Complemento: {cep.complemento}</span>
             <span>Bairro: {cep.bairro}</span>
             <span>Localidade: {cep.localidade} - {cep.uf}</span>
           </main>
           
             
           )}


       </div>


  );
}

export default App;
