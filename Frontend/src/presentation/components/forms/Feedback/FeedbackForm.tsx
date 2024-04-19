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
import { useFeedbackFormController } from "./FeedbackForm.controller";
import { isEmpty, isUndefined } from "lodash";
import { AmountEnum } from "@infrastructure/apis/client";
import "presentation/assets/lang";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { useRadioGroup } from '@mui/material/RadioGroup';
import { useSubjectApi } from "@infrastructure/apis/api-management/subject";
import { useEffect, useState } from "react";
import { useSubjectController } from "./Subject.controller";
import { is } from "@infrastructure/utils/typeUtils";

/**
 * Here we declare the user add form component.
 * This form may be used in modals so the onSubmit callback could close the modal on completion.
 */
export const FeedbackForm = (props: { onSubmit?: () => void }) => {
    const { formatMessage } = useIntl();
    const { state, actions, computed } = useFeedbackFormController(props.onSubmit); // Use the controller.

    const { allSubjectsData, isError, isLoading } = useSubjectController();

    function getSubjectsList() {
        if(isLoading == true) {
            return <div>Loading...</div>;
        } else {
            if(isError == true) {
                return <div>Error loading subjects</div>;
            } else {
                if(isUndefined(allSubjectsData)) {
                    return <div>Undefined</div>;
                } else {  
                    if(allSubjectsData == null) {
                        return <div>No subjects found</div>;
                    } else {
                        return (
                            <ul>
                                {allSubjectsData?.map(subject => (
                                    <li key={subject.id}>
                                        {subject.name}
                                    </li>
                                ))}
                            </ul>
                        )
                    }
        }
    }} }

    function valuetext(value: number) {
        return `${value}%`;
    }

    const marks = [
        {
            value: 0,
            label: '0%',
        },
        {
            value: 20,
            label: '20%',
        },
        {
            value: 40,
            label: '40%',
        },
        {
            value: 60,
            label: '60%',
        },
        {
            value: 80,
            label: '80%',
        },
        {
            value: 100,
            label: '100%',
        },
    ];

    return <form onSubmit={actions.handleSubmit(actions.submit)}> {/* Wrap your form into a form tag and use the handle submit callback to validate the form and call the data submission. */}
        <Stack spacing={4} style={{ width: "100%" }}>
            <ContentCard >
                <div style={{ textAlign: "center", marginBottom: "20px", fontSize: "24px", fontWeight: "bold", color: "#333" }}>
                    {formatMessage({ id: "globals.feedbackTitle" })}
                </div>
                <Grid container item direction="column" xs={12} columnSpacing={4}>
                    {/* TITLE */}
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
                            error={!isUndefined(state.errors.title)}
                        >
                            <FormLabel required>
                                <FormattedMessage id="globals.title" />
                            </FormLabel>
                            <OutlinedInput
                                {...actions.register("title")}
                                placeholder={formatMessage(
                                    { id: "globals.placeholders.textInput" },
                                    {
                                        fieldName: formatMessage({
                                            id: "globals.title",
                                        }),
                                    })}
                                autoComplete="none"
                            />
                            <FormHelperText
                                hidden={isUndefined(state.errors.title)}
                            >
                                {state.errors.title?.message}
                            </FormHelperText>
                        </FormControl>
                        <div> <br /> </div>
                    </Grid>
                    <div> <br /> </div>
                    {/* SUBJECT */}
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
                            error={!isUndefined(state.errors.subjectId)}
                        >
                            <FormLabel required>
                                <FormattedMessage id="globals.subject" />
                            </FormLabel>
                            <Select
                                {...actions.register("subjectId")}
                                value={actions.watch("subjectId")}
                                onChange={actions.selectSubject} // Selects may need a listener to for the variable change.
                                displayEmpty
                            >
                                <MenuItem value="" disabled> {/* Add the select options, the first here is used as a placeholder. */}
                                    <span className="text-gray">
                                        {formatMessage({ id: "globals.placeholders.selectInput" }, {
                                            fieldName: formatMessage({
                                                id: "globals.subject",
                                            }),
                                        })}
                                    </span>
                                </MenuItem>
                                {/* <MenuItem>{getSubjectsList()}</MenuItem> */}
                                
                                {allSubjectsData?.map(subject => (
                                <MenuItem key={subject.id} value={subject.id}>
                                    {subject.name}
                                </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText
                                hidden={isUndefined(state.errors.subjectId)}
                            >
                                {state.errors.subjectId?.message}
                            </FormHelperText>
                        </FormControl>
                        <div> <br /> </div>
                    </Grid>
                    <div> <br /> </div>
                    {/* RATING */}
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
                            error={!isUndefined(state.errors.rating)}
                        > {/* Wrap the input into a form control and use the errors to show the input invalid if needed. */}
                            <FormLabel required>
                                <FormattedMessage id="globals.rating" />
                            </FormLabel> {/* Add a form label to indicate what the input means. */}
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Rating
                                    {...actions.register("rating")}
                                    value={actions.watch("rating")}
                                    onChange={(event) => {
                                        actions.selectRating;
                                        actions.register("rating").onChange(event);
                                    }}  // Selects may need a listener to for the variable change.}
                                    name="simple-controlled"
                                    defaultValue={3}
                                    style={{ fontSize: 40 }}
                                    max={5}
                                />
                            </div>
                            <FormHelperText
                                hidden={isUndefined(state.errors.rating)}
                            >
                                {state.errors.rating?.message}
                            </FormHelperText> {/* Add a helper text that is shown then the input has a invalid value. */}
                        </FormControl>
                        <div> <br /> </div>
                    </Grid>
                    <div> <br /> </div>
                    {/* COMMENT */}
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
                            error={!isUndefined(state.errors.comment)}
                        >
                            <FormLabel required>
                                <FormattedMessage id="globals.comment" />
                            </FormLabel>
                            <OutlinedInput
                                {...actions.register("comment")}
                                placeholder={formatMessage(
                                    { id: "globals.placeholders.textInput" },
                                    {
                                        fieldName: formatMessage({
                                            id: "globals.comment",
                                        }),
                                    })}
                                autoComplete="none"
                            />
                            <FormHelperText
                                hidden={isUndefined(state.errors.comment)}
                            >
                                {state.errors.comment?.message}
                            </FormHelperText>
                        </FormControl>
                        <div> <br /> </div>
                    </Grid>
                    <div> <br /> </div>
                    {/* ATTENDANCE */}
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
                            error={!isUndefined(state.errors.attendance)}
                        >
                            <FormLabel required>
                                <FormattedMessage id="globals.attendance" />
                            </FormLabel>

                            <Slider
                                aria-label="Attendance"
                                defaultValue={0}
                                getAriaValueText={valuetext}
                                step={10}
                                valueLabelDisplay="auto"
                                marks={marks}
                                // max={100 as number}

                                {...actions.register("attendance")}
                                value={actions.watch("attendance")}
                                onChange={(e) => {
                                    actions.register("attendance").onChange(e);
                                    // actions.selectAttendance;
                                }}

                                max={100 as number}
                                min={0 as number}
                            />

                            <FormHelperText
                                hidden={isUndefined(state.errors.attendance)}
                            >
                                {state.errors.attendance?.message}
                            </FormHelperText>
                        </FormControl>
                        <div> <br /> </div>
                    </Grid>
                    <div> <br /> </div>
                    {/* UNDERSTANDING */}
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
                            error={!isUndefined(state.errors.understanding)}
                        >
                            <FormLabel required>
                                <FormattedMessage id="globals.understanding" />
                            </FormLabel>
                            <Checkbox {...actions.register("understanding")}
                                checked={actions.watch("understanding")}
                                onChange={(e) => {
                                    actions.register("understanding").onChange(e);
                                }}
                            />
                            <FormHelperText
                                hidden={isUndefined(state.errors.understanding)}
                            >
                                {state.errors.understanding?.message}
                            </FormHelperText>
                        </FormControl>
                        <div> <br /> </div>
                    </Grid>
                    <div> <br /> </div>
                    {/* ENGAGEMENT */}
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
                            error={!isUndefined(state.errors.engagement)}
                        >
                            <FormLabel required>
                                <FormattedMessage id="globals.engagement" />
                            </FormLabel>
                            <Checkbox {...actions.register("engagement")}
                                checked={actions.watch("engagement")}
                                onChange={(e) => {
                                    actions.register("engagement").onChange(e);
                                }}
                            />
                            <FormHelperText
                                hidden={isUndefined(state.errors.engagement)}
                            >
                                {state.errors.engagement?.message}
                            </FormHelperText>
                        </FormControl>
                        <div> <br /> </div>
                    </Grid>
                    <div> <br /> </div>
                    {/* ASSIGNMENT COMPLETION */}
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
                            error={!isUndefined(state.errors.assignmentCompletion)}
                        >
                            <FormLabel required>
                                <FormattedMessage id="globals.assignmentCompletion" />
                            </FormLabel>
                            <RadioGroup
                                {...actions.register("assignmentCompletion")}
                                value={actions.watch("assignmentCompletion")}
                                onChange={actions.selectCompletion}
                                defaultValue={20}
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                                row
                                style={{ display: 'flex', justifyContent: 'center' }}
                            >

                                <FormControlLabel value={0} control={<Radio />} label="0%" />
                                <FormControlLabel value={20} control={<Radio />} label="20%" />
                                <FormControlLabel value={40} control={<Radio />} label="40%" />
                                <FormControlLabel value={60} control={<Radio />} label="60%" />
                                <FormControlLabel value={80} control={<Radio />} label="80%" />
                                <FormControlLabel value={100} control={<Radio />} label="100%" />

                            </RadioGroup>

                            <FormHelperText
                                hidden={isUndefined(state.errors.assignmentCompletion)}
                            >
                                {state.errors.assignmentCompletion?.message}
                            </FormHelperText>
                        </FormControl>
                        <div> <br /> </div>
                    </Grid>
                    <div> <br /> </div>
                    {/* RESOURCES */}
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
                            error={!isUndefined(state.errors.resources)}
                        >
                            <FormLabel required>
                                <FormattedMessage id="globals.resources" />
                            </FormLabel>
                            {/* <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={resourceAmount}
                                label="Resource amount"
                                onChange={handleChangeResource}
                                >
                                <MenuItem value={1}> {formatMessage({ id: "globals.notEnough" })}</MenuItem>
                                <MenuItem value={2}> {formatMessage({ id: "globals.enough" })}</MenuItem>
                                <MenuItem value={3}> {formatMessage({ id: "globals.moreThanEnough" })}</MenuItem>
                            </Select> */}
                            <Select
                                {...actions.register("resources")}
                                value={actions.watch("resources")}
                                onChange={actions.selectAmountResource} // Selects may need a listener to for the variable change.
                                displayEmpty
                            >
                                <MenuItem value="" disabled> {/* Add the select options, the first here is used as a placeholder. */}
                                    <span className="text-gray">
                                        {formatMessage({ id: "globals.placeholders.selectInput" }, {
                                            fieldName: formatMessage({
                                                id: "globals.resources",
                                            }),
                                        })}
                                    </span>
                                </MenuItem>
                                <MenuItem value={AmountEnum.NotEnough}>
                                    <FormattedMessage id="globals.notEnough" />
                                </MenuItem>
                                <MenuItem value={AmountEnum.Enough}>
                                    <FormattedMessage id="globals.enough" />
                                </MenuItem>
                                <MenuItem value={AmountEnum.MoreThanEnough}>
                                    <FormattedMessage id="globals.moreThanEnough" />
                                </MenuItem>
                            </Select>
                            <FormHelperText
                                hidden={isUndefined(state.errors.resources)}
                            >
                                {state.errors.resources?.message}
                            </FormHelperText>
                        </FormControl>
                        <div> <br /> </div>
                    </Grid>
                    <div> <br /> </div>
                    {/* COMMUNICATION */}
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
                            error={!isUndefined(state.errors.communication)}
                        >
                            <FormLabel required>
                                <FormattedMessage id="globals.communication" />
                            </FormLabel>
                            {/* <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={communicationAmount}
                                label="Communication amount"
                                onChange={handleChangeCommunication}
                                >
                                <MenuItem value={1}> {formatMessage({ id: "globals.notEnough" })}</MenuItem>
                                <MenuItem value={2}> {formatMessage({ id: "globals.enough" })}</MenuItem>
                                <MenuItem value={3}> {formatMessage({ id: "globals.moreThanEnough" })}</MenuItem>
                            </Select> */}
                            <Select
                                {...actions.register("communication")}
                                value={actions.watch("communication")}
                                onChange={actions.selectAmountCommunication} // Selects may need a listener to for the variable change.
                                displayEmpty
                            >
                                <MenuItem value="" disabled> {/* Add the select options, the first here is used as a placeholder. */}
                                    <span className="text-gray">
                                        {formatMessage({ id: "globals.placeholders.selectInput" }, {
                                            fieldName: formatMessage({
                                                id: "globals.communication",
                                            }),
                                        })}
                                    </span>
                                </MenuItem>
                                <MenuItem value={AmountEnum.NotEnough}>
                                    <FormattedMessage id="globals.notEnough" />
                                </MenuItem>
                                <MenuItem value={AmountEnum.Enough}>
                                    <FormattedMessage id="globals.enough" />
                                </MenuItem>
                                <MenuItem value={AmountEnum.MoreThanEnough}>
                                    <FormattedMessage id="globals.moreThanEnough" />
                                </MenuItem>
                            </Select>
                            <FormHelperText
                                hidden={isUndefined(state.errors.communication)}
                            >
                                {state.errors.communication?.message}
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