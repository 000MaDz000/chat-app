'use client';

import { useState } from "react";
import reSendCode from "../_actions/resend-code";

export default function ReSendCodeButton() {
    const [counter, setCounter] = useState(0);

    return (
        <button className={"text-blue-600 hover:underline hover:text-sky-700 transition-colors text-md font-semibold text-left" + (counter >= 3 ? " cursor-not-allowed" : "")} onClick={() => {
            if (counter < 3) {
                reSendCode();
                setCounter(counter + 1);
            }
        }}>resend code?</button>
    )
}
