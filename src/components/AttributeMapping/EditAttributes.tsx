import { Accordion, Card, FlexLayout, TextStyles } from "@cedcommerce/ounce-ui"
import { useState } from "react";
import { Loader } from "react-feather";
import useGetProducts from "../../requests/useGetProducts"
import AttribSelect from "./AttribSelect";
import VariationAttrSelect from "./VariationAttrSelect";

function EditAttributes({ category_settings }: any) {
    const [openProductAttrib, setOpenProductAttrib] = useState(false);
    const [openVariationAttrib, setOpenVariationAttrib] = useState(false);
    const { data: mappedData } = useGetProducts("https://connector-dev.demo.cedcommerce.com/home-connector/public/michaelhome/profile/getMappingAttributes");
    const { data: attributes, isLoading } = useGetProducts(`https://connector-dev.demo.cedcommerce.com/home-connector/public/michaelhome/profile/attributes?taxonomyPath=${category_settings}`)

    const productAttrib = attributes?.data?.filter((attr: any) => {
        return !attr.variation;
    })
    const variationsAttrib = attributes?.data?.filter((attr: any) => {
        return attr.variation;
    })

    return (
        <>
            {isLoading ?
                <Card>
                    <FlexLayout halign="center" valign="center" spacing="tight">
                        <Loader size={30} />
                    </FlexLayout>
                </Card>
                : <Card cardType="Plain">
                    {/* on Close on accordion : one opens another closes */}
                    <Accordion active={openProductAttrib} boxed onClick={() => setOpenProductAttrib(prev => !prev)} title="Product Attributes">
                        <FlexLayout direction="vertical" spacing="tight">
                            <FlexLayout spacing="tight" halign="fill" valign="center">
                                <TextStyles>Michaels Attributes</TextStyles>
                                <TextStyles>Michaels Attributes</TextStyles>
                            </FlexLayout>
                            <FlexLayout spacing="tight" direction="vertical">
                                {productAttrib && productAttrib.map((prodAttr: any, i: number) => {
                                    return <AttribSelect key={i} mappedData={mappedData?.data} {...prodAttr} />
                                })}
                            </FlexLayout>
                        </FlexLayout>
                    </Accordion>
                    {variationsAttrib && variationsAttrib.length !== 0 && <Accordion active={openVariationAttrib} boxed onClick={() => setOpenVariationAttrib(prev => !prev)} title="Variation Attributes">
                        <FlexLayout direction="vertical" spacing="tight">
                            <FlexLayout spacing="tight" halign="fill" valign="center">
                                <TextStyles>Michaels Attributes</TextStyles>
                                <TextStyles>Shopify Attributes</TextStyles>
                            </FlexLayout>
                            <FlexLayout spacing="tight" direction="vertical">
                                {variationsAttrib && variationsAttrib.map((prodAttr: any, i: number) => {
                                    return <VariationAttrSelect key={i} mappedData={mappedData?.data} {...prodAttr} />
                                })}
                            </FlexLayout>
                        </FlexLayout>
                    </Accordion>}
                </Card>}
        </>
    )
}

export default EditAttributes