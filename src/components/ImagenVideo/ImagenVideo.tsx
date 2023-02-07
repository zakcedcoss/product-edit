import { Card, FlexLayout } from "@cedcommerce/ounce-ui";
import { useState } from "react";
import ImageComponent from "./ImageComponent";
import VideoComponent from "./VideoComponent";

function ImagenVideo({ data, editedData, setEditedData }: any) {

    return (
        <Card cardType="Subdued" title="Images & Video">
            <FlexLayout spacing="tight" desktopWidth="100" childWidth="fullWidth">
                <ImageComponent data={data} editedData={editedData} setEditedData={setEditedData} />
                <VideoComponent editedData={editedData} setEditedData={setEditedData} />
            </FlexLayout>
        </Card>
    )
}

export default ImagenVideo