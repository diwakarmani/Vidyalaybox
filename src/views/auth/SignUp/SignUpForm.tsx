import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Alert from '@/components/ui/Alert'
import PasswordInput from '@/components/shared/PasswordInput'
import ActionLink from '@/components/shared/ActionLink'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import useAuth from '@/utils/hooks/useAuth'
import type { CommonProps } from '@/@types/common'

interface SignUpFormProps extends CommonProps {
    disableSubmit?: boolean
    signInUrl?: string
}

type SignUpFormSchema = {
    userName: string
    // password: string
    email: string
    mobile: string
    address: string
    firstName: string
    lastName: string
    adminEmail: string
    adminMobile: string
}

const validationSchema = Yup.object().shape({
    userName: Yup.string().required('Please enter your school name'),
    email: Yup.string()
        .email('Invalid email')
        .required('Please enter your email'),
    mobile: Yup.string()
        .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
        .required('Please enter your mobile number'),
    address: Yup.string().required('Please enter your address'),
    firstName: Yup.string().required("Please enter admin's first name"),
    lastName: Yup.string().required("Please enter admin's last name"),
    adminEmail: Yup.string()
        .email('Invalid email')
        .required("Please enter admin's email"),
    adminMobile: Yup.string()
        .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
        .required("Please enter admin's mobile number"),
    // password: Yup.string().required('Please enter your password'),
    // confirmPassword: Yup.string().oneOf(
    //     [Yup.ref('password')],
    //     'Your passwords do not match'
    // ),
})

