import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Message, Divider } from "semantic-ui-react";
import Header from "../../components/Header";
import { Container } from "./_staffStyle";
import { DASHBOARD_PATH, STAFF_API } from "../../constant";

const RELIGIONS = [
  { key: "1", text: "Islam", value: "Islam" },
  { key: "2", text: "Christian", value: "Christian" },
  { key: "3", text: "Catolic", value: "Catolic" },
  { key: "4", text: "Hindu", value: "Hindu" },
  { key: "5", text: "Budha", value: "Budha" },
  { key: "6", text: "Other", value: "Other" },
];

const EMPLOYEE_STATUS = [
  { key: "1", text: "Intern", value: "Intern" },
  { key: "2", text: "Fulltime", value: "Fulltime" },
];

function Staff() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [religion, setReligion] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("Single");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [startDate, setStartDate] = useState("");
  const [salary, setSalary] = useState("");
  const [position, setPosition] = useState("");
  const [employeeStatus, setEmployeeStatus] = useState("");
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const [isSubmissionSucceed, setSubmissionSucceed] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const history = useHistory();

  const token = sessionStorage.getItem("user_token");
  const staffID = sessionStorage.getItem("staff_id");
  const activeStaff = sessionStorage.getItem("active_staff");
  const companyID = sessionStorage.getItem("company_id");

  useEffect(() => {
    if (activeStaff) {
      const parsedStaff = JSON.parse(activeStaff);
      setName(parsedStaff.name);
      setGender(parsedStaff.gender);
      setReligion(parsedStaff.religion);
      setMaritalStatus(parsedStaff.marital_status);
      setAddress(parsedStaff.address);
      setCity(parsedStaff.city);
      setCountry(parsedStaff.country);
      setStartDate(parsedStaff.start_date);
      setSalary(parsedStaff.salary);
      setPosition(parsedStaff.position);
      setEmployeeStatus(parsedStaff.employee_status);
    }
  }, []);

  useEffect(() => {
    return () => {
      sessionStorage.removeItem("staff_id");
      sessionStorage.removeItem("active_staff");
    };
  }, []);

  useEffect(() => {
    if (isSubmissionSucceed) {
      setTimeout(() => {
        sessionStorage.removeItem("staff_id");
        sessionStorage.removeItem("active_staff");
        setSubmissionSucceed(false);
        history.push(DASHBOARD_PATH);
      }, 3000);
    }
  }, [isSubmissionSucceed]);

  const handleSubmission = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (
      companyID &&
      name &&
      gender &&
      religion &&
      maritalStatus &&
      address &&
      city &&
      country &&
      startDate &&
      salary &&
      position &&
      employeeStatus
    ) {
      setLoading(true);
      const API_ENDPOINT = staffID ? `${STAFF_API}/${staffID}` : STAFF_API;
      const HTTP_METHOD = staffID ? "PUT" : "POST";
      fetch(API_ENDPOINT, {
        method: HTTP_METHOD,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          company_id: companyID,
          name,
          gender,
          religion,
          marital_status: maritalStatus,
          address,
          city,
          country,
          start_date: startDate,
          salary: parseInt(salary),
          position,
          employee_status: employeeStatus,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Something went wrong");
          }
          return res.json();
        })
        .then((res) => {
          setSubmissionSucceed(true);
          setLoading(false);
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

  const handleGenderChange = (_, { value }) => {
    setGender(value);
  };

  return (
    <Container>
      <Header />
      <h2>{staffID ? "Edit Existing" : "Add New"} Staff</h2>
      <Divider />
      <Form onSubmit={handleSubmission}>
        <Form.Input
          label="Name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={isFormSubmitted && !name}
        />
        <Form.Group inline>
          <label>Gender</label>
          <Form.Radio
            label="Male"
            value="Male"
            checked={gender === "Male"}
            onChange={handleGenderChange}
            error={isFormSubmitted && !gender}
          />
          <Form.Radio
            label="Female"
            value="Female"
            checked={gender === "Female"}
            onChange={handleGenderChange}
            error={isFormSubmitted && !gender}
          />
        </Form.Group>
        <Form.Select
          label="Religion"
          options={RELIGIONS}
          value={religion}
          placeholder="Religion"
          onChange={(_, { value }) => setReligion(value)}
          error={isFormSubmitted && !religion}
        />
        <Form.Group inline>
          <label>Marital Status</label>
          <Button
            content="Single"
            type="button"
            primary={maritalStatus === "Single"}
            onClick={() => setMaritalStatus("Single")}
          />
          <Button
            content="Married"
            type="button"
            primary={maritalStatus === "Married"}
            onClick={() => setMaritalStatus("Married")}
          />
        </Form.Group>
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
          type="date"
          label="Start Date"
          placeholder="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          error={isFormSubmitted && !startDate}
        />
        <Form.Input
          type="number"
          label="Salary"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          error={isFormSubmitted && !salary}
        />
        <Form.Input
          label="Position"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          error={isFormSubmitted && !position}
        />
        <Form.Select
          label="Employee Status"
          options={EMPLOYEE_STATUS}
          value={employeeStatus}
          placeholder="Employee Status"
          onChange={(_, { value }) => setEmployeeStatus(value)}
          error={isFormSubmitted && !employeeStatus}
        />
        {isSubmissionSucceed && (
          <Message positive>
            <Message.Header>Succeed</Message.Header>
            <p>
              You have successfully{" "}
              {staffID ? "edited existing staff" : "added a new staff"}
            </p>
          </Message>
        )}
        <Button
          type="submit"
          loading={isLoading}
          content="Submit"
          fluid
          secondary
        />
        <Button content="Cancel" fluid onClick={handleCancelClick} />
      </Form>
    </Container>
  );
}

export default Staff;
