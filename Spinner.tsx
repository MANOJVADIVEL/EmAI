import React from "react";
import { RingLoader } from "react-spinners";
import './Spinner.css'

type Props = {
    isLoading?: boolean;
};

const Spinner = (props: Props) => {
    return (
        <>
            <div id="loading-spinner">
            <RingLoader
                    color="#fdfdfbcd"
                    loading={props.isLoading}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        </>
    );
};

export default Spinner;
