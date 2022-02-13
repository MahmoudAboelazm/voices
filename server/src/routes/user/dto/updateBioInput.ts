import { Length, validate } from "class-validator";
import { ErrorField } from "../../../common/types";

class UpdateBio {
  @Length(0, 250)
  bio: string;
}
interface ValidationResponse {
  bio?: string;
  errors?: ErrorField[];
}
export const validateBioInput = async (
  props: UpdateBio,
): Promise<ValidationResponse> => {
  const bio = new UpdateBio();
  bio.bio = props.bio;

  const errors = await validate(bio).then((error) => {
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

  return { bio: bio.bio };
};
