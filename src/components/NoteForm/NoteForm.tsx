import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik";
import * as Yup from "yup";
import css from "./NoteForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../services/noteService";
import type { NoteData } from "../../types/note";
    interface NoteFormProps {
        onCloseModal: () => void;
    }
    const noteSchema = Yup.object().shape({
        title: Yup.string().required("Title is required").min(3, "Title must be at least 3 characters").max(50, "Title must be at most 50 characters"),
        content: Yup.string().max(500, "Content must be at most 500 characters"),
        tag: Yup.string().oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"]).required("Tag is required")
    });

export default function NoteForm({ onCloseModal }: NoteFormProps) { 
    const queryClient = useQueryClient();
const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['notes'] });
        onCloseModal();
    }
});
    const handleSubmit = (values: NoteData, formikHelper: FormikHelpers<NoteData>) => {
        formikHelper.resetForm();
        mutate(values);
    };

    return (
        <Formik initialValues={{
            title: "",
            content: "",
            tag: "Todo",
        }} onSubmit={handleSubmit} validationSchema={noteSchema}>
        <Form className={css.form}>
  <div className={css.formGroup}>
    <label htmlFor="title">Title</label>
    <Field id="title" type="text" name="title" className={css.input} />
    <ErrorMessage name="title" component="span"  className={css.error} />
  </div>

  <div className={css.formGroup}>
    <label htmlFor="content">Content</label>
    <Field
        as="textarea"
      id="content"
      name="content"
      rows={8}
      className={css.textarea}
    />
    <ErrorMessage name="content" component="span" className={css.error} />
  </div>

  <div className={css.formGroup}>
    <label htmlFor="tag">Tag</label>
    <Field as="select" id="tag" name="tag" className={css.select}>
      <option value="Todo">Todo</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Meeting">Meeting</option>
      <option value="Shopping">Shopping</option>
    </Field>
    <ErrorMessage name="tag" component="span" className={css.error} />
  </div>

  <div className={css.actions}>
    <button type="button" className={css.cancelButton} onClick={onCloseModal}>
      Cancel
    </button>
    <button
                        type="submit"
                        className={css.submitButton}
    >
      Create note
    </button>
  </div>
            </Form>
        </Formik>
    )
}