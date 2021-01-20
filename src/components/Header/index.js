import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router-dom";
import { Button, Menu } from "semantic-ui-react";
import { Container } from "./_headerStyle";
import { DASHBOARD_PATH, LOGIN_PATH } from "../../constant";

function Header(props) {
  const history = useHistory();
  const location = useLocation();

  const handleLogoutClick = () => {
    sessionStorage.clear();
    history.replace(LOGIN_PATH);
  };

  const handleCompanyNameClick = () => {
    if (location.pathname !== DASHBOARD_PATH) {
      history.goBack();
    }
  };

  return (
    <Container>
      <Menu size="massive" inverted>
        <Menu.Item name={props.companyName} onClick={handleCompanyNameClick} />
        {props.isLogin && (
          <Menu.Menu position="right">
            <Menu.Item>
              <Button primary onClick={handleLogoutClick}>
                Logout
              </Button>
            </Menu.Item>
          </Menu.Menu>
        )}
      </Menu>
    </Container>
  );
}

Header.propTypes = {
  companyName: PropTypes.string,
  isLogin: PropTypes.bool,
};

Header.defaultProps = {
  companyName: "",
  isLogin: false,
};

export default Header;
