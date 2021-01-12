import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Message } from "semantic-ui-react";
import { Container } from "./_loginStyle";
import { LOGIN_API, DASHBOARD_PATH } from "../../constant";

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
          history.replace(DASHBOARD_PATH);
        } else if ([400, 404].includes(res.status)) {
          setLoading(false);
          setCredentialError(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <Container>
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
      </Form>
    </Container>
  );
}

export default Login;
