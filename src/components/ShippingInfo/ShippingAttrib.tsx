import { CheckBox, FlexLayout, Select, TextField } from '@cedcommerce/ounce-ui'
import { useEffect, useState } from 'react'

function ShippingAttrib({ label, options, setDimensionData, dimensionData }: any) {
    const [text, setText] = useState<string | number>(3);
    const [selected, setSelected] = useState(options[0].value)

    useEffect(() => {
        setDimensionData((prev: any) => {
            return { ...prev, [label]: { value: text, unit: selected } }
        })
    }, [text, selected])
    return (
        <FlexLayout valign="center" halign="fill" wrap='noWrap' desktopWidth='100' childWidth='fullWidth'>
            <FlexLayout>
                <CheckBox checked={text !== "" && selected !== ""} labelVal={label} required />
            </FlexLayout>
            <FlexLayout spacing="tight" halign="end" valign="center" wrap='noWrap'>
                <TextField type='number' value={text} placeHolder='custom value' onChange={setText} />
                <Select value={selected} options={options} onChange={setSelected} />
            </FlexLayout>
        </FlexLayout>
    )
}

export default ShippingAttrib;