"use client"

import BtnCustom from "@/components/btnCustom/btnCustom";
import { useSendCsvMutation } from "@/services/csvService";
import { Form, FormikProvider, useFormik } from "formik";
import { FormikHelpers } from "formik/dist/types";
import toast from "react-hot-toast";
import * as yup from "yup";

export default function UploadFile() {
    const [upload, { data, error, isLoading }] = useSendCsvMutation();

    const notify = (message: string, theme: any) => {
        toast(message, { ...theme, position: "top-right", duration: 4000 });
    };

    interface CsvFormValues {
        file: File | string;
    }

    const formik = useFormik<CsvFormValues>({
        initialValues: {
            file: "",
        },
        validationSchema: yup.object({
            file: yup.mixed().required('File is required'),
        }),
        onSubmit: handleSubmit,
    });

    async function handleSubmit(values: CsvFormValues, { resetForm }: FormikHelpers<CsvFormValues>) {
        const formData = new FormData();
        formData.append('file', values.file as File);
        try {
            console.log("Submitting form with values:", values);
            const response = await upload(formData).unwrap();
            console.log("Upload response:", response);
            resetForm();
            notify("File uploaded!", { icon: "🚀", style: { background: "#fff", color: "#000" } });
        } catch (error) {
            console.error("Upload error:", error);
            notify("Failed to upload file!", { icon: "❌", style: { background: "#fff", color: "#000" } });
        }
    }

    return (
        <div className="p-8 overflow-y-hidden w-full">
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-2xl text-black my-4 w-full">Upload File</h1>
            </div>
            <FormikProvider value={formik}>
                <Form>
                    <div className="flex flex-col justify-start gap-4">
                        <input
                            type="file"
                            name="file"
                            className="text-black"
                            onChange={(event) => {
                                const file = event.currentTarget.files?.[0];
                                if (file) {
                                    formik.setFieldValue('file', file);
                                    console.log("Selected file:", file);
                                }
                            }}
                        />
                        {formik.errors.file && formik.touched.file && (
                            <div className="text-red-500">{formik.errors.file}</div>
                        )}
                        <button
                            className="bg-primary text-white font-bold rounded-md px-4 py-2"
                            onClick={() => {
                                formik.handleSubmit();
                            }}
                            type="submit"
                        >
                            {
                                isLoading ? (
                                    <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V4a10 10 0 00-10 10h2zm2 8a8 8 0 018-8h2a10 10 0 00-10-10v2zm8-8a8 8 0 01-8 8V20a10 10 0 0010-10h-2z"></path>
                                    </svg>
                                ) : (
                                    'Upload File'
                                )
                            }
                        </button>
                    </div>
                </Form>
            </FormikProvider>
        </div>
    );
}