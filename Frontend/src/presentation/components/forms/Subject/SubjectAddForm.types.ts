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

export type SubjectAddFormModel = {
    name: string;
    description: string;
    professorId: string;
};

export type SubjectAddFormState = {
    errors: FieldErrorsImpl<DeepRequired<SubjectAddFormModel>>;
};

export type SubjectAddFormActions = {
    register: UseFormRegister<SubjectAddFormModel>;
    watch: UseFormWatch<SubjectAddFormModel>;
    handleSubmit: UseFormHandleSubmit<SubjectAddFormModel>;
    submit: (body: SubjectAddFormModel) => void;
    selectProfessor: (value: SelectChangeEvent<string>) => void;
};
export type SubjectAddFormComputed = {
    defaultValues: SubjectAddFormModel,
    isSubmitting: boolean
};

export type SubjectAddFormController = FormController<SubjectAddFormState, SubjectAddFormActions, SubjectAddFormComputed>;