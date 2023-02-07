import { Accordion, Card, CheckBox, ChoiceList, FlexLayout, List, Select, Switcher, TextArea, TextField, TextStyles, ToolTip } from '@cedcommerce/ounce-ui';
import { useEffect, useState } from 'react';
import { Info, Zap } from 'react-feather';

function ShippingListOptions({ listOptions, objKey, setListOptions, editedData, setEditedData }: any) {
    const restrictionHelpText = "Most items can be shipped to Alaska, Hawaii, and Puerto Rico; however, certain restrictions may apply which include: Dimensional shipping limits - standard shipping to these regions is limited by the overall shipping size which includes a maximum length or girth of 108 inches and a maximum weight of 70 lbs. Large and/or oddly-shaped items may not be eligible for shipping. Hazmat - certain hazmat items (including but not limited to lithium batteries) are restricted from shipping to these areas. Address type - certain address types preclude shipping speeds, due to carrier capabilities.";
    const returnOptions = [
        { label: "No returns (Not Recommed=nded)", value: "no" },
        { label: "30 days return", value: "30" },
        { label: "60 days return", value: "60" },
    ]
    const hazardOptions = [
        { label: "Choking Hazard - Balloon", value: "Choking Hazard - Balloon" },
        { label: "Choking Hazard - Small Ball", value: "Choking Hazard - Small Ball" },
        { label: "Choking Hazard - Small Parts", value: "Choking Hazard - Small Parts" },
        { label: "Entanglement Hazard", value: "Entanglement Hazard" },
        { label: "Sharp Point", value: "Sharp Point" },
        { label: "Small Magnets", value: "Small Magnets" },
        { label: "Small Marble", value: "Small Marble" },
        { label: "Strangulation Hazard", value: "Strangulation Hazard" },
    ]
    //states
    const [textArea, setTextArea] = useState("");
    const [rateTexts, setRateTexts] = useState<{ [key: string]: string | number }>({ standard: 0, expendited: 0, ltl: 0 })
    const [rateChecked, setRateChecked] = useState(false);
    const [returnChecked, setReturnChecked] = useState(true);
    const [returnSelect, setReturnSelect] = useState("30");
    const [hazardSelect, setHazardSelect] = useState<string[]>([]);

    useEffect(() => {
        setEditedData((prev: any) => {
            return { ...prev, shippingInfo: { ...prev.shippingInfo, shippingOptions: { rateTexts, rateChecked, returnChecked, hazardSelect, returnSelect } } }
        })
    }, [rateTexts, rateChecked, returnChecked, hazardSelect, returnSelect])
    return (
        <FlexLayout direction='vertical' spacing='tight'>
            <FlexLayout valign='center' halign='fill' wrap='noWrap'>
                <FlexLayout spacing='tight' valign='center'>
                    <TextStyles lineHeight='LH-1.6'>{listOptions[objKey].description}</TextStyles>
                    {objKey === "restriction" && <ToolTip open={false} helpText={restrictionHelpText} position="bottom" type="dark"><Info size={16} /></ToolTip>}
                </FlexLayout>
                <Switcher checked={listOptions[objKey].checked} disabled={objKey === "ground" && listOptions["hazardous"].checked} onChange={() => {
                    setListOptions((prev: any) => {
                        if (objKey === "hazardous") return { ...prev, ground: { ...prev.ground, checked: true }, [objKey]: { ...prev[objKey], checked: !prev[objKey].checked } }
                        return { ...prev, [objKey]: { ...prev[objKey], checked: !prev[objKey].checked } }
                    })
                }} />
            </FlexLayout>
            {/* conditional */}
            {listOptions["california"].checked && objKey === "california" &&
                <Card cardType='Subdued'>
                    <TextArea name="California’s Prop 65 warning message (Optional)" placeHolder="Please enter the warning text you would like customers to see on the listing detail page" rows={2} type="textarea" value={textArea} onChange={setTextArea} />
                </Card>
            }
            {listOptions["hazardous"].checked && objKey === "hazardous" &&
                <Card cardType='Subdued'>
                    <FlexLayout valign='center' spacing='tight' >
                        <Zap color='#f2af29' size={20} />
                        <TextStyles type='SubHeading'>Hazardous Item(s)</TextStyles>
                    </FlexLayout>
                    <List type="disc">
                        {["Your item(s) will be shipped on ground shipping only.", "Expedited shipping option will not be available.", "Free shipping option will not be available."].map((desc: string) => {
                            return <TextStyles fontweight='light' key={desc}>{desc}</TextStyles>
                        })}
                    </List>
                </Card>
            }
            {listOptions["warnings"].checked && objKey === "warnings" &&
                <Card cardType='Subdued'>
                    <ChoiceList value={hazardSelect} name="Select one or more hazards that apply to your listing" placeholder='Hazard Types' thickness='thin' showBadges={true} options={hazardOptions} onChange={(e) => {
                        const found = hazardSelect.find(opt => opt === e);
                        if (found) {
                            setHazardSelect(prev => {
                                return prev.filter(d => d !== e)
                            })
                            return;
                        }
                        setHazardSelect(prev => [...prev, e])
                    }} />
                </Card>
            }
            {listOptions["return"].checked && objKey === "return" &&
                <Card cardType='Subdued'>
                    <FlexLayout spacing='tight' direction='vertical'>
                        <Select value={returnSelect} name="Setup custom return policy for items" thickness='thin' options={returnOptions} onChange={setReturnSelect} />
                        <FlexLayout valign='center' halign='fill' wrap='noWrap'>
                            <TextStyles>Does the buyer need to ship items back?</TextStyles>
                            <Switcher checked={returnChecked} onChange={() => setReturnChecked(prev => !prev)} />
                        </FlexLayout>
                    </FlexLayout>
                </Card>
            }
            {listOptions["rate"].checked && objKey === "rate" &&
                <Card cardType='Subdued'>
                    <FlexLayout spacing='tight' direction='vertical'>
                        <TextStyles fontweight='light'>If enabled, then it's mandatory to provide either Standard/Expedited charges or LTL Freight charges</TextStyles>
                        <FlexLayout valign='center' halign='fill' wrap='noWrap'>
                            <TextStyles>Do you want to provide free standard shipping?</TextStyles>
                            <Switcher checked={rateChecked} onChange={() => setRateChecked(prev => !prev)} />
                        </FlexLayout>
                        <FlexLayout spacing='tight' valign='center'>
                            <TextField disabled={rateChecked} value={rateChecked ? "FREE" : rateTexts.standard} name="Standard shipping" onChange={(e) => setRateTexts(prev => {
                                return { ...prev, standard: e }
                            })} />
                            <TextField disabled={rateChecked} value={rateTexts.expendited} name="Expedited shipping" onChange={(e) => setRateTexts(prev => {
                                return { ...prev, expendited: e }
                            })} />
                            <TextField disabled={rateChecked} value={rateTexts.ltl} name="LTL Freight" onChange={(e) => setRateTexts(prev => {
                                return { ...prev, ltl: e }
                            })} />
                        </FlexLayout>
                    </FlexLayout>
                </Card>
            }
        </FlexLayout>
    )
}

export default ShippingListOptions