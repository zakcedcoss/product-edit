import { Button, Card, Tabs, TextStyles } from '@cedcommerce/ounce-ui'
import { useEffect, useRef, useState } from 'react';
import { Box, Image, Info, Map, Truck } from 'react-feather'
import useGetProducts from '../../requests/useGetProducts';
import AttributeMapping from '../AttributeMapping/AttributeMapping';
import BasicInfo from '../BasicInfo/BasicInfo';
import ImagenVideo from '../ImagenVideo/ImagenVideo';
import ShippingInfo from '../ShippingInfo/ShippingInfo';
import Variations from '../Variations/Variations';

function EditProducts() {
    const { data } = useGetProducts("https://connector-dev.demo.cedcommerce.com/home-connector/public/connector/product/getProduct?container_id=7959922311392&source_marketplace=shopify&target_marketplace=michael&sourceShopID=86&targetShopID=93");
    const basicRef = useRef(null);
    const attributeRef = useRef(null);
    const imageRef = useRef(null);
    const shippingRef = useRef(null);
    const variationsRef = useRef(null);
    const [selectedTab, setSelectedTab] = useState("basic");

    const refObject: any = {
        "basic": basicRef,
        "attribute": attributeRef,
        "image": imageRef,
        "shipping": shippingRef,
        "variations": variationsRef
    }

    return (
        <div className="App">
            <Tabs
                alignment="vertical"
                onChange={(e) => {
                    setSelectedTab(e)
                    refObject[e].current.scrollIntoView({ behaviour: "smooth", align: "top" })
                }}
                selected={selectedTab}
                value={[
                    {
                        content: <Button type='Plain' icon={<Info />}>Basic Information</Button>,
                        id: 'basic'
                    },
                    {
                        content: <Button type='Plain' icon={<Map />}>Attribute Mapping</Button>,
                        id: 'attribute'
                    },
                    {
                        content: <Button type='Plain' icon={<Image />}>Image & Video</Button>,
                        id: 'image'
                    },
                    {
                        content: <Button type='Plain' icon={<Truck />}>Shipping Information</Button>,
                        id: 'shipping'
                    },
                    {
                        content: <Button type='Plain' icon={<Box />}>Variations</Button>,
                        id: 'variations'
                    },
                ]}
            >
                <div className="wrapper">
                    <div ref={basicRef}><BasicInfo data={data && data?.data?.rows} /></div>
                    <div ref={attributeRef}><AttributeMapping data={data && data?.data?.rows} /></div>
                    <div ref={imageRef}><ImagenVideo data={data && data?.data?.rows} /></div>
                    <div ref={shippingRef}><ShippingInfo data={data && data?.data?.rows} reference={variationsRef} /></div>
                    <div ref={variationsRef}><Variations data={data && data?.data?.rows} /></div>
                </div>
            </Tabs>

        </div>
    );
}

export default EditProducts;
