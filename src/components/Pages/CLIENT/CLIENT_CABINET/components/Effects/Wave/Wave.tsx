import css from "./Wave.module.css";

type WaveProps = {
    height?: number;
    waveHeightScale?: number;
};

export const Wave = ({ height = 200, waveHeightScale = 1 }: WaveProps) => {
    return (
        <div className={css.svg} style={{ width: "100%", height: `${height}px`, overflow: "hidden" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1600 900" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="bg">
                        <stop offset="0%" stopColor="rgba(130, 158, 249, 0.06)" />
                        <stop offset="50%" stopColor="rgba(76, 190, 255, 0.6)" />
                        <stop offset="100%" stopColor="rgba(115, 209, 72, 0.2)" />
                    </linearGradient>

                    <path
                        id="wave"
                        fill="url(#bg)"
                        d="M-363.852,502.589c0,0,236.988-41.997,505.475,0
                        s371.981,38.998,575.971,0s293.985-39.278,505.474,5.859
                        s493.475,48.368,716.963-4.995v560.106H-363.852V502.589z"
                    />
                </defs>

                <g transform={`scale(1, ${waveHeightScale})`}>
                    <use xlinkHref="#wave" opacity=".3">
                        <animateTransform attributeName="transform" attributeType="XML" type="translate" dur="10s" calcMode="spline" values="270 230; -334 180; 270 230" keyTimes="0; .5; 1" keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0" repeatCount="indefinite" />
                    </use>
                    <use xlinkHref="#wave" opacity=".6">
                        <animateTransform attributeName="transform" attributeType="XML" type="translate" dur="8s" calcMode="spline" values="-270 230;243 220;-270 230" keyTimes="0; .6; 1" keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0" repeatCount="indefinite" />
                    </use>
                    <use xlinkHref="#wave" opacity=".9">
                        <animateTransform attributeName="transform" attributeType="XML" type="translate" dur="6s" calcMode="spline" values="0 230;-140 200;0 230" keyTimes="0; .4; 1" keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0" repeatCount="indefinite" />
                    </use>
                </g>
            </svg>
        </div>
    );
};
