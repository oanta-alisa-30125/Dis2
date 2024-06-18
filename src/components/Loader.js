import React from "react";
export default function Loader() {
    return (
        <div className="mt-5">
            <div className="spinner-border" role="status">
                <span className="sr-only">Se incarcă...</span>
            </div>
        </div>
    );
}
