import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    gdpr: boolean;
}
interface Props {
    amount: number;
    method: string;
}

const FormularDonatie: NextPage<Props> = ({ amount, method }) => {
    const router = useRouter();

    const initialValues: FormData = {
        firstName: '',
        lastName: '',
        email: '',
        gdpr: false,
    };

    const validationSchema = Yup.object({
        firstName: Yup.string().required('Prenumele este obligatoriu'),
        lastName: Yup.string().required('Numele este obligatoriu'),
        email: Yup.string().email('Adresa de email este invalidă').required('Adresa de email este obligatorie'),
        gdpr: Yup.boolean().oneOf([true], 'Trebuie să fiți de acord cu GDPR pentru a continua'),
    });

    const handleSubmit = (values: FormData) => {
        console.log(values.email);
        // Perform your donation submission logic here

        // Redirect or show a success message
        // router.push('/success');
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            <Form>
                <div className="mt-4">
                    <label htmlFor="firstName">Prenume</label>
                    <Field type="text" id="firstName" name="firstName"
                        className="w-full block border focus:outline-primary focus:rounded-[0px] p-2 border-gray-300 rounded"
                    />
                    <ErrorMessage name="firstName" component="span" className="text-red-500 text-sm" />
                </div>

                <div className="mt-2">
                    <label htmlFor="lastName">Nume</label>
                    <Field type="text" id="lastName" name="lastName"
                        className="w-full block border focus:outline-primary focus:rounded-[0px] p-2 border-gray-300 rounded"
                    />
                    <ErrorMessage name="lastName" component="span" className="text-red-500 text-sm" />
                </div>

                <div className="mt-2">
                    <label htmlFor="email">Email</label>
                    <Field type="email" id="email" name="email"
                        className="w-full block border focus:outline-primary focus:rounded-[0px] p-2 border-gray-300 rounded"
                    />
                    <ErrorMessage name="email" component="span" className="text-red-500 text-sm" />
                </div>

                <div className="mt-2">
                    <label>
                        <Field type="checkbox" name="gdpr" />
                        Sunt de acord cu politica GDPR
                    </label>
                    <ErrorMessage name="gdpr" component="span" className="text-red-500 text-sm block" />
                </div>

                <div>
                <p className="my-3 text-sm">Vei dona: <span className="font-semibold">{amount} Ron</span>, {method == 'op' ? 'prin transfer bancar' : method == 'odata' ? 'o dată' : method } </p>
                </div>
                <button type="submit"
                className="w-full bg-primary text-semibold text-white py-3 rounded hover:shadow-xl mt-2"
                >
                    Donează {method == 'op' ? 'prin transfer bancar' : method == 'odata' ? 'o dată' : method}

                </button>
            </Form>
        </Formik>
    );
};

export default FormularDonatie;
