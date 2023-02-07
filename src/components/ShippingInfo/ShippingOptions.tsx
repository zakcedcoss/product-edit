import { Accordion, Alert, Card, FlexLayout, List, Modal, Switcher, TextStyles } from '@cedcommerce/ounce-ui'
import { useEffect, useState } from 'react'
import ShippingAttrib from './ShippingAttrib'
import ShippingListOptions from './ShippingListOptions'

interface DimensionDataType { [key: string]: { value: number | string, unit: string } }

function ShippingOptions({ data, reference, editedData, setEditedData }: any) {
  const wtOptions = ["lb", "kg", "oz", "gm"].map(d => { return { label: d, value: d } })
  const lenOptions = ["in", "cm", "mm"].map(d => { return { label: d, value: d } })
  const shippingAttributes = [
    { name: "Weight", options: wtOptions },
    { name: "Height", options: lenOptions },
    { name: "Length", options: lenOptions },
    { name: "Width", options: lenOptions },
  ]
  const listOpt = {
    ground: { checked: false, description: "Is the item ground shipping only?" },
    restriction: { checked: false, description: "Is this item restricted from shipping to AK and/or HI?" },
    flammable: { checked: false, description: "Does the listing contain flammable materials?" },
    california: { checked: false, description: "Are you required to display a California Proposition 65 warning on this item?" },
    hazardous: { checked: false, description: "Does this listing contain hazardous materials?" },
    warnings: { checked: false, description: "Are there any hazard, choking, or safety warnings required to be displayed for this listing?" },
    rate: { checked: false, description: "Override shipping rates" },
    return: { checked: false, description: "Override return policy for items" }
  }
  //states
  const [dimensionData, setDimensionData] = useState<DimensionDataType>({} as DimensionDataType)
  const [isVariantChecked, setIsVariantChecked] = useState(false);
  const [variantCount, setVariantCount] = useState(0)
  const [listOptions, setListOptions] = useState(listOpt)

  const scrollView = () => {
    reference.current.scrollIntoView({ behaviour: "smooth", align: "top" })
  }

  useEffect(() => {
    if (!isVariantChecked) {
      setEditedData((prev: any) => {
        return { ...prev, shippingInfo: { ...prev.shippingInfo, dimensionData } }
      })
    } else {
      const { dimensionData, ...rest } = editedData.shippingInfo;
      setEditedData(rest);
    }
  }, [isVariantChecked, dimensionData])


  return (
    <FlexLayout direction='vertical' desktopWidth='100' childWidth='fullWidth'>
      {data && data[0]?.variant_attributes.length !== 0 && <Card cardType="Bordered">
        <FlexLayout direction="vertical" spacing="tight">
          <Switcher
            checked={isVariantChecked}
            name="Variant level dimensions"
            onChange={() => {
              setVariantCount(prev => prev + 1)
              setIsVariantChecked(prev => {
                if (variantCount % 2 === 1) return true;
                return !prev
              })
              if (variantCount % 2 === 0) scrollView()
            }}
            textAligh="right"
          />
          <TextStyles type="Display" fontweight="light">Enable this to set dimensions & weight on individual {isVariantChecked && <span className='view' onClick={() => scrollView()}>View</span>}</TextStyles>
        </FlexLayout>
      </Card>}
      {!isVariantChecked && <Card cardType='Subdued'>
        <FlexLayout direction='vertical' spacing='tight'>
          <FlexLayout halign='fill' valign='center'>
            <TextStyles fontweight='bold'>Michaels Attributes</TextStyles>
            <TextStyles fontweight='bold'>Shopify Attributes</TextStyles>
          </FlexLayout>
          {shippingAttributes.map(data => {
            return <ShippingAttrib key={data.name} label={data.name} options={data.options} dimensionData={dimensionData} setDimensionData={setDimensionData} />
          })}
          {false && <Alert type='danger' destroy={false}>
            <List type="disc">
              {(dimensionData["Weight"]?.value >= 150 || dimensionData["Weight"]?.value === "") && <TextStyles textcolor='negative'>The max weight for standard shipping is 150 lb.</TextStyles>}
              {(dimensionData["Length"]?.value >= 108 || dimensionData["Length"]?.value === "") && <TextStyles textcolor='negative'>The max length for standard shipping is 108 in.</TextStyles>}
              {(dimensionData["Length"]?.value >= (108) || dimensionData["Length"]?.value === "") && <TextStyles textcolor='negative'>For standard shipping, the max length + girth, which is equivalent to 2x width + 2x height, is 165 in.</TextStyles>}
            </List>
          </Alert>}
          {false && <Alert type='warning' destroy={false}>
            <TextStyles fontweight='bold'>Either reduce your dimensions or enable override shipping rates and provide LTL Freight Rates</TextStyles>
          </Alert>}
        </FlexLayout>
      </Card>}
      <Card cardType='Subdued'>
        <FlexLayout spacing='extraLoose' direction='vertical'>
          {Object.keys(listOptions).map((list: string, i: number) => {
            return <ShippingListOptions key={i} listOptions={listOptions} objKey={list} setListOptions={setListOptions} editedData={editedData} setEditedData={setEditedData} />
          })}
        </FlexLayout>
      </Card>
      <Modal open={variantCount > 0 && variantCount % 2 === 0}
        close={() => {
          setIsVariantChecked(true)
          setVariantCount(1)
        }}
        heading="Disable Product Attributes ?"
        modalSize="small"
        overlayClose
        primaryAction={{
          content: 'Disable',
          onClick: () => {
            setIsVariantChecked(false)
            setVariantCount(0)
          }
        }}
      >
        <List type="disc">
          {["All your variant specific dimension details that you have saved will be lost.,", "Your product will use dimension details from product level dimensions."].map(text => {
            return <TextStyles key={text} textcolor="light">{text}</TextStyles>
          })}
        </List>
      </Modal>
    </FlexLayout>
  )
}

export default ShippingOptions