const SignUpForm = (props: SignUpFormProps) => {
    const { disableSubmit = false, className, signInUrl = '/sign-in' } = props

    const { signUp } = useAuth()

    const [message, setMessage] = useTimeOutMessage()

    const onSignUp = async (
        values: SignUpFormSchema,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        const {
            userName,
            email,
            mobile,
            address,
            firstName,
            lastName,
            adminEmail,
            adminMobile,
        } = values
        setSubmitting(true)
        const result = await signUp({
            userName,
            email,
            mobile,
            address,
            firstName,
            lastName,
            adminEmail,
            adminMobile,
        })
        if (result?.status === 'failed') {
            setMessage(result.message)
        }

        setSubmitting(false)
    }

    return (
        <div className="flex flex-col ">
            {message && (
                <Alert showIcon className="mb-4" type="danger">
                    {message}
                </Alert>
            )}
            <div className="w-full mb-2">
                <h4>Create School</h4>
                <Formik
                    initialValues={{
                        userName: '',
                        // password: '123Qwe1',
                        // confirmPassword: '123Qwe1',
                        email: '',
                        mobile: '',
                        address: '',
                        firstName: '',
                        lastName: '',
                        adminEmail: '',
                        adminMobile: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        if (!disableSubmit) {
                            onSignUp(values, setSubmitting)
                        } else {
                            setSubmitting(false)
                        }
                    }}
                >
                    {({ touched, errors, isSubmitting }) => (
                        <>
                            <Form>
                                <FormContainer className="flex flex-col mt-4">
                                    <div className="flex w-full justify-between">
                                        <FormItem
                                            label="Name"
                                            invalid={
                                                errors.userName &&
                                                touched.userName
                                            }
                                            errorMessage={errors.userName}
                                            className="w-1/2 mr-2"
                                        >
                                            <Field
                                                type="text"
                                                autoComplete="off"
                                                name="userName"
                                                placeholder="Name"
                                                component={Input}
                                            />
                                        </FormItem>
                                        <FormItem
                                            label="Email"
                                            invalid={
                                                errors.email && touched.email
                                            }
                                            errorMessage={errors.email}
                                            className="w-1/2 ml-2"
                                        >
                                            <Field
                                                type="email"
                                                autoComplete="off"
                                                name="email"
                                                placeholder="Email"
                                                component={Input}
                                            />
                                        </FormItem>
                                    </div>
                                    <div className="flex w-full justify-between">
                                        {/* <FormItem
                                label="Password"
                                invalid={errors.password && touched.password}
                                errorMessage={errors.password}
                            >
                                <Field
                                    autoComplete="off"
                                    name="password"
                                    placeholder="Password"
                                    component={PasswordInput}
                                />
                            </FormItem>
                            <FormItem
                                label="Confirm Password"
                                invalid={
                                    errors.confirmPassword &&
                                    touched.confirmPassword
                                }
                                errorMessage={errors.confirmPassword}
                            >
                                <Field
                                    autoComplete="off"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    component={PasswordInput}
                                />
                            </FormItem> */}
                                        <FormItem
                                            label="Mobile Number"
                                            invalid={
                                                errors.mobile && touched.mobile
                                            }
                                            errorMessage={errors.mobile}
                                            className="w-1/2 mr-2"
                                        >
                                            <Field
                                                autoComplete="off"
                                                name="mobile"
                                                placeholder="Mobile Number"
                                                component={Input}
                                            />
                                        </FormItem>
                                        <FormItem
                                            label="Address"
                                            invalid={
                                                errors.address &&
                                                touched.address
                                            }
                                            errorMessage={errors.address}
                                            className="w-1/2 ml-2"
                                        >
                                            <Field
                                                autoComplete="off"
                                                name="address"
                                                placeholder="Address"
                                                component={Input}
                                            />
                                        </FormItem>
                                    </div>
                                </FormContainer>

                                <div className="h-0.5 my-2 bg-gray-400 rounded"></div>
                                <div className="mt-4">
                                    <h4>Add Admin</h4>

                                    <FormContainer className="flex flex-col my-4">
                                        <div className="flex w-full justify-between">
                                            <FormItem
                                                label="Name"
                                                invalid={
                                                    errors.firstName &&
                                                    touched.firstName
                                                }
                                                errorMessage={errors.firstName}
                                                className="w-1/2 mr-2"
                                            >
                                                <Field
                                                    type="text"
                                                    autoComplete="off"
                                                    name="firstName"
                                                    placeholder="First Name"
                                                    component={Input}
                                                />
                                            </FormItem>
                                            <FormItem
                                                label="Last Name"
                                                invalid={
                                                    errors.lastName &&
                                                    touched.lastName
                                                }
                                                errorMessage={errors.lastName}
                                                className="w-1/2 mr-2"
                                            >
                                                <Field
                                                    type="text"
                                                    autoComplete="off"
                                                    name="lastName"
                                                    placeholder="Last Name"
                                                    component={Input}
                                                />
                                            </FormItem>
                                        </div>
                                        <div className="flex w-full justify-between">
                                            <FormItem
                                                label="Email"
                                                invalid={
                                                    errors.adminEmail &&
                                                    touched.adminEmail
                                                }
                                                errorMessage={errors.adminEmail}
                                                className="w-1/2 mr-2"
                                            >
                                                <Field
                                                    type="adminEmail"
                                                    autoComplete="off"
                                                    name="adminEmail"
                                                    placeholder="Email"
                                                    component={Input}
                                                />
                                            </FormItem>
                                            <FormItem
                                                label="Mobile Number"
                                                invalid={
                                                    errors.adminMobile &&
                                                    touched.adminMobile
                                                }
                                                errorMessage={
                                                    errors.adminMobile
                                                }
                                                className="w-1/2 mr-2"
                                            >
                                                <Field
                                                    autoComplete="off"
                                                    name="adminMobile"
                                                    placeholder="Mobile Number"
                                                    component={Input}
                                                />
                                            </FormItem>
                                        </div>
                                    </FormContainer>
                                </div>
                                <Button
                                    block
                                    loading={isSubmitting}
                                    variant="solid"
                                    type="submit"
                                >
                                    {isSubmitting
                                        ? 'Creating Account...'
                                        : 'Sign Up'}
                                </Button>
                                <div className="mt-4 text-center">
                                    <span>Already have an account? </span>
                                    <ActionLink to={signInUrl}>
                                        Sign in
                                    </ActionLink>
                                </div>
                            </Form>
                        </>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default SignUpForm
