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

export type SubjectEditFormModel = {
    id: string;
    name: string;
    description: string;
    professorId: string;
};

export type SubjectEditFormState = {
    errors: FieldErrorsImpl<DeepRequired<SubjectEditFormModel>>;
};

export type SubjectEditFormActions = {
    register: UseFormRegister<SubjectEditFormModel>;
    watch: UseFormWatch<SubjectEditFormModel>;
    handleSubmit: UseFormHandleSubmit<SubjectEditFormModel>;
   // submit: (body: SubjectEditFormModel) => void;
    update: (body: SubjectEditFormModel) => void;
    selectProfessor: (value: SelectChangeEvent<string>) => void;
};
export type SubjectEditFormComputed = {
    defaultValues: SubjectEditFormModel,
    isSubmitting: boolean
};

export type SubjectEditFormController = FormController<SubjectEditFormState, SubjectEditFormActions, SubjectEditFormComputed>;