// import React, { useState } from 'react';
// import { Button, CircularProgress, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Select, MenuItem, OutlinedInput } from '@mui/material';
// import { FormattedMessage, useIntl } from 'react-intl';
// import { isEmpty, isUndefined } from 'lodash';
// import { ContentCard } from '@presentation/components/ui/ContentCard';

// export const FeedbackForm = ({ onSubmit }) => {
//     const { formatMessage } = useIntl();
//     const [feedback, setFeedback] = useState({
//         rating: '',
//         reason: '',
//         improvement: '',
//         consent: false
//     });
//     const [errors, setErrors] = useState({});

//     const handleChange = (event) => {
//         const { name, value, checked } = event.target;
//         setFeedback({ ...feedback, [name]: value || checked });
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         // Validare
//         if (isEmpty(feedback.rating) || isEmpty(feedback.reason) || isEmpty(feedback.improvement) || !feedback.consent) {
//             setErrors({ general: 'Toate câmpurile sunt obligatorii.' });
//             return;
//         }
//         // Trimite feedback
//         onSubmit(feedback);
//         // Resetare formular
//         setFeedback({
//             rating: '',
//             reason: '',
//             improvement: '',
//             consent: false
//         });
//         setErrors({});
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <ContentCard>
//                 <div style={{ textAlign: 'center', marginBottom: '20px', fontSize: '24px', fontWeight: 'bold', color: '#333' }}>
//                     {formatMessage({ id: 'globals.feedbackTitle' })}
//                 </div>
//                 {errors.general && <div style={{ color: 'red', marginBottom: '10px' }}>{errors.general}</div>}
//                 <Grid container item direction="column" xs={12} columnSpacing={4}>
//                     <Grid container item direction="column" xs={6} md={6}>
//                         <FormControl fullWidth>
//                             <FormLabel required>
//                                 <FormattedMessage id="globals.rating" />
//                             </FormLabel>
//                             <Select
//                                 name="rating"
//                                 value={feedback.rating}
//                                 onChange={handleChange}
//                                 fullWidth
//                             >
//                                 <MenuItem value="">Selectați evaluarea</MenuItem>
//                                 <MenuItem value="excelent">Excelent</MenuItem>
//                                 <MenuItem value="bun">Bun</MenuItem>
//                                 <MenuItem value="mediu">Mediu</MenuItem>
//                                 <MenuItem value="slab">Slab</MenuItem>
//                             </Select>
//                         </FormControl>
//                     </Grid>
//                     <Grid container item direction="column" xs={6} md={6}>
//                         <FormControl fullWidth>
//                             <FormLabel required>
//                                 <FormattedMessage id="globals.reason" />
//                             </FormLabel>
//                             <OutlinedInput
//                                 name="reason"
//                                 value={feedback.reason}
//                                 onChange={handleChange}
//                                 fullWidth
//                             />
//                         </FormControl>
//                     </Grid>
//                     <Grid container item direction="column" xs={12}>
//                         <FormControl component="fieldset">
//                             <FormLabel component="legend">
//                                 <FormattedMessage id="globals.improvement" />
//                             </FormLabel>
//                             <RadioGroup
//                                 name="improvement"
//                                 value={feedback.improvement}
//                                 onChange={handleChange}
//                             >
//                                 <FormControlLabel value="servicii" control={<Radio />} label="Îmbunătățirea serviciilor" />
//                                 <FormControlLabel value="produse" control={<Radio />} label="Îmbunătățirea produselor" />
//                                 <FormControlLabel value="experienta" control={<Radio />} label="Îmbunătățirea experienței utilizatorului" />
//                                 <FormControlLabel value="alte" control={<Radio />} label="Altele" />
//                             </RadioGroup>
//                         </FormControl>
//                     </Grid>
//                     <Grid container item direction="column" xs={12}>
//                         <FormControlLabel
//                             control={<Checkbox name="consent" checked={feedback.consent} onChange={handleChange} />}
//                             label={<FormattedMessage id="globals.consent" />}
//                         />
//                     </Grid>
//                 </Grid>
//                 <div style={{ marginTop: '20px', textAlign: 'center' }}>
//                     <Button type="submit" variant="contained" color="primary">
//                         <FormattedMessage id="globals.submit" />
//                         {computed.isSubmitting && <CircularProgress size={24} />}
//                     </Button>
//                 </div>
//             </ContentCard>
//         </form>
//     );
// };
