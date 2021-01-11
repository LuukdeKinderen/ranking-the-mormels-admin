import Cookies from 'universal-cookie';

import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';

export default function NavBar(props) {
    const cookies = new Cookies();

    function handleLogout() {
        props.setJwt(undefined);
        cookies.remove('jwt', { path: '/' });
    }

    var logout;

    if (props.jwt !== undefined) {
        logout = <Button
            variant="primary"
            onClick={() => handleLogout()}
        >Logout</Button>

    }

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Ranking the mormels Admin</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="https://ranking-the-mormels.herokuapp.com/">App</Nav.Link>
                    </Nav>
                    <Form inline>
                        {logout}
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}
