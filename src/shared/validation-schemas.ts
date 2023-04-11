import { isPossiblePhoneNumber } from "react-phone-number-input";
import * as Yup from "yup";

export const LoginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain Eight Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
});

export const Signup1ValidationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  jobTitle: Yup.string().required("Required"),
  orgName: Yup.string().required("Required"),
  howYouHeard: Yup.string().required("Required"),
});

export const Signup2ValidationSchema = Yup.object().shape({
  address: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  zipcode: Yup.string().required("Required"),
  email: Yup.string().required("Required"),
  password: Yup.string()
    .required("Password is Required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  confirmPassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const SignupUserValidationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().required("Required"),
  password: Yup.string()
    .required("Password is Required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  confirmPassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  acceptTerms: Yup.boolean().oneOf([true], "must be checked").required(),
});

export const ForgotPasswordValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

export const ResetPasswordValidationSchema = Yup.object().shape({
  code: Yup.string().required("Required"),
  password: Yup.string()
    .required("Password is Required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  confirmPassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const PasswordChangeValidationSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Current Password is Required"),
  password: Yup.string()
    .required("Password is Required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  confirmPassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const MyProfileValidationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  contact: Yup.string().test({
    name: "validate-phonenumber",
    message: "Phone number is invalid.",
    test: (value, testContext) => {
      if (!value) return false;
      return isPossiblePhoneNumber(`+1 ${value}`);
    },
  }),
});

export const EmailQuizValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

export const FeedbackValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

export const SaveQuizValidationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
});

export const CreateNewListValidationSchema = Yup.object().shape({
  listingName: Yup.string().required("Required"),
});

export const UpdateListValidationSchema = Yup.object().shape({
  updatedName: Yup.string().required("Required"),
});

export const SaveToListValidationSchema = Yup.object().shape({
  saveListingId: Yup.string().required("Required"),
});

export const SaveSearchesValidationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
});

export const SaveAdditionalMemberSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  jobTitle: Yup.string().required("Required"),
  contact: Yup.string().test({
    name: "validate-phonenumber",
    message: "Phone number is invalid.",
    test: (value, testContext) => {
      if (!value) return false;
      return isPossiblePhoneNumber(`+1 ${value}`);
    },
  }),
});

export const SaveOrganizationSchema = Yup.object().shape({
  publicName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email"),
  contact: Yup.string().test({
    name: "validate-phonenumber",
    message: "Phone number is invalid.",
    test: (value, testContext) => {
      if (!value) return false;
      return isPossiblePhoneNumber(`+1 ${value}`);
    },
  }),
});

export const SaveSiteLocationSchema = Yup.object().shape({
  name: Yup.string().required("The name field is required."),
  address: Yup.string().required("The address field is required."),
  city: Yup.string().required("The city field is required."),
  zipcode: Yup.string().required("The zipcode field is required."),
  // state: Yup.string().required("The state field is required."),
  state: Yup.array().min(1, "You need to pick one.").required("The state field is required."),
  website: Yup.string().url().required("The website field is required.").label("Website"),
  homeVisit: Yup.boolean(),
  radius: Yup.number().when("homeVisit", {
    is: (homeVisit: boolean) => homeVisit === true,
    then: Yup.number().required("The radius field is Required."),
    otherwise: Yup.number().notRequired(),
  }),
  subcategory: Yup.array().min(1, "The category field is required.").required("Required"),
});
