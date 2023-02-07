import { Card, FlexLayout, List, Modal, Switcher, Tag, TextStyles } from "@cedcommerce/ounce-ui"
import { useEffect, useState } from "react"
import EditAttributes from "./EditAttributes";

function AttributeMapping({ data, editedData, setEditedData }: any) {
    const [attributeMappingData, setAttributeMappingData] = useState({});
    const defaultRoot = "root//Shop Categories//Apparel Crafts//Seasonal %26 Costumes//Shop by Theme//Funny Halloween Costumes";
    const [isChecked, setIsChecked] = useState(false);
    const [count, setCount] = useState(0)
    const taxonomyPath = data && (data[0]?.profile_info?.category_settings?.split("//").slice(2).join(" > ") ?? "Apparel Crafts > Seasonal & Costumes > Shop by Theme > Funny Halloween Costumes")

    useEffect(() => {
        if (isChecked) {
            setEditedData((prev: any) => {
                return { ...prev, attributeMappingData }
            })
        } else {
            const { attributeMappingData, ...rest } = editedData;
            setEditedData(rest);
        }
    }, [isChecked])

    return (
        <Card cardType="Subdued" title="Attribute Mapping">
            {isChecked && <Card cardType="Bordered" title="Category">
                <Tag>{taxonomyPath}</Tag>
            </Card>}
            <Card cardType="Bordered">
                <FlexLayout direction="vertical" spacing="tight">
                    <Switcher
                        checked={isChecked}
                        name="Set custom product attributes"
                        onChange={() => {
                            setCount(prev => prev + 1)
                            setIsChecked(prev => {
                                if (count % 2 === 1) return true;
                                return !prev
                            })
                        }}
                        textAligh="right"
                    />
                    <TextStyles type="Display" fontweight="light">Enable this to set product specific attributes. Disable this to use attributes from profile.</TextStyles>
                </FlexLayout>
            </Card>
            {isChecked && <EditAttributes category_settings={data && (data[0]?.profile_info?.category_settings ?? defaultRoot)} attributeMappingData={attributeMappingData} setAttributeMappingData={setAttributeMappingData} />}
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
                    <TextStyles textcolor="light">All your product specific attribute details that you have saved will be lost.</TextStyles>
                    <TextStyles textcolor="light">Your product will use the attribute details from the assigned profile.</TextStyles>
                </List>
            </Modal>
        </Card>
    )
}

export default AttributeMapping