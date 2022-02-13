import { Length, IsEmail, validate, Matches } from "class-validator";
import { ErrorField } from "../../../common/types";

interface ValidationResponse {
  user?: UserInput;
  errors?: ErrorField[];
}

class UserInput {
  @Length(1, 20)
  firstName: string;

  @Length(1, 20)
  lastName: string;

  @IsEmail({}, { message: "invalid email" })
  email: string;

  @Matches(/(|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "password must contains letters and numbers",
  })
  @Length(8, 50)
  password: string;
}

export const validateInput = async ({
  email,
  password,
  firstName,
  lastName,
}: UserInput): Promise<ValidationResponse> => {
  const user = new UserInput();
  user.email = email;
  user.firstName = firstName;
  user.lastName = lastName;
  user.password = password;

  const errors = await validate(user).then((error) => {
    if (error.length > 0) {
      return {
        errors: error.map((e) => {
          return { field: e.property, message: e.constraints };
        }) as ErrorField[],
      };
    }
    return;
  });

  if (errors) return errors;

  return { user };
};
