import './style.css'
import Trash from '../../assets/Trash.png'
import api from '../../services/api'
import { useEffect,useState,useRef} from 'react'

//React hoks: ferramentas do react
//Toda vez que o users mudar, vai mudar na tela também pois agor users é um estado do react(variável) graças ao useState. Ou seja, sempre que houver alterações e eu qiser ver na tela eu preciso  usar o useState
//Para criar uma variável do react a gente cria usa:
//Const [nome da variável,set+nome da variável] sendo o set o responsável por colocar os dsdos dentro ds variável, e geralmente iniciam com um array vazio

//UseRef: Vamos colocar um elemento como referência para ele e vamos conseguir pegar as informações desse elemento... vamos usar como refrencia o nosso input



function Home() {

  const [users, setUsers]=useState([])

  const inputName=useRef()
  const inputAge=useRef()
  const inputEmail=useRef()

  //Dessa forma vou conseguir guardar o valor dos meus inputs aí dentro
  //Mas preciso avisar quem é que vai receber o valor, use o caminho ref lá no input





   async function getUsers(){
    const usersFromApi = await api.get('/usuarios')

    setUsers(usersFromApi.data) //Toda vez que eu quiser alterar o users eu uso setUsers e cooco aqui dentro o dado que quero alterar
   
  }

  async function createUsers(){
    await api.post('/usuarios',{
      name:inputName.current.value,
      age:inputAge.current.value,
      email:input.current.create.value
  })
  getUsers() //Não vou precisar dar refresh na tela para aparecer os novos usuários criados
 } 
  //Essa função eu criei pra pegar os dados que recebi lá do input
  //Quando eu clicar no botão ele vai no servidor, no método post em /usuarios, vai enviar essas informações para criar um novo usuario

  async function deleteUsers(id){
    await api.delete(`/usuarios/${id}`)
    
    getUsers()
  }


  useEffect(()=>{
    getUsers()
  }, [])

  return (
    <>
      <div className='container'>
        <form>
          <h1>Cadastro de Usuários</h1>
          <input placeholder="Nome" name="nome" type="text" ref={inputName} />
          <input placeholder="Idade" name="idade" type="number" ref={inputAge} />
          <input placeholder="E-mail" name="email" type="email" ref={inputEmail}/>

          <button type="button" onClick={createUsers}>Cadastrar</button>

        </form>

        {users.map(user => (
          <div key={user.id} className="card">
            <div>
              <p>Nome:<span>{user.name}</span></p>
              <p>Idade:<span>{user.age}</span></p>
              <p>Email:<span>{user.email}</span></p>
            </div>

            <button onClick={() => deleteUsers(user.id)}>
              <img src={Trash} />
            </button>

          </div>
        ))}

      </div>

    </>
  )
}

export default Home


//Na tag button nos podemos ser avisados toda vez que o botão for clicado usando onclick{} e dentro das chaves vai o nome da função que voce deseja chamar no clique