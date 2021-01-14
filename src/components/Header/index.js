import { useHistory } from "react-router-dom";
import { Button, Menu } from "semantic-ui-react";
import { Container } from "./_headerStyle";
import { LOGIN_PATH } from "../../constant";

function Header() {
  const history = useHistory();

  const handleLogoutClick = () => {
    sessionStorage.removeItem("user_token");
    history.replace(LOGIN_PATH);
  };

  return (
    <Container>
      <Menu size="massive" inverted>
        <Menu.Item name="Company Name" />
        <Menu.Menu position="right">
          <Menu.Item>
            <Button primary onClick={handleLogoutClick}>
              Logout
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Container>
  );
}

export default Header;
