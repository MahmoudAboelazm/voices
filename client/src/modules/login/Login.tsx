import { LockClosedIcon } from "@heroicons/react/solid";
import { NextPage, NextPageContext } from "next";
import React from "react";
import { connect, useDispatch } from "react-redux";
import InputField from "../../shared-components/InputField";
import { PageHead } from "../../shared-components/PageHead";
import { userApiSignIn } from "../../store/reducers/user/actions";
import { State } from "../../store/store";
import NextLink from "next/link";
import Button from "../../shared-components/Button";
import UnderlineLink from "../../shared-components/UnderlineLink";
type RoomProps = NextPageContext & State;

const Login: NextPage<RoomProps> = ({ user }) => {
  const dispatch = useDispatch();
  const getUserData = (e: any) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    dispatch(userApiSignIn(data));
  };

  return (
    <>
      <PageHead title="Login" />
      <section className="h-screen w-full flex items-center justify-center">
        <form onSubmit={getUserData} className="max-w-md w-full">
          <InputField name="email" label={"Email address"} type="text" />
          <InputField name="password" label={"Password"} type="password" />

          <div className="mb-4 text-sm flex justify-between">
            <UnderlineLink>
              <NextLink href="/register">Sign up</NextLink>
            </UnderlineLink>
            <UnderlineLink>
              <NextLink href="#"> Forgot password?</NextLink>
            </UnderlineLink>
          </div>
          <Button loading={user.loading.signing} type="submit" fullWidth={true}>
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon
                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                aria-hidden="true"
              />
            </span>
            Sign in
          </Button>
        </form>
      </section>
    </>
  );
};

export default connect((state) => state)(Login);
