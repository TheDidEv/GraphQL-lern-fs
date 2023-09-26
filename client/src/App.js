import { useMutation, useQuery } from '@apollo/client';
import './App.css';
import { useEffect, useState } from 'react';
import { GET_ALL_USERS, GET_ONE_USER } from './query/user';
import { CREATE_USER } from './mutation/user';

function App() {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS);//, { pollInterval: 500 } - запит відправляюєтьяс кожні пів секунди, схоже на веб-сокет
  const { data: oneUser, loading: loadingOneUSer } = useQuery(GET_ONE_USER, {
    variables: {
      id: 1
    }
  });

  const [newUser] = useMutation(CREATE_USER);

  const [users, setUsers] = useState([]);

  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);

  console.log(oneUser);

  useEffect(() => {
    if (!loading) setUsers(data.getAllUsers)
  }, [data]);

  if (loading) return <h1>LOADING...</h1>
  if (error) console.log(error);


  const addUser = (e) => {
    e.preventDefault(); //so that the page does not reload after adding
    newUser({
      variables: {
        input: {
          username, age
        }
      }
    }).then(({ data }) => {
      console.log(data);
      setUsername("");
      setAge(0);
    });
  }

  const getAll = e => {
    e.preventDefault();
    refetch();
  }

  return (
    <div className="App">
      <form>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          type="text"
        />
        <input
          value={age}
          onChange={e => setAge(e.target.value)}
          type="number"
        />

        <div className='btns'>
          <button onClick={(e) => addUser(e)}>Create</button>
          <button onClick={e => getAll(e)}>Get all users</button>
        </div>

        <div>
          {users.map(user =>
            <div className='user' key={user.id}> Id: {user.id}. Username: {user.username}. Age: {user.age}</div>
          )}
        </div>

      </form>
    </div>
  );
}

export default App;
