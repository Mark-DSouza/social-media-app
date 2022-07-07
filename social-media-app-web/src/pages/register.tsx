// import { Box, Button } from "@chakra-ui/react";
// import { Formik, Form, FormikProps } from "formik";
// import InputField from "../components/InputField";
// import Wrapper from "../components/Wrapper";
// interface RegisterProps {}

// const Register: React.FC<RegisterProps> = ({}) => {
//   return (
//     <Wrapper variant="small">
//       <Formik
//         initialValues={{ username: "", password: "" }}
//         onSubmit={(values) => {
//           console.log(values);
//         }}
//       >
//         {({isSubmitting}) => (
//           <Form>
//             <InputField
//               name="username"
//               placeholder="username"
//               label="Username"
//             />
//             <Box mt={4}>
//               <InputField
//                 name="password"
//                 placeholder="password"
//                 label="Password"
//                 type="password"
//               />
//             </Box>
//             <Button
//               mt={4}
//               type="submit"
//               isLoading={isSubmitting}
//               colorScheme="teal"
//             >
//               register
//             </Button>
//           </Form>
//         )}
//       </Formik>
//     </Wrapper>
//   );
// };

// export default Register;

import React from "react";
import { Formik, Form, Field } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <FormControl isInvalid={!!errors.username}>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Field
                type="text"
                name="username"
                placeholder="Username"
                as={Input}
              />
              {errors.username && touched.username ? (
                <FormErrorMessage>{errors.username}</FormErrorMessage>
              ) : null}
            </FormControl>

            <Box mt={4}>
              <FormControl isInvalid={!!errors.username}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  as={Input}
                />
                {errors.password && touched.password ? (
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                ) : null}
              </FormControl>
            </Box>

            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="teal"
            >
              register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
