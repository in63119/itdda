import axios from "axios";
export const CLOSEMODAL = "CLOSEMODAL";

export const closeModal = () => {
  return {
    type: CLOSEMODAL,
    payload: {
      visible: true,
    },
  };
};

// export const addToCart = (itemId) => {
//     return {
//       type: ADD_TO_CART,
//       payload: {
//         quantity: 1,
//         itemId
//       }
//     }
//   }
