import "./Profile.scss";
import { Component } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faFile } from "@fortawesome/free-solid-svg-icons";
import FavoritesCats from "../FavoritesCats/FavoritesCats";
import RequestsCats from "../RequestsCats/RequestsCats";

class Profile extends Component {
  state = {};

  render() {
    return (
      <div className="profile">
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab
              _selected={{ color: "#dea48f", bg: "#fff2ed" }}
              color="#dea48f"
              _focus={{ outlineColor: "#fff2ed" }}
              borderBottomColor="#fff2ed"
            >
              <FontAwesomeIcon
                icon={faHeart}
                className="profile__icon"
                size="lg"
              />
              Favorites
            </Tab>
            <Tab
              _selected={{ color: "#dea48f", bg: "#fff2ed" }}
              color="#dea48f"
              _focus={{ outlineColor: "#fff2ed" }}
              borderBottomColor="#fff2ed"
            >
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
}

export default Profile;
