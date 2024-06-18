import React from "react";

export default function Success({ success }) {
    return (
        <div>
            <div className="aler alert-success" role="alert">
                {success}
            </div>
        </div>
    )
}

