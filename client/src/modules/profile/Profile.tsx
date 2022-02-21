import { NextPage, NextPageContext } from "next";
import React from "react";
import { connect } from "react-redux";
import NavBar from "../../shared-components/Nav";
import { PageHead } from "../../shared-components/PageHead";
import UserProfile from "../../shared-components/UserProfile";
import { State } from "../../store/store";

type ProfileProps = NextPageContext & State & { id: string };

const Profile: NextPage<ProfileProps> = ({ id, user }) => {
  return (
    <>
      <PageHead title={user.profile?.firstName as string} />
      <NavBar />
      <main className="pt-24">
        <UserProfile userId={id} />
      </main>
    </>
  );
};

Profile.getInitialProps = ({ query }) => {
  return { id: query.id } as ProfileProps;
};
export default connect((state) => state)(Profile);
