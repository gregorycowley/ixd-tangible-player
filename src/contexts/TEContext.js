import React, { createContext, useEffect, useState } from 'react';

export const TEContext = createContext([{ initOnly: 'The context is alive!' }]);

export const TEProvider = ({ children }) => {
  const [pucks, setPucks] = useState({ tangibles: [], pointers: [], status: true });

  useEffect(() => {
    // console.log('registering listener');
    const callback = (tangibleData) => {
      // document.getElementById('tangible').textContent = JSON.stringify(tangibleData);
        // Designed to consolidate all requests to the Tangible Engine service
      if ( tangibleData.TANGIBLES !== undefined &&  tangibleData.TANGIBLES !== null && tangibleData.TANGIBLES.length > 0){
        const patternIDS = tangibleData.TANGIBLES.map((tangible, index) =>{
          return `${tangible.PatternId} :: ${JSON.stringify(tangible.PointerIds)}`;
        })
        document.getElementById('tangible').textContent = `--> ${JSON.stringify(patternIDS)} --> ${JSON.stringify(tangibleData.POINTERS)}`;
      } else {
        document.getElementById('tangible').textContent = 'No Tangibles';
      }

      setPucks({
        tangibles: tangibleData.TANGIBLES,
        pointers: tangibleData.POINTERS,
        status: tangibleData.STATUS,
      });
    };
    // ! Special Case:
    // !     All messages to and from main pass through renderer.js, except here.
    window.electronAPI.receiveReponseFromTE(callback);
  }, [pucks]);

  // Context value can also include functions to modify the state
  // const login = (name) => setUser({ name, loggedIn: true });
  // const logout = () => setUser({ name: '', loggedIn: false });

  return <TEContext.Provider value={pucks}>{children}</TEContext.Provider>;
};

// {
//   "TYPE": 3,
//   "PATTERNS": null,
//   "TANGIBLES": [
//     {
//       "Id": 0,
//       "PatternId": 3,
//       "R": 0.42740452,
//       "RMSNormalized": 3.139927,
//       "PointerIds": [],
//       "Pos": [
//         {
//           "x": 2088.90747
//         },
//         {
//           "y": 855.5429
//         }
//       ],
//       "X": 644.625732,
//       "Y": 514.582947
//     }
//   ],
//   "POINTERS": null,
//   "STATUS": true,
//   "DEBUG_TEXT": null,
//   "ID": 0
// }
