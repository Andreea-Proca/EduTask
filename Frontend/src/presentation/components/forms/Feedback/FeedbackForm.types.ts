import { UserRoleEnum } from "@infrastructure/apis/client";
import { FormController } from "../FormController";
import {
    UseFormHandleSubmit,
    UseFormRegister,
    FieldErrorsImpl,
    DeepRequired,
    UseFormWatch,
    Control,
    FieldValues
} from "react-hook-form";
import { SelectChangeEvent } from "@mui/material";
import { AmountEnum } from "@infrastructure/apis/client";

export type FeedbackFormModel = {
    title: string;
    rating: number;
    comment: string;
    attendance: number;
    understanding: boolean;
    engagement: boolean;
    assignmentCompletion: number;
    communication: AmountEnum;
    resources: AmountEnum;
    subjectId: string;
};

export type FeedbackFormState = {
    errors: FieldErrorsImpl<DeepRequired<FeedbackFormModel>>;
};

export type FeedbackFormActions = {
    register: UseFormRegister<FeedbackFormModel>;
    watch: UseFormWatch<FeedbackFormModel>;
    handleSubmit: UseFormHandleSubmit<FeedbackFormModel>;
    submit: (body: FeedbackFormModel) => void;
    selectAmountResource: (value: SelectChangeEvent<AmountEnum>) => void;
    selectAmountCommunication: (value: SelectChangeEvent<AmountEnum>) => void;
    selectUnderstanding: (value: SelectChangeEvent<boolean>) => void;
    selectEngagement: (value: SelectChangeEvent<boolean>) => void;
    selectCompletion: (value: SelectChangeEvent<number>) => void;
    selectRating: (newValue: number) => void;
    selectAttendance: (value: SelectChangeEvent<number>) => void;
    selectSubject: (value: SelectChangeEvent<string>) => void;
};

export type FeedbackFormComputed = {
    defaultValues: FeedbackFormModel,
    isSubmitting: boolean
};

export type FeedbackFormController = FormController<FeedbackFormState, FeedbackFormActions, FeedbackFormComputed>;