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
    TextField
} from "@mui/material";
import * as React from 'react';
import { FormattedMessage, useIntl } from "react-intl";
import { useAssignmentEditFormController } from "./AssignmentEditForm.controller";
import { isEmpty, isUndefined } from "lodash";
import { AmountEnum } from "@infrastructure/apis/client";
import "presentation/assets/lang";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import { useSubjectController } from "./Subject.controller";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { DateTimePicker } from "@mui/x-date-pickers";


/**
 * Here we declare the user add form component.
 * This form may be used in modals so the onSubmit callback could close the modal on completion.
 */
export const AssignmentEditForm = (props: { onSubmit?: () => void; id: string}) => {
    const { formatMessage } = useIntl();
    const { state, actions, computed } = useAssignmentEditFormController(props.onSubmit, props.id); // Use the controller.

    const { allSubjectsData, isError, isLoading } = useSubjectController();

    // const [id, setId] = useState<string | null>(props.id);

    console.log("id: ", props.id);
    console.log("onSubmit: ", props.onSubmit);

    const [value, setValue] = React.useState<Dayjs | null>(
        dayjs(Date.now()),
      );
    
      const handleChange = (newValue: Dayjs | null) => {
        console.log("newValue: ", newValue);
        setValue(newValue);
        if(newValue !== null && newValue !== undefined)
            actions.selectDate(newValue.toDate());
      };


    return <form onSubmit={actions.handleSubmit(actions.update)}> {/* Wrap your form into a form tag and use the handle submit callback to validate the form and call the data submission. */}
        <Stack spacing={4} style={{ width: "100%" }}>
            <ContentCard>
                <div style={{ textAlign: "center", marginBottom: "20px", fontSize: "24px", fontWeight: "bold", color: "#333" }}>
                    {formatMessage({ id: "globals.addAssignmentTitle" })}
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
                                {allSubjectsData?.map(subject=> (
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
                    {/* DUE DATE */}
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
                            error={!isUndefined(state.errors.dueDate)}
                        >
                            <FormLabel required>
                                <FormattedMessage id="globals.dueDate" />
                            </FormLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        value={value}
                                        onChange={handleChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            <FormHelperText
                                hidden={isUndefined(state.errors.dueDate)}
                            >
                                {state.errors.dueDate?.message}
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
                            >
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