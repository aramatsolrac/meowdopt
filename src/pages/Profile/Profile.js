import "./Profile.scss";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faFile } from "@fortawesome/free-solid-svg-icons";
import FavoritesCats from "../FavoritesCats/FavoritesCats";
import RequestsCats from "../RequestsCats/RequestsCats";

function Profile() {
  const tabStyle = {
    _selected: { color: "#dea48f", bg: "#fff2ed" },
    color: "#dea48f",
    _focus: { outlineColor: "#fff2ed" },
    borderBottomColor: "#fff2ed",
  };

  return (
    <div className="profile" style={{ minHeight: window.screen.height + 30 }}>
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab sx={tabStyle}>
            <FontAwesomeIcon
              icon={faHeart}
              className="profile__icon"
              size="lg"
            />
            Favorites
          </Tab>
          <Tab sx={tabStyle}>
            <FontAwesomeIcon
              icon={faFile}
              className="profile__icon"
              size="lg"
            />
            Requests
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <FavoritesCats />
          </TabPanel>
          <TabPanel>
            <RequestsCats />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default Profile;
