// import { Stroller } from '@mui/icons-material';
// import { Button, CircularProgress, Grid } from '@mui/material';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import Typography from '@mui/material/Typography';
// import { observer } from 'mobx-react';
// import React, { useEffect, useState } from 'react';
// import ReactStars from 'react-stars';
// import { claimName, isNameAvailable } from './firebase';
// import { generateName } from './nameGenerator';
// import { Mode, store } from './store';

// // type Props = {
// //   // onClose: (rating: number) => void;
// //   // open: boolean;
// // };

// // type NameAndAvailability = {
// //   name: string;
// //   available?: true | false | 'testing';
// // };

// // const generateNames = (length = 5) => {
// //   const result: Array<NameAndAvailability> = [];
// //   while (result.length < length) {
// //     const name = generateName();
// //     result.push({ name });
// //   }
// //   return result;
// // };

// export const ProfileDialog = observer(( ) => {
//   const names = store.newProfileNames;

//   // const [names, setNames] = useState<Array<NameAndAvailability>>(
//   //   generateNames()
//   // );

//   // const testAvailability = () => {
//   //   const newVal = JSON.parse(JSON.stringify(names));

//   //   for (let i = 0; i < newVal.length; i++) {
//   //     if (newVal[i].available === undefined) {
//   //       newVal[i].available = 'testing';
//   //       isNameAvailable(newVal[i].name).then((available) => {
//   //         if (available) {
//   //           newVal[i].available = true;
//   //           setNames(newVal);
//   //         } else {
//   //           newVal[i].name = generateName();
//   //           // newVal[i].available = undefined;
//   //         }
//   //         setNames(newVal);
//   //       });
//   //     }
//   //   }
//   //   if (JSON.stringify(newVal) !== JSON.stringify(names)) {
//   //     setNames(newVal);
//   //   }
//   // };

//   // window.setTimeout(() => {
//   //   testAvailability();
//   // });

//   const handleClickName = (idx: number) => {
//     claimName(store.newProfileNames[idx].name, '1');
//     store.setMode(Mode.showingMap);
//     // store.addPoop();
//   };

//   const handleCancel = () => {
//     store.setMode(Mode.showingMap);
//   };

//   const handleClickNewNames = () => {
//     store.generateNewProfileNames();
//   };

//   return (
//     <Dialog open={store.mode === Mode.editProfile}>
//       {/* <DialogTitle>Profile</DialogTitle> */}

//       <Grid
//         container
//         spacing={0}
//         padding={4}
//         direction='column'
//         alignItems='center'
//         justifyContent='center'
//       >
//         <Typography variant='h4'>Pick a user name:</Typography>
//         <br />

//         {names.map((val, idx) => (
//           <Grid item key={val.name + idx}>
            
//             <Button disabled={val.available !== true} onClick={() => handleClickName(idx)}>
//               {val.available === 'testing' && <><CircularProgress/>&nbsp;</>}
//               {val.name}
//             </Button>
//           </Grid>
//         ))}
//       </Grid>

//       <Grid
//         container
//         spacing={0}
//         padding={4}
//         direction='column'
//         alignItems='center'
//         justifyContent='center'
//       >
//         <Grid item>
//           <Button
//             variant='contained'
//             color='primary'
//             onClick={handleClickNewNames}
//           >
//             More choices
//           </Button>
//         </Grid>
//       </Grid>
//     </Dialog>
//   );
// });
