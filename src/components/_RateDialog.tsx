// import { Stroller } from '@mui/icons-material';
// import { Button, Grid } from '@mui/material';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import Typography from '@mui/material/Typography';
// import { observer } from 'mobx-react';
// import React, { useEffect, useState } from 'react';
// import ReactStars from 'react-stars';
// import { Mode, store } from './store';

// type Props = {
//   // onClose: (rating: number) => void;
//   // open: boolean;
// };

// export const _RateDialog = observer((props: Props) => {
//   const handleSubmit = () => {
//     store.addPoop();
//   };

//   const handleCancel = () => {
//     store.setMode(Mode.showingMap);
//   };

//   return (
//     <Dialog open={store.mode === Mode.ratingPoop}
//       >
//       <DialogTitle>How was your 💩?</DialogTitle>

//       <Grid
//         container
//         spacing={0}
//         padding={4}
//         direction='column'
//         alignItems='center'
//         justifyContent='center'
//       >
//         {/* <Grid item>
//           <Typography>Overall:</Typography>
//           <ReactStars count={5} onChange={handleRatingChange} size={48} />
//         </Grid> */}

//         <Grid item>
//           <Typography>Size:</Typography>
//           <ReactStars
//             count={5}
//             value={store.rating.size}
//             onChange={val => { store.rating.size = val}}
//             half={false}
//             size={48}
//           />
//         </Grid>

//         <Grid item>
//           <Typography>Consistency:</Typography>
//           <ReactStars
//             count={5}
//             value={store.rating.consistency}
//             onChange={val => { store.rating.consistency = val }}
//             half={false}
//             size={48}
//           />
//         </Grid>
//       </Grid>

//       <Grid
//         container
//         spacing={0}
//         padding={4}
//         direction='column'
//         alignItems='center'
//         justifyContent='center'
//         className='rate-buttons'
//       >
//         <Grid item>
//           <Button variant='contained' color='primary' onClick={handleSubmit} disabled={!store.rating.size || !store.rating.consistency}>
//             Tell the world!
//           </Button>
//         </Grid>
//         <Grid item>
//           <Button variant='text' onClick={handleCancel}>Never mind</Button>
//         </Grid>

//         <Typography variant='caption'>I hope you washed your hands!</Typography>
//       </Grid>
//     </Dialog>
//   );
// });
