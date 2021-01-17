import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Table, Button, Modal } from "semantic-ui-react";
import Header from "../../components/Header";
import { Container, AddWrapper } from "./_dashboardStyle";
import { ALL_STAFF_API, STAFF_PATH, STAFF_API } from "../../constant";

function Dashboard() {
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState("");
  const [selectedID, setSelectedID] = useState("");
  const [displayModal, setDisplayModal] = useState(false);

  const history = useHistory();

  const token = sessionStorage.getItem("user_token");
  const companyID = sessionStorage.getItem("company_id");

  const getAllStaffs = () => {
    fetch(`${ALL_STAFF_API}/${companyID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setStaffList(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllStaffs();
  }, []);

  const handleAddStaffClick = () => {
    history.push(STAFF_PATH);
  };

  const handleEditClick = (staff) => {
    sessionStorage.setItem("staff_id", staff._id);
    sessionStorage.setItem("active_staff", JSON.stringify(staff));
    setTimeout(() => {
      history.push(STAFF_PATH);
    }, 500);
  };

  const handleDeleteClick = (staff) => {
    setSelectedID(staff._id);
    setSelectedStaff(staff.name);
    setDisplayModal(true);
  };

  const handleContinueDelete = (staffID) => {
    fetch(`${STAFF_API}/${staffID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        return res.json();
      })
      .then((res) => {
        setSelectedStaff("");
        setSelectedID("");
        getAllStaffs();
        setDisplayModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Header />
      <AddWrapper>
        <Button primary onClick={handleAddStaffClick}>
          Add a new Staff
        </Button>
      </AddWrapper>
      <section>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Gender</Table.HeaderCell>
              <Table.HeaderCell>Religion</Table.HeaderCell>
              <Table.HeaderCell>Marital Status</Table.HeaderCell>
              <Table.HeaderCell>Address</Table.HeaderCell>
              <Table.HeaderCell>City</Table.HeaderCell>
              <Table.HeaderCell>Country</Table.HeaderCell>
              <Table.HeaderCell>Start Date</Table.HeaderCell>
              <Table.HeaderCell>Salary</Table.HeaderCell>
              <Table.HeaderCell>Position</Table.HeaderCell>
              <Table.HeaderCell>Employee Status</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {staffList.map((staff) => (
              <Table.Row key={staff._id}>
                <Table.Cell>{staff.name}</Table.Cell>
                <Table.Cell>{staff.gender}</Table.Cell>
                <Table.Cell>{staff.religion}</Table.Cell>
                <Table.Cell>{staff.marital_status}</Table.Cell>
                <Table.Cell>{staff.address}</Table.Cell>
                <Table.Cell>{staff.city}</Table.Cell>
                <Table.Cell>{staff.country}</Table.Cell>
                <Table.Cell>{staff.start_date}</Table.Cell>
                <Table.Cell>{staff.salary}</Table.Cell>
                <Table.Cell>{staff.position}</Table.Cell>
                <Table.Cell>{staff.employee_status}</Table.Cell>
                <Table.Cell>
                  <Button primary onClick={() => handleEditClick(staff)}>
                    Edit
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <Button secondary onClick={() => handleDeleteClick(staff)}>
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </section>
      <Modal
        dimmer="blurring"
        open={displayModal}
        onClose={() => setDisplayModal(false)}
      >
        <Modal.Header>Delete Confirmation</Modal.Header>
        <Modal.Content>
          Are you sure want to delete <b>{selectedStaff}</b>?
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => setDisplayModal(false)}>
            Cancel
          </Button>
          <Button positive onClick={() => handleContinueDelete(selectedID)}>
            Continue
          </Button>
        </Modal.Actions>
      </Modal>
    </Container>
  );
}

export default Dashboard;
