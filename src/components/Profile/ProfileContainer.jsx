import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../../redux/profile-reducer";
import Profile from "./Profile";
export function withRouter(Children) {
  return props => {
    const match = { params: useParams() };
    return <Children {...props} match={match} />;
  };
}
class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = 2;
    }
    this.props.getUserProfile(userId);
  }
  render() {
    return <Profile {...this.props} profile={this.props.profile} />;
  }
}
const mapStateToProps = state => ({
  profile: state.profilePage.profile,
});

const WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, { getUserProfile })(
  WithUrlDataContainerComponent
);
