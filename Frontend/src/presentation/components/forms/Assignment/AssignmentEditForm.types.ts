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

export type AssignmentEditFormModel = {
    id: string,
    title: string;
    description: string;
    dueDate: Date;
    subjectId: string;
};

export type AssignmentEditFormState = {
    errors: FieldErrorsImpl<DeepRequired<AssignmentEditFormModel>>;
};

export type AssignmentEditFormActions = {
    register: UseFormRegister<AssignmentEditFormModel>;
    watch: UseFormWatch<AssignmentEditFormModel>;
    handleSubmit: UseFormHandleSubmit<AssignmentEditFormModel>;
    //submit: (body: AssignmentEditFormModel) => void;
    update: (body: AssignmentEditFormModel) => void;
    selectSubject: (value: SelectChangeEvent<string>) => void;
    selectDate: (value: SelectChangeEvent<Date>) => void;
};
export type AssignmentEditFormComputed = {
    defaultValues: AssignmentEditFormModel,
    isSubmitting: boolean
};

export type AssignmentEditFormController = FormController<AssignmentEditFormState, AssignmentEditFormActions, AssignmentEditFormComputed>;