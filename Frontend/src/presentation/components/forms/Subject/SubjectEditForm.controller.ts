import { SubjectEditFormController, SubjectEditFormModel } from "./SubjectEditForm.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useIntl } from "react-intl";
import * as yup from "yup";
import { isUndefined } from "lodash";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSubjectApi } from "@infrastructure/apis/api-management";
import { useCallback, useEffect } from "react";
// import { UserRoleEnum } from "@infrastructure/apis/client";
import { SelectChangeEvent } from "@mui/material";
import { useAppRouter } from "@infrastructure/hooks/useAppRouter";

/**
 * Use a function to return the default values of the form and the validation schema.
 * You can Edit other values as the default, for example when populating the form with data to update an entity in the backend.
 */
const getDefaultValues = (initialData?: SubjectEditFormModel) => {
    const defaultValues = {
        id: "",
        name: "",
        description: "",
        professorId: ""
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
const useInitSubjectEditForm = () => {
    const { formatMessage } = useIntl();
    const defaultValues = getDefaultValues();

    const schema = yup.object().shape({
        id: yup.string()
        .required(formatMessage(
            { id: "globals.validations.requiredField" },
            {
                fieldName: formatMessage({
                    id: "globals.id",
                }),
            }))
        .default(defaultValues.id),
        name: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.name",
                    }),
                }))
            .default(defaultValues.name),
        description: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.description",
                    }),
                }))
            .default(defaultValues.description),
        professorId: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.professor",
                    }),
                }))
            .default(defaultValues.professorId),
    });

    const resolver = yupResolver(schema);

    return { defaultValues, resolver };
}

/**
 * Create a controller hook for the form and return any data that is necessary for the form.
 */
export const useSubjectEditFormController = (onSubmit?: () => void, id?: string): SubjectEditFormController => {
    const { defaultValues, resolver } = useInitSubjectEditForm();
    const { redirectToLogin } = useAppRouter();
    const { addSubject: { mutation, key: mutationKey }, getSubjects: { key: queryKey },  updateSubject: { key: updateSubjectKey, mutation: updateSubject } } = useSubjectApi();
    const { mutateAsync: add, status } = useMutation({
        mutationKey: [mutationKey], 
        mutationFn: mutation
    });
    const queryClient = useQueryClient();
    // const submit = useCallback((data: SubjectEditFormModel) => // Create a submit callback to send the form data to the backend.
    //     add(data).then(() => {
    //         queryClient.invalidateQueries({ queryKey: [queryKey] }); // If the form submission succeeds then some other queries need to be refresh so invalidate them to do a refresh.

    //         if (onSubmit) {
    //             onSubmit();
    //         }
    //     }), [add, queryClient, queryKey, onSubmit]);

    const { mutateAsync: updateMutation } = useMutation({
        mutationKey: [updateSubjectKey],
        mutationFn: updateSubject
    });
    const update = useCallback((data: SubjectEditFormModel) => // Create a submit callback to send the form data to the backend.
    updateMutation(data).then(() => {
            queryClient.invalidateQueries({ queryKey: [queryKey] }); // If the form submission succeeds then some other queries need to be refresh so invalidate them to do a refresh.
            
            if (onSubmit) {
                onSubmit();
            }
        }), [updateMutation, queryClient, queryKey, onSubmit]);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm<SubjectEditFormModel>({ // Use the useForm hook to get callbacks and variables to work with the form.
        defaultValues, // Initialize the form with the default values.
        resolver // Add the validation resolver.
    });

    const selectProfessor = useCallback((event: SelectChangeEvent<string>) => { // Select inputs are tricky and may need their on callbacks to set the values.
        setValue("professorId", event.target.value as string, {
            shouldValidate: true,
        });
    }, [setValue]);

    useEffect(() => {
        console.log("idddd: ", id);
            setValue("id", id ?? "");
    }, [id, setValue]);

    return {
        actions: { // Return any callbacks needed to interact with the form.
            handleSubmit, // Add the form submit handle.
           // submit, // Add the submit handle that needs to be passed to the submit handle.
            register, // Add the variable register to bind the form fields in the UI with the form variables.
            watch, // Add a watch on the variables, this function can be used to watch changes on variables if it is needed in some locations.
            selectProfessor,
            update
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