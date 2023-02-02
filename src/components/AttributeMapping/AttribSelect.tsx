import { CheckBox, FlexLayout, Select } from "@cedcommerce/ounce-ui"
import { useState } from "react";
import { RefreshCcw } from "react-feather"

function AttribSelect({ mappedData, mapping, required, displayName, availableValues }: any) {
    const options = mapping ? mappedData.attr : availableValues?.map((val: any) => {
        return { label: val, value: val }
    });

    const [selectedVal, setSelectedVal] = useState(required ? options[0].value : "");

    return (
        <FlexLayout valign="center" halign="fill" desktopWidth="100" childWidth="fullWidth">
            <FlexLayout>
                <CheckBox labelVal={displayName} checked={selectedVal === "" ? false : true} required={Boolean(required)} />
            </FlexLayout>
            <FlexLayout spacing="tight" halign="end" valign="center">
                <Select value={selectedVal} options={options} onChange={(e) => setSelectedVal(e)} />
                {selectedVal !== "" && !required && <RefreshCcw size={16} onClick={() => setSelectedVal("")} />}
            </FlexLayout>
        </FlexLayout>
    )
}

export default AttribSelect