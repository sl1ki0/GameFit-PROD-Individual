import type { FirstFormValues } from "./UserDataTypes";

export default interface FirstFormSubmitArgs {
    valid: boolean;
    values: FirstFormValues;
}
