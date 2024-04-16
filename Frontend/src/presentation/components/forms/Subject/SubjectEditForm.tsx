import {
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    Stack,
    OutlinedInput,
    Select,
    MenuItem,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControlLabelProps,
    Rating,
    Slider,
    Checkbox
} from "@mui/material";
import * as React from 'react';
import { FormattedMessage, useIntl } from "react-intl";
import { useSubjectEditFormController } from "./SubjectEditForm.controller";
import { isEmpty, isUndefined } from "lodash";
import { AmountEnum } from "@infrastructure/apis/client";
import "presentation/assets/lang";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { useRadioGroup } from '@mui/material/RadioGroup';
import { useSubjectApi } from "@infrastructure/apis/api-management/subject";
import { useEffect, useState } from "react";
import { useProfessorController } from "./Professor.controller";
import { is } from "@infrastructure/utils/typeUtils";

/**
 * Here we declare the user add form component.
 * This form may be used in modals so the onSubmit callback could close the modal on completion.
 */
export const SubjectEditForm = (props: { onSubmit?: () => void , id: string}) => {
    const { formatMessage } = useIntl();
    const { state, actions, computed } = useSubjectEditFormController(props.onSubmit, props.id); // Use the controller.

    const { allProfessorsData, isError, isLoading } = useProfessorController();

    return <form onSubmit={actions.handleSubmit(actions.update)}> {/* Wrap your form into a form tag and use the handle submit callback to validate the form and call the data submission. */}
        <Stack spacing={4} style={{ width: "100%" }}>
            <ContentCard >
                <div style={{ textAlign: "center", marginBottom: "20px", fontSize: "24px", fontWeight: "bold", color: "#333" }}>
                    {formatMessage({ id: "globals.editSubjectTitle" })}
                </div>
                <Grid container item direction="column" xs={12} columnSpacing={4}>
                    {/* NAME */}
                    <Grid container item direction="column" xs={6} md={6}
                        sx={{
                            backgroundColor: '#f0f0f0',
                            marginLeft: '15px',
                            borderRadius: '20px',
                        }}>
                        <div> <br /> </div>
                        <FormControl
                            sx={{ paddingRight: '32px' }}
                            fullWidth
                            error={!isUndefined(state.errors.name)}
                        >
                            <FormLabel required>
                                <FormattedMessage id="globals.name" />
                            </FormLabel>
                            <OutlinedInput
                                {...actions.register("name")}
                                placeholder={formatMessage(
                                    { id: "globals.placeholders.textInput" },
                                    {
                                        fieldName: formatMessage({
                                            id: "globals.name",
                                        }),
                                    })}
                                autoComplete="none"
                            />
                            <FormHelperText
                                hidden={isUndefined(state.errors.name)}
                            >
                                {state.errors.name?.message}
                            </FormHelperText>
                        </FormControl>
                        <div> <br /> </div>
                    </Grid>
                    <div> <br /> </div>
                    {/* PROFESSOR */}
                    <Grid container item direction="column" xs={6} md={6}
                        sx={{
                            backgroundColor: '#f0f0f0',
                            marginLeft: '15px',
                            borderRadius: '15px',
                        }}>
                        <div> <br /> </div>
                        <FormControl
                            sx={{ paddingRight: '32px' }}
                            fullWidth
                            error={!isUndefined(state.errors.professorId)}
                        >
                            <FormLabel required>
                                <FormattedMessage id="globals.professor" />
                            </FormLabel>
                            <Select
                                {...actions.register("professorId")}
                                value={actions.watch("professorId")}
                                onChange={actions.selectProfessor} // Selects may need a listener to for the variable change.
                                displayEmpty
                            >
                                <MenuItem value="" disabled> {/* Add the select options, the first here is used as a placeholder. */}
                                    <span className="text-gray">
                                        {formatMessage({ id: "globals.placeholders.selectInput" }, {
                                            fieldName: formatMessage({
                                                id: "globals.professor",
                                            }),
                                        })}
                                    </span>
                                </MenuItem>
                                {allProfessorsData?.map(professor=> (
                                <MenuItem key={professor.id} value={professor.id}>
                                    {professor.name}
                                </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText
                                hidden={isUndefined(state.errors.professorId)}
                            >
                                {state.errors.professorId?.message}
                            </FormHelperText>
                        </FormControl>
                        <div> <br /> </div>
                    </Grid>
                    <div> <br /> </div>
                    {/* DESCRIPTION */}
                    <Grid container item direction="column" xs={6} md={6}
                        sx={{
                            backgroundColor: '#f0f0f0',
                            marginLeft: '15px',
                            borderRadius: '20px',
                        }}>
                        <div> <br /> </div>
                        <FormControl
                            sx={{ paddingRight: '32px' }}
                            fullWidth
                            error={!isUndefined(state.errors.description)}
                        >
                            <FormLabel required>
                                <FormattedMessage id="globals.description" />
                            </FormLabel>
                            <OutlinedInput
                                {...actions.register("description")}
                                placeholder={formatMessage(
                                    { id: "globals.placeholders.textInput" },
                                    {
                                        fieldName: formatMessage({
                                            id: "globals.description",
                                        }),
                                    })}
                                autoComplete="none"
                            />
                            <FormHelperText
                                hidden={isUndefined(state.errors.description)}
                            >
                                {state.errors.description?.message}
                            </FormHelperText>
                        </FormControl>
                        <div> <br /> </div>
                    </Grid>
                    <div> <br /> </div>
                    {/* OVERALL */}
                </Grid>
                <div> <br /> </div>
                <Grid container item direction="row" xs={12} className="padding-top-sm">
                    <Grid container item direction="column" xs={12} md={7}></Grid>
                    <Grid container item direction="column" xs={5}>
                        <Button type="submit" disabled={!isEmpty(state.errors) || computed.isSubmitting}
                            style={{ backgroundColor: '#f0f0f0', color: '#000000' }} >
                            {/* Add a button with type submit to call the submission callback if the button is a descended of the form element. */}
                            {!computed.isSubmitting && <FormattedMessage id="globals.submit" />}
                            {computed.isSubmitting && <CircularProgress />}
                        </Button>
                    </Grid>
                </Grid>
            </ContentCard>
        </Stack>
    </form>
};