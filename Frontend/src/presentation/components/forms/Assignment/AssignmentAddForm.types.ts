// import { UserRoleEnum } from "@infrastructure/apis/client";
import { FormController } from "../FormController";
import {
    UseFormHandleSubmit,
    UseFormRegister,
    FieldErrorsImpl,
    DeepRequired,
    UseFormWatch
} from "react-hook-form";
import { SelectChangeEvent } from "@mui/material";

export type AssignmentAddFormModel = {
    title: string;
    description: string;
    dueDate: Date;
    subjectId: string;
};

export type AssignmentAddFormState = {
    errors: FieldErrorsImpl<DeepRequired<AssignmentAddFormModel>>;
};

export type AssignmentAddFormActions = {
    register: UseFormRegister<AssignmentAddFormModel>;
    watch: UseFormWatch<AssignmentAddFormModel>;
    handleSubmit: UseFormHandleSubmit<AssignmentAddFormModel>;
    submit: (body: AssignmentAddFormModel) => void;
    selectSubject: (value: SelectChangeEvent<string>) => void;
    selectDate: (value: SelectChangeEvent<Date>) => void;
};
export type AssignmentAddFormComputed = {
    defaultValues: AssignmentAddFormModel,
    isSubmitting: boolean
};

export type AssignmentAddFormController = FormController<AssignmentAddFormState, AssignmentAddFormActions, AssignmentAddFormComputed>;