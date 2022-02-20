import { NextPage, NextPageContext } from "next";
import { connect, useDispatch } from "react-redux";
import InputField from "../../shared-components/InputField";
import { PageHead } from "../../shared-components/PageHead";
import { userApiSignUp } from "../../store/reducers/user/actions";
import { State } from "../../store/store";
import { LockClosedIcon } from "@heroicons/react/solid";
import NextLink from "next/link";
import Button from "../../shared-components/Button";
import UnderlineLink from "../../shared-components/UnderlineLink";
type RegisterProps = NextPageContext & State;

const Register: NextPage<RegisterProps> = ({ user }) => {
  const dispatch = useDispatch();
  const getUserData = (e: any) => {
    e.preventDefault();
    const data = {
      firstName: e.target.firstName.value as string,
      lastName: e.target.lastName.value as string,
      email: e.target.email.value as string,
      password: e.target.password.value as string,
    };
    dispatch(userApiSignUp(data));
  };

  return (
    <>
      <PageHead title="Register" />
      <section className="h-screen w-full flex items-center justify-center">
        <form onSubmit={getUserData} className="max-w-md w-full">
          <InputField name="firstName" label="First name" type="text" />
          <InputField name="lastName" label="Last name" type="text" />
          <InputField name="email" label="Email address" type="email" />
          <InputField name="password" label="Password" type="password" />

          <div className="mb-4 text-sm flex justify-between">
            <UnderlineLink>
              <NextLink href="/login">Sign in</NextLink>
            </UnderlineLink>

            <UnderlineLink>
              <NextLink href="#">Terms & Conditions</NextLink>
            </UnderlineLink>
          </div>
          <Button loading={user.loading.signing} type="submit" fullWidth={true}>
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon
                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                aria-hidden="true"
              />
            </span>
            Sign up
          </Button>
        </form>
      </section>
    </>
  );
};

export default connect((state) => state)(Register);
