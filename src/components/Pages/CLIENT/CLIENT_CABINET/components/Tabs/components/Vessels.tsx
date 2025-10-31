"use client";

import { FC, useState } from "react";
import css from "../Tabs.module.css";
import { CompanyDataType } from "../../../ClientCabinet";
import { useLazyGenerateSVQuery } from "@/store/reducers/apiReducer";

const DownloadButton: FC<{ vesselId: string }> = ({ vesselId }) => {
    const [loading, setLoading] = useState(false);
    const [trigger] = useLazyGenerateSVQuery();

    const handleDownload = async () => {
        setLoading(true);
        try {
            const result = await trigger(vesselId);

            if (result.data) {
                const blob = new Blob([result.data], { type: "application/pdf" });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = `status-report-${vesselId}.pdf`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            }
        } catch (error) {
            console.error("Error downloading PDF:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button onClick={handleDownload} className={css.button} disabled={loading}>
            {loading ? "Generating..." : "Generate status report"}
        </button>
    );
};

export const Vessels: FC<{ companyData: CompanyDataType }> = ({ companyData }) => {
    const { vessels } = companyData;
    const fields = ["vessel_name", "imo", "vesse_type", "flag", "port_of_registry"];

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
            {(vessels as Record<string, string>[]).map((ship, index) => {
                const keys = Object.keys(ship) as Array<keyof typeof ship>;
                const vesselId = ship.id || ship.vessel_id || ship.imo || index.toString();

                return (
                    <div key={index} className={css.row}>
                        {keys.map((v, i) => {
                            const isField = fields.includes(v);
                            if (!isField) return null;
                            return <p key={`${v}` + i}>{ship[v]}</p>;
                        })}
                        <div className={css.buttons}>
                            <div>
                                <DownloadButton vesselId={vesselId} />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
