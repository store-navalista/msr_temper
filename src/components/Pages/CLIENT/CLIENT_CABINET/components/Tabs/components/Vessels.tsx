"use client";

import { useState } from "react";
import css from "../Tabs.module.css";

const DownloadButton = () => {
    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
        setLoading(true);

        window.location.href = "/api/download-wait";

        fetch("/api/start-process", {
            method: "POST",
            body: JSON.stringify({
                context: {
                    vessel: ["1981cee-906b-7433-99e3-63de86a62bb7"],
                    api_process: true,
                },
            }),
        }).finally(() => setLoading(false));
    };

    return (
        <button onClick={handleDownload} className={css.button}>
            {loading ? "loading" : "Generate status report"}
        </button>
    );
};

const data = [
    { vessel_name: "Arktika", imo: "9876543", type: "Dry Cargo", flag: "Uzbekistan", port: "Punta Arenas" },
    { vessel_name: "Vostok", imo: "9876544", type: "Tanker", flag: "Trinidad and Tobago", port: "Aasiaat" },
    { vessel_name: "Bering Sea", imo: "9876545", type: "Container", flag: "Uruguay", port: "Jakobshavn" },
    { vessel_name: "Polyarnik", imo: "9876546", type: "Icebreaker", flag: "Mongolia", port: "Sukkertoppen" },
];

export const Vessels = () => {
    return (
        <div className={css.table}>
            <div className={css.header}>
                <p>Vessel Name</p>
                <p>IMO</p>
                <p>Vessel Type</p>
                <p>Flag</p>
                <p>Port of Registry</p>
                <p>Review</p>
            </div>
            {data.map((ship, index) => {
                const keys = Object.keys(ship) as Array<keyof typeof ship>;

                return (
                    <div key={index} className={css.row}>
                        {keys.map((v, i) => {
                            return <p key={`${v}` + i}>{ship[v]}</p>;
                        })}
                        <div className={css.buttons}>
                            <div>
                                <DownloadButton />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
