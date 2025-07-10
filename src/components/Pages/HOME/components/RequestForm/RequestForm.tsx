import useOutsideClick from "@/components/hooks/useOutsideClick";
import { UI } from "@/components/UI";
import Content from "@/content/en.json" assert { type: "json" };
import clsx from "clsx";
import Image from "next/image";
import { useRef, useState } from "react";
import css from "./RequestForm.module.css";

const fields = ["name", "email", "company", "phone"] as const;
type Field = (typeof fields)[number];

export const RequestForm = () => {
    const [data, setData] = useState({
        currentSurvey: "Periodic Survey",
    });
    const [isSelectActive, setisSelectActive] = useState(false);
    const ref = useRef<HTMLUListElement>(null);

    const sendHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    const selectHandler = () => {
        setisSelectActive((prev) => !prev);
    };

    useOutsideClick(ref, () => setisSelectActive(false));

    return (
        <section id="request-form" className={css.request_form}>
            <h3 id="classification-survey-heading">{Content.Home._request_form.h3}</h3>
            <p>{Content.Home._request_form.desc}</p>
            <form className={css.form} onSubmit={sendHandler}>
                {fields.map((f) => {
                    return (
                        <div key={f} className={css.input}>
                            <div className={css.icon}>
                                <Image src={`/images/svg/form-${f}.svg`} fill alt="icon" />
                            </div>
                            <input placeholder={Content.Home._request_form.placeholder[f as Field]} />
                        </div>
                    );
                })}
                <div className={clsx(css.select, isSelectActive && css.active)} onClick={selectHandler}>
                    {data.currentSurvey}
                    <div className={css.select_icon}>
                        <Image src={`/images/svg/arrow-single.svg`} fill alt="icon" />
                    </div>
                    {isSelectActive && (
                        <ul ref={ref} className={css.list}>
                            {Content.Home._request_form.selects.map((s) => {
                                return (
                                    <li onClick={() => setData((prev) => ({ ...prev, currentSurvey: s }))} key={s}>
                                        {s}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
                <UI.Button colorScheme="secondary" type="submit">
                    {Content.Home._request_form.button}
                </UI.Button>
            </form>
        </section>
    );
};
