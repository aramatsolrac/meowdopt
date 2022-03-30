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
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab
            _selected={{ color: "#dea48f", bg: "#fff2ed" }}
            color="#dea48f"
            _hover={{ bg: "#ffd6c8" }}
            _focus={{ outlineColor: "#fabfab" }}
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
            _hover={{ bg: "#ffd6c8" }}
            _focus={{ outlineColor: "#fabfab" }}
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
          <TabPanel id="favorites">
            <FavoritesCats />
          </TabPanel>
          <TabPanel id="requests">
            <RequestsCats />
          </TabPanel>
        </TabPanels>
      </Tabs>
    );
  }
}

export default Profile;
