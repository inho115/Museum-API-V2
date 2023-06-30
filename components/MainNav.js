import {
  Nav,
  Navbar,
  Container,
  NavDropdown,
  Form,
  Button,
} from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export default function MainNav() {
  const router = useRouter();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      searchField: "Search",
    },
  });

  function submitForm(data) {
    router.push(`/artwork?title=true&q=${data.searchField}`);
  }

  return (
    <>
      <Navbar
        expand="lg"
        className="fixed-top text-light"
        data-bs-theme="light"
        bg="dark"
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
            <Form onSubmit={handleSubmit(submitForm)} className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                {...register("searchField")}
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
    </>
  );
}
