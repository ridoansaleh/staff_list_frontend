import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Message, Divider } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import { Container } from "./_registrationStyle";
import { REGISTRATION_API } from "../../constant";

function Registration() {
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [numberOfEmployee, setNumberOfEmployee] = useState("");
  const [industry, setIndustry] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const [isSubmissionSucceed, setSubmissionSucceed] = useState(false);
  const [isUsernameExist, setUsernameExist] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const history = useHistory();

  const handleSubmission = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (
      companyName &&
      address &&
      city &&
      country &&
      numberOfEmployee &&
      industry &&
      username &&
      password
    ) {
      setLoading(true);
      fetch(REGISTRATION_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company_name: companyName,
          address,
          city,
          country,
          number_of_employee: parseInt(numberOfEmployee),
          industry,
          admin_username: username,
          admin_password: password,
        }),
      })
        .then((res) => {
          setLoading(false);
          if (res.status === 201) {
            setSubmissionSucceed(true);
            setCompanyName("");
            setAddress("");
            setCity("");
            setCountry("");
            setNumberOfEmployee("");
            setIndustry("");
            setUsername("");
            setPassword("");
            setFormSubmitted(false);
            setUsernameExist(false);
            return res.json();
          } else if (res.status === 400) {
            setUsernameExist(true);
            setSubmissionSucceed(false);
          } else {
            setUsernameExist(false);
            setSubmissionSucceed(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setSubmissionSucceed(false);
          setLoading(false);
        });
    }
  };

  const handleCancelClick = () => {
    history.goBack();
  };

  return (
    <Container>
      <Helmet>
        <title>Staff List | Registration</title>
      </Helmet>
      <h2>Company Details</h2>
      <Divider />
      <Form onSubmit={handleSubmission}>
        <Form.Input
          label="Company Name"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          error={isFormSubmitted && !companyName}
        />
        <Form.TextArea
          label="Address"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          error={isFormSubmitted && !address}
        />
        <Form.Input
          label="City"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          error={isFormSubmitted && !city}
        />
        <Form.Input
          label="Country"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          error={isFormSubmitted && !country}
        />
        <Form.Input
          type="number"
          label="Number of Employee"
          placeholder="Number of Employee"
          value={numberOfEmployee}
          onChange={(e) => setNumberOfEmployee(e.target.value)}
          error={isFormSubmitted && !numberOfEmployee}
        />
        <Form.Input
          label="Industry"
          placeholder="Industry"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          error={isFormSubmitted && !industry}
        />
        <Form.Input
          label="Admin Username"
          placeholder="Admin Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={isFormSubmitted && !username}
        />
        <Form.Input
          type="password"
          label="Admin Password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={isFormSubmitted && !password}
        />
        {isUsernameExist && (
          <Message negative>
            <Message.Header>Username already taken</Message.Header>
            <p>Please use an unique username for your admin!</p>
          </Message>
        )}
        {isSubmissionSucceed && (
          <Message positive>
            <Message.Header>Successfully Registered</Message.Header>
            <p>Please login to start adding staffs to your company!</p>
          </Message>
        )}
        <Button
          type="submit"
          loading={isLoading}
          content="Sign Up"
          fluid
          secondary
        />
        <Button content="Cancel" fluid onClick={handleCancelClick} />
      </Form>
    </Container>
  );
}

export default Registration;
