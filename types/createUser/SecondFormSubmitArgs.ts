import type { SecondFormValues } from "./UserDataTypes";

export default interface SecondFormSubmitArgs {
    valid: boolean;
    values: SecondFormValues
}
