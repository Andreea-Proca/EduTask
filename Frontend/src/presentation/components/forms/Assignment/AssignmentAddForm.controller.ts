import { AssignmentAddFormController, AssignmentAddFormModel } from "./AssignmentAddForm.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useIntl } from "react-intl";
import * as yup from "yup";
import { isUndefined } from "lodash";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAssignmentApi } from "@infrastructure/apis/api-management";
import { useCallback, useEffect } from "react";
// import { UserRoleEnum } from "@infrastructure/apis/client";
import { SelectChangeEvent } from "@mui/material";
import { useAppRouter } from "@infrastructure/hooks/useAppRouter";

/**
 * Use a function to return the default values of the form and the validation schema.
 * You can add other values as the default, for example when populating the form with data to update an entity in the backend.
 */
const getDefaultValues = (initialData?: AssignmentAddFormModel) => {
    const defaultValues = {
        title: "",
        description: "",
        dueDate: new Date(),
        subjectId: "",
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
const useInitAssignmentAddForm = () => {
    const { formatMessage } = useIntl();
    const defaultValues = getDefaultValues();

    const schema = yup.object().shape({
        title: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.title",
                    }),
                }))
            .default(defaultValues.title),
        description: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.description",
                    }),
                }))
            .default(defaultValues.description),
        subjectId: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.subject",
                    }),
                }))
            .default(defaultValues.subjectId),
        dueDate: yup.date()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.dueDate",
                    }),
                }))
            .default(defaultValues.dueDate),
    });

    const resolver = yupResolver(schema);

    return { defaultValues, resolver };
}

/**
 * Create a controller hook for the form and return any data that is necessary for the form.
 */
export const useAssignmentAddFormController = (onSubmit?: () => void, dueDate?: Date): AssignmentAddFormController => {
    const { defaultValues, resolver } = useInitAssignmentAddForm();
    const { redirectToLogin } = useAppRouter();
    const { addAssignment: { mutation, key: mutationKey }, getAssignments: { key: queryKey } } = useAssignmentApi();
    const { mutateAsync: add, status } = useMutation({
        mutationKey: [mutationKey], 
        mutationFn: mutation
    });
    const queryClient = useQueryClient();
    const submit = useCallback((data: AssignmentAddFormModel) => // Create a submit callback to send the form data to the backend.
        add(data).then(() => {
            queryClient.invalidateQueries({ queryKey: [queryKey] }); // If the form submission succeeds then some other queries need to be refresh so invalidate them to do a refresh.

            if (onSubmit) {
                onSubmit();
            }
        }), [add, queryClient, queryKey, onSubmit]);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm<AssignmentAddFormModel>({ // Use the useForm hook to get callbacks and variables to work with the form.
        defaultValues, // Initialize the form with the default values.
        resolver // Add the validation resolver.
    });

    const selectSubject = useCallback((event: SelectChangeEvent<string>) => { // Select inputs are tricky and may need their on callbacks to set the values.
        setValue("subjectId", event.target.value as string, {
            shouldValidate: true,
        });
    }, [setValue]);

    const selectDate = useCallback((event: SelectChangeEvent<Date>) => { // Select inputs are tricky and may need their on callbacks to set the values.
       // Date dateString = new Date(event.target.value);
        console.log("event.target.value: ", event.target.value);
        setValue("dueDate", event.target.value as Date, {
            shouldValidate: true,
        });
    }, [setValue]);

    // useEffect(() => {
    //     console.log("idddd: ", dueDate);
    //     if (dueDate) {
    //         setValue("dueDate", dueDate);
    //     }
    // }, [dueDate, setValue]);

    return {
        actions: { // Return any callbacks needed to interact with the form.
            handleSubmit, // Add the form submit handle.
            submit, // Add the submit handle that needs to be passed to the submit handle.
            register, // Add the variable register to bind the form fields in the UI with the form variables.
            watch, // Add a watch on the variables, this function can be used to watch changes on variables if it is needed in some locations.
            selectSubject,
            selectDate
        },
        computed: {
            defaultValues,
            isSubmitting: status === "pending" // Return if the form is still submitting or nit.
        },
        state: {
            errors // Return what errors have occurred when validating the form input.
        },
    }
}