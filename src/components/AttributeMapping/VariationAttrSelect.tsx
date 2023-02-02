import { CheckBox, ChoiceList, FlexChild, FlexLayout, Select, TextStyles } from "@cedcommerce/ounce-ui"
import { useState } from "react";
import { RefreshCcw } from "react-feather"

function VariationAttrSelect({ mappedData, required, displayName }: any) {
    const options = mappedData.variant_attr;
    const [selectedVal, setSelectedVal] = useState<string[]>([]);

    return (
        <FlexLayout valign="center" halign="fill" desktopWidth="100" childWidth="fullWidth">
            <FlexLayout>
                <CheckBox labelVal={displayName} checked={selectedVal.length === 0 ? false : true} required={Boolean(required)} />
            </FlexLayout>
            <FlexLayout spacing="tight" halign="end" valign="center">
                <ChoiceList value={selectedVal} showBadges={true} placeholder="Select Variations" options={options} onChange={(e) => {
                    const found = selectedVal.find(opt => opt === e);
                    if (found) {
                        setSelectedVal(prev => {
                            return prev.filter(d => d !== e)
                        })
                        return;
                    }
                    setSelectedVal(prev => [...prev, e])
                }} />
            </FlexLayout>
        </FlexLayout>
    )
}

export default VariationAttrSelect