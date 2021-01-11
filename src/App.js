import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

import { useEffect, useState } from 'react';

import Cookies from 'universal-cookie';

import Login from './Screens/Login'
import EditTable from './Screens/EditTable'
import NavBar from './components/NavBar'

function App() {
  const cookies = new Cookies();
  const [jwt, setJwt] = useState(cookies.get("jwt") || undefined);

  useEffect(() => {
    if (jwt !== undefined) {
      // now + 1 hour then jwt is not valid anymore
      var expires = new Date(Date.now() + 1000 * 60 * 60);
      cookies.set('jwt', jwt, { path: '/', expires: expires });
    }
  }, [jwt, cookies])


  var page;
  if (jwt !== undefined) {
    page = <EditTable jwt={jwt} />
  } else {
    page = <Login setJwt={setJwt} />
  }

  return (
    <>
      <NavBar jwt={jwt} setJwt={setJwt} />
      <Container>
        {page}
      </Container>
    </>
  )
}

export default App;
