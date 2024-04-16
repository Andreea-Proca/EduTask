import { FeedbackFormController, FeedbackFormModel } from "./FeedbackForm.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useIntl } from "react-intl";
import * as yup from "yup";
import { isUndefined } from "lodash";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFeedbackApi, useSubjectApi, useUserApi } from "@infrastructure/apis/api-management";
import { useCallback, useEffect } from "react";
import { UserRoleEnum } from "@infrastructure/apis/client";
import { SelectChangeEvent } from "@mui/material";
import { useAppRouter } from "@infrastructure/hooks/useAppRouter";
import { AmountEnum } from "@infrastructure/apis/client";
import { useSubjectController } from "./Subject.controller";

/**
 * Use a function to return the default values of the form and the validation schema.
 * You can add other values as the default, for example when populating the form with data to update an entity in the backend.
 */
const getDefaultValues = (initialData?: FeedbackFormModel) => {
    const defaultValues = {
        title: "",
        rating: 0,
        comment: "",
        attendance: 0,
        understanding: false,
        engagement: false,
        assignmentCompletion: 20,
        communication: "" as AmountEnum,
        resources: "" as AmountEnum,
        subjectId: ""
    };

    if (!isUndefined(initialData)) {
        return {
            ...defaultValues,
            ...initialData,
        };
    }

    return defaultValues;
};

/**
 * Create a hook to get the validation schema.
 */
const useInitFeedbackForm = () => {
    const { formatMessage } = useIntl();
    const defaultValues = getDefaultValues();

    const schema = yup.object().shape({
        rating: yup.number()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.rating",
                    }),
                }))
            .default(defaultValues.rating),
        comment: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.comment",
                    }),
                }))
            .default(defaultValues.comment),
        attendance: yup.number()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.attendance",
                    }),
                }))
            .default(defaultValues.attendance),
        understanding: yup.boolean()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.understanding",
                    }),
                }))
            .default(defaultValues.understanding),
        engagement: yup.boolean()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.engagement",
                    }),
                }))
            .default(defaultValues.engagement),
        assignmentCompletion: yup.number()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.assignmentCompletion",
                    }),
                }))
            .default(defaultValues.assignmentCompletion),
        resources: yup.string()
            .oneOf([ // The select input should have one of these values.
                AmountEnum.NotEnough,
                AmountEnum.Enough,
                AmountEnum.MoreThanEnough
            ])
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.resources",
                    }),
                }))
            .default(defaultValues.resources),
        communication: yup.string()
            .oneOf([ // The select input should have one of these values.
                AmountEnum.NotEnough,
                AmountEnum.Enough,
                AmountEnum.MoreThanEnough
            ])
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.communication",
                    }),
                }))
            .default(defaultValues.communication),
        subjectId: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.subject",
                    }),
                }))
            .default(defaultValues.subjectId),
        title: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.title",
                    }),
                }))
            .default(defaultValues.title),
    });

    const resolver = yupResolver(schema);

    return { defaultValues, resolver };
}

/**
 * Create a controller hook for the form and return any data that is necessary for the form.
 */
export const useFeedbackFormController = (onSubmit?: () => void): FeedbackFormController => {
    const { defaultValues, resolver } = useInitFeedbackForm();
    const { redirectToLogin } = useAppRouter();
    const { addFeedback: { mutation, key: mutationKey }, getFeedbacks: { key: queryKey } } = useFeedbackApi();
    const { mutateAsync: add, status } = useMutation({
        mutationKey: [mutationKey],
        mutationFn: mutation
    });
    const queryClient = useQueryClient();
    const submit = useCallback((data: FeedbackFormModel) => // Create a submit callback to send the form data to the backend.
        add(data).then(() => {
            queryClient.invalidateQueries({ queryKey: [queryKey] }); // If the form submission succeeds then some other queries need to be refresh so invalidate them to do a refresh.

            if (onSubmit) {
                onSubmit();
                redirectToLogin(); // Redirect to the login page after the form submission.
            }
        }), [add, queryClient, queryKey, redirectToLogin, onSubmit]);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm<FeedbackFormModel>({ // Use the useForm hook to get callbacks and variables to work with the form.
        defaultValues, // Initialize the form with the default values.
        resolver // Add the validation resolver.
    });

    const selectAmountResource = useCallback((event: SelectChangeEvent<AmountEnum>) => { // Select inputs are tricky and may need their on callbacks to set the values.
        setValue("resources", event.target.value as AmountEnum, {
            shouldValidate: true,
        });
    }, [setValue]);

    const selectAmountCommunication = useCallback((event: SelectChangeEvent<AmountEnum>) => { // Select inputs are tricky and may need their on callbacks to set the values.
        setValue("communication", event.target.value as AmountEnum, {
            shouldValidate: true,
        });
    }, [setValue]);

    const selectUnderstanding = useCallback((event: SelectChangeEvent<boolean>) => { // Select inputs are tricky and may need their on callbacks to set the values.
        setValue("understanding", event.target.value as boolean, {
            shouldValidate: true,
        });
    }, [setValue]);

    const selectEngagement = useCallback((event: SelectChangeEvent<boolean>) => { // Select inputs are tricky and may need their on callbacks to set the values.
        setValue("engagement", event.target.value as boolean, {
            shouldValidate: true,
        });
    }, [setValue]);

    const selectCompletion = useCallback((event: SelectChangeEvent<number>) => { // Select inputs are tricky and may need their on callbacks to set the values.
        setValue("assignmentCompletion", event.target.value as number, {
            shouldValidate: true,
        });
        console.log(event.target.value);
    }, [setValue]);

    const selectRating = useCallback((event: SelectChangeEvent<number>) => { // Select inputs are tricky and may need their on callbacks to set the values.
        setValue("rating", event.target.value as number, {
            shouldValidate: true,
        });
        console.log(event.target.value);
    }, [setValue]);

    const selectAttendance = useCallback((event: SelectChangeEvent<number>) => { // Select inputs are tricky and may need their on callbacks to set the values.
        setValue("attendance", event.target.value as number, {
            shouldValidate: true,
        });
    }, [setValue]);

    const selectSubject = useCallback((event: SelectChangeEvent<string>) => { // Select inputs are tricky and may need their on callbacks to set the values.
        setValue("subjectId", event.target.value as string, {
            shouldValidate: true,
        });
    }, [setValue]);

    return {
        actions: {
            handleSubmit, // Add the form submit handle with the correct type.
            submit, // Add the submit handle that needs to be passed to the submit handle.
            register, // Add the variable register to bind the form fields in the UI with the form variables.
            watch, // Add a watch on the variables, this function can be used to watch changes on variables if it is needed in some locations.
            selectAmountResource,
            selectAmountCommunication,
            selectUnderstanding,
            selectEngagement,
            selectCompletion,
            selectRating,
            selectAttendance,
            selectSubject
        },
        computed: {
            defaultValues,
            isSubmitting: status === "pending" // Return if the form is still submitting or nit.
        },
        state: {
            errors // Return what errors have occurred when validating the form input.
        }
    }
}