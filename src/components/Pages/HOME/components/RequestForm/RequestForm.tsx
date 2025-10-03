import { UI } from "@/components/UI";
import Content from "@/content/en.json" assert { type: "json" };
import css from "./RequestForm.module.css";
import { OnlineRequest } from "../OnlineRequest/OnlineRequest";
import DragDrop from "./DragDrop";
import { useState } from "react";

export const RequestForm = () => {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    const sendHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <section id="request-form" className={css.request_form}>
            <h3 id="classification-survey-heading">{Content.Home._request_form.h3}</h3>
            <p>{Content.Home._request_form.desc}</p>
            <OnlineRequest />
            <form className={css.form} onSubmit={sendHandler}>
                <p>{Content.Home._request_form.after_fill}</p>
                <div className={css.file_block}>
                    <DragDrop {...{ uploadedFile, setUploadedFile }} />
                    <textarea placeholder="Here you can leave a comment for our manager." className={css.comments} />
                </div>
                <UI.Button disabled={!uploadedFile} colorScheme={!uploadedFile ? "disabled" : "secondary"} type="submit">
                    {Content.Home._request_form.button}
                </UI.Button>
            </form>
        </section>
    );
};
