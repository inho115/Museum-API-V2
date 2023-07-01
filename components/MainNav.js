import { Nav, Navbar, Container, Form, Button } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function MainNav() {
  const router = useRouter();
  const [searchField, setSearchField] = useState();

  function submitForm(e) {
    e.preventDefault();
    router.push(`/artwork?title=true&q=${searchField}`);
  }

  return (
    <Container>
      <Navbar
        expand="lg"
        className="fixed-top navbar-expand-lg bg-dark navbar-dark"
      >
        <Container>
          <Navbar.Brand>
            <span>IN HO HAN</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" legacyBehavior passHref>
                <Nav.Link>
                  <span>Home</span>
                </Nav.Link>
              </Link>
              <Link href="/search" legacyBehavior passHref>
                <Nav.Link>
                  <span>Advanced Search</span>
                </Nav.Link>
              </Link>
            </Nav>
            <Form onSubmit={submitForm} className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                name="searchField"
                aria-label="Search"
                onChange={(e) => setSearchField(e.target.value)}
              />
              <Button variant="success" type="submit">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
      <br />
    </Container>
  );
}
