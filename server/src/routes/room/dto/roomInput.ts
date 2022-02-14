import { Length, validate } from "class-validator";
import { ErrorField } from "../../../common/types";

class roomInput {
  @Length(2, 50)
  name: string;
}

interface validationResponse {
  room?: roomInput;
  errors?: ErrorField[];
}
export const validateInput = async ({
  name,
}: roomInput): Promise<validationResponse> => {
  const room = new roomInput();
  room.name = name;

  const errors = await validate(room).then((error) => {
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

  return { room };
};
