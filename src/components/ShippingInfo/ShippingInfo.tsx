import { Card, FlexLayout, List, Modal, Switcher, TextStyles } from "@cedcommerce/ounce-ui"
import { useState } from "react";
import ShippingOptions from "./ShippingOptions";

function ShippingInfo({ data, reference }: any) {
    const [isChecked, setIsChecked] = useState(false);
    const [count, setCount] = useState(0);

    return (
        <Card cardType="Subdued" title="Shipping Information">
            <FlexLayout spacing="tight" desktopWidth="100" childWidth="fullWidth">
                <Card cardType="Bordered">
                    <FlexLayout direction="vertical" spacing="tight">
                        <Switcher
                            checked={isChecked}
                            name="Set custom shipping info"
                            onChange={() => {
                                setCount(prev => prev + 1)
                                setIsChecked(prev => {
                                    if (count % 2 === 1) return true;
                                    return !prev
                                })
                            }}
                            textAligh="right"
                        />
                        <TextStyles type="Display" fontweight="light">Enable this to set product specific shipping info. Disable this to use shipping info from profile.</TextStyles>
                    </FlexLayout>
                </Card>
                {isChecked && <ShippingOptions data={data} reference={reference} />}
            </FlexLayout>
            <Modal open={count > 0 && count % 2 === 0}
                close={() => {
                    setIsChecked(true)
                    setCount(1)
                }}
                heading="Disable Product Attributes ?"
                modalSize="small"
                overlayClose
                primaryAction={{
                    content: 'Disable',
                    onClick: () => {
                        setIsChecked(false)
                        setCount(0)
                    }
                }}
            >
                <List type="disc">
                    {["All your product specific shipping details that you have saved will be lost.",
                        "Your product will use the shipping details from the assigned profile.",
                        "All your variant specific dimension details that you have saved will be lost.",
                        "Your product will use dimension details from the assigned profile."].map(text => {
                            return <TextStyles key={text} textcolor="light">{text}</TextStyles>
                        })}
                </List>
            </Modal>
        </Card>
    )
}

export default ShippingInfo