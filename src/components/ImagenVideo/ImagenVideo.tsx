import { Card, FlexLayout } from "@cedcommerce/ounce-ui";
import ImageComponent from "./ImageComponent";
import VideoComponent from "./VideoComponent";

function ImagenVideo({ data }: any) {

    return (
        <Card cardType="Subdued" title="Images & Video">
            <FlexLayout spacing="tight" desktopWidth="100" childWidth="fullWidth">
                <ImageComponent data={data} />
                <VideoComponent />
            </FlexLayout>
        </Card>
    )
}

export default ImagenVideo