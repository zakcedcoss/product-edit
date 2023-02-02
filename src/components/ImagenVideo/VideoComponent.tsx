import { Button, Card, FlexLayout, TextField, TextStyles } from '@cedcommerce/ounce-ui'
import { Crosshair } from 'react-feather'

function VideoComponent() {
    return (
        <Card cardType='Bordered'>
            <FlexLayout direction='vertical' spacing='tight'>
                <FlexLayout direction='vertical' valign='start' halign='center'>
                    <TextStyles fontweight='extraBold'>Video</TextStyles>
                    <TextStyles>Add a video by video URL</TextStyles>
                </FlexLayout>
                <FlexLayout spacing='tight' valign='start' >
                    <TextField thickness='thin' placeHolder='Enter Video Url' showHelp='only valid youtube & vimeo links are allowed' />
                    <Button>Fetch</Button>
                </FlexLayout>
            </FlexLayout>
        </Card>
    )
}

export default VideoComponent