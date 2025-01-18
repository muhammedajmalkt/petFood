import * as Yup from 'yup'

export const Validation=Yup.object({
    name:Yup.string().min(3).required("Please enter  name"),
    email:Yup.string().email("Please enter  valid e-mail").required("Please enter e-mail"),
    password:Yup.string().min(6).required("please enter password"),
    cpassword:Yup.string().oneOf([Yup.ref("password")],"password not matched").required("re-enter the password")
})