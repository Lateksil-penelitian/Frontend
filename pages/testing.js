// import { Button } from "@chakra-ui/react";
// import React, { useState } from "react";
// import DashboardLayout from "../components/dashboard/DashboardLayout";

// const Testing = () => {
//   const cartItems = [
//     { name: "Product 1", price: 10 },
//     { name: "Product 2", price: 20 },
//     { name: "Product 3", price: 15 },
//     { name: "Product 4", price: 5 },
//   ];

//   const [totalPrice, setTotalPrice] = useState(0);

//   const addItem = (item) => {
//     const newCartItems = [...cartItems];
//     console.log("NEW CART ITEM", newCartItems);
//     const existingItem = newCartItems.find((i) => i.name === item.name);
//     if (existingItem) {
//       existingItem.quantity++;
//     } else {
//       newCartItems.push({ ...item, quantity: 1 });
//     }
//     setCartItems(newCartItems);
//     setTotalPrice(totalPrice + item.price);
//   };

//   const removeItem = (item) => {
//     const newCartItems = [...cartItems];
//     const existingItem = newCartItems.find((i) => i.name === item.name);
//     if (existingItem) {
//       existingItem.quantity--;
//       if (existingItem.quantity === 0) {
//         const itemIndex = newCartItems.indexOf(existingItem);
//         newCartItems.splice(itemIndex, 1);
//       }
//     }
//     setCartItems(newCartItems);
//     setTotalPrice(totalPrice - item.price);
//   };

//   return (
//     <div>
//       <h2>Cart</h2>
//       <ul>
//         {cartItems.map((item) => (
//           <li key={item.name}>
//             {item.name} - {item.price} x {item.quantity}
//             <Button onClick={() => removeItem(item)}>-</Button>
//             <Button onClick={() => addItem(item)}>+</Button>
//           </li>
//         ))}
//       </ul>
//       <p>Total Price: ${totalPrice}</p>
//     </div>
//   );
// };

// Testing.getLayout = (page) => (
//   <DashboardLayout sidebarFor="users">{page}</DashboardLayout>
// );

// export default Testing;

// import React, { useEffect, useState } from "react";
// import {
//   Button,
//   Flex,
//   Input,
//   InputGroup,
//   InputLeftElement,
//   InputRightElement,
//   Text,
// } from "@chakra-ui/react";
// import formatCurrency from "../../../utils/formatCurrently";
// import useCartStore from "../../../store/useCartStore";
// import useRemoteCart from "../../hooks/remote/useRemoteCart";

// const InputQuantitas = ({ cart, total }) => {
//   const [value, setValue] = useState(cart.quantity);
//   const [isDescrement, setIsDescrement] = useState(false);

//   const { data: dataCartUserId } = useRemoteCart();

//   const [totalPrice, updateTotalPrice] = useCartStore((state) => [
//     state.totalPrice,
//     state.updateTotalPrice,
//   ]);

//   const totalPricePengujian = value * cart.Pengujian.price;

//   function handleIncrement() {
//     const exitingItem = dataCartUserId?.data.find((i) => i.id === cart.id);

//     if (exitingItem) {
//       const addQuantity = exitingItem.quantity++ + 1;
//       setValue(addQuantity);
//       updateTotalPrice(total + parseInt(cart.Pengujian.price));
//     }
//     console.log("HARGA DI TOTAL", total);
//   }

//   function handleDecrement() {
//     const exitingItem = dataCartUserId?.data.find((i) => i.id === cart.id);

//     if (exitingItem) {
//       const addQuantity = exitingItem.quantity--;
//       if (exitingItem.quantity === 0) {
//         setIsDescrement(true);
//       }
//       updateTotalPrice(total - parseInt(cart.Pengujian.price));
//       setValue(addQuantity - 1);
//     }
//   }

//   console.log(value);

//   useEffect(() => {
//     if (value === 1) {
//       setIsDescrement(true);
//     } else {
//       setIsDescrement(false);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [value]);

