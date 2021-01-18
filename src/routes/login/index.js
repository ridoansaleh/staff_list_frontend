import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Message, Divider } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import { Container, DoesntHaveAccount } from "./_loginStyle";
import { LOGIN_API, DASHBOARD_PATH, REGISTRATION_PATH } from "../../constant";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isCredentialError, setCredentialError] = useState(false);
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const history = useHistory();

  const handleSubmission = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!username || !password) return;
    setLoading(true);
    fetch(LOGIN_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        } else if ([400, 404].includes(res.status)) {
          setLoading(false);
          setCredentialError(true);
        }
      })
      .then((res) => {
        sessionStorage.setItem("company_id", res.company_id);
        sessionStorage.setItem("user_token", res.token);
        sessionStorage.setItem("company_name", res.company_name);
        setTimeout(() => {
          history.replace(DASHBOARD_PATH);
        }, 300);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleRegisterClick = () => {
    history.push(REGISTRATION_PATH);
  };

  return (
    <Container>
      <Helmet>
        <title>Staff List | Login</title>
      </Helmet>
      <h2>Please Login!</h2>
      <Form onSubmit={handleSubmission} error={isCredentialError}>
        <Form.Input
          label="Username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={isFormSubmitted && !username}
        />
        <Form.Input
          type="password"
          label="Password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={isFormSubmitted && !password}
        />
        <Message
          error
          header=""
          content="Your username or password is invalid"
        />
        <Button
          type="submit"
          loading={isLoading}
          content="Login"
          fluid
          secondary
        />
        <Divider />
        <DoesntHaveAccount>
          Doesn't have an account yet? Register your company{" "}
          <span onClick={handleRegisterClick}>here</span>
        </DoesntHaveAccount>
      </Form>
    </Container>
  );
}

export default Login;
