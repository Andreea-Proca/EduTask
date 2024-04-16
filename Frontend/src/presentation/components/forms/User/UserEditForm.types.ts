import { UserRoleEnum } from "@infrastructure/apis/client";
import { FormController } from "../FormController";
import {
    UseFormHandleSubmit,
    UseFormRegister,
    FieldErrorsImpl,
    DeepRequired,
    UseFormWatch
} from "react-hook-form";
import { SelectChangeEvent } from "@mui/material";

export type UserEditFormModel = {
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRoleEnum;
};

export type UserEditFormState = {
    errors: FieldErrorsImpl<DeepRequired<UserEditFormModel>>;
};

export type UserEditFormActions = {
    register: UseFormRegister<UserEditFormModel>;
    watch: UseFormWatch<UserEditFormModel>;
    handleSubmit: UseFormHandleSubmit<UserEditFormModel>;
    // submit: (body: UserEditFormModel) => void;
    update: (body: UserEditFormModel) => void;
    selectRole: (value: SelectChangeEvent<UserRoleEnum>) => void;
};
export type UserEditFormComputed = {
    defaultValues: UserEditFormModel,
    isSubmitting: boolean
};

export type UserEditFormController = FormController<UserEditFormState, UserEditFormActions, UserEditFormComputed>;