//   return (
//     <>
//       <Flex w="25%" align="center" justifyContent="center">
//         <InputGroup width="150px">
//           <InputLeftElement>
//             <Button
//               size="sm"
//               isDisabled={isDescrement}
//               onClick={handleDecrement}
//             >
//               -
//             </Button>
//           </InputLeftElement>
//           <Input
//             type="number"
//             textAlign="center"
//             max={999}
//             min={1}
//             defaultValue={parseInt(cart.quantity)}
//             value={value}
//             onChange={(e) => {
//               let newValue = parseInt(e.target.value);
//               if (newValue < 1) {
//                 newValue = 1;
//               } else if (newValue > 999) {
//                 newValue = 999;
//               }
//               setValue(newValue);
//             }}
//           />
//           <InputRightElement>
//             <Button size="sm" onClick={handleIncrement}>
//               +
//             </Button>
//           </InputRightElement>
//         </InputGroup>
//         <Text ml="2">{cart.Pengujian.sampler}</Text>
//       </Flex>
//       <Flex w="20%" align="center" justifyContent="center">
//         <Text textAlign="center" color="blue.700" fontWeight="semibold">
//           Rp{formatCurrency(totalPricePengujian)}
//         </Text>
//       </Flex>
//     </>
//   );
// };

// export default InputQuantitas;

import React, { useEffect, useState } from 'react';
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import formatCurrency from '../../../utils/formatCurrently';
import useCartStore from '../../../store/useCartStore';
import useRemoteCart from '../../hooks/remote/useRemoteCart';

const InputQuantitas = ({ cart, total }) => {
  const [value, setValue] = useState(parseInt(cart.quantity));
  const [, setIsDescrement] = useState(false);

  const { data: dataCartUserId } = useRemoteCart();

  const [totalPrice, updateTotalPrice] = useCartStore((state) => [
    state.totalPrice,
    state.updateTotalPrice,
  ]);

  useEffect(() => {
    updateTotalPrice(total);
  }, []);

  const totalPricePengujian = value * cart.Pengujian.price;

  function handleIncrement() {
    const exitingItem = dataCartUserId?.data.find((i) => i.id === cart.id);
    if (exitingItem) {
      const addQuantity = exitingItem.quantity++ + 1;
      setValue(addQuantity);
      updateTotalPrice(totalPrice + parseInt(cart.Pengujian.price));
    }
    if (value < 1) {
      setValue(1);
    }
  }

  function handleDecrement() {
    setValue((prevState) => prevState - 1);
    updateTotalPrice(totalPrice - parseInt(cart.Pengujian.price));
  }

  useEffect(() => {
    if (value === 1) {
      setIsDescrement(true);
    } else {
      setIsDescrement(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <>
      <Flex w="25%" align="center" justifyContent="center">
        <InputGroup width="150px">
          <InputLeftElement>
            <Button size="sm" isDisabled={true} onClick={handleDecrement}>
              -
            </Button>
          </InputLeftElement>
          <Input
            type="number"
            textAlign="center"
            max={999}
            min={1}
            disabled={true}
            defaultValue={parseInt(cart.quantity)}
            value={value}
            onChange={(e) => {
              let newValue = parseInt(e.target.value);
              if (newValue < 1) {
                newValue = 1;
              } else if (newValue > 999) {
                newValue = 999;
              }
              setValue(newValue);
            }}
          />
          <InputRightElement>
            <Button size="sm" onClick={handleIncrement}>
              +
            </Button>
          </InputRightElement>
        </InputGroup>
        <Text ml="2">{cart.Pengujian.sampler}</Text>
      </Flex>
      <Flex w="20%" align="center" justifyContent="center">
        <Text textAlign="center" color="blue.700" fontWeight="semibold">
          Rp{formatCurrency(totalPricePengujian)}
        </Text>
      </Flex>
    </>
  );
};

export default InputQuantitas;
