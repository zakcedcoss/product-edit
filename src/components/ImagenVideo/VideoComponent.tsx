import { Button, Card, CopyClipboard, FlexLayout, TextField, TextStyles } from '@cedcommerce/ounce-ui'
import { useEffect, useState } from 'react'
import { Crosshair, Trash } from 'react-feather'

function VideoComponent({ editedData, setEditedData }: any) {
    const [videoUrl, setVideoUrl] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isUrl, setIsUrl] = useState(false);
    function isValidVideoUrl(url: string) {
        try {
            return Boolean(new URL(url));
        }
        catch (e) {
            setIsUrl(false);
            return false;
        }
    }

    // remove this condition if using toast notification
    if (errorMessage !== "") {
        setTimeout(() => setErrorMessage(""), 1500)
    }

    useEffect(() => {
        if (!isValidVideoUrl(videoUrl)) {
            const { videoUrl, ...rest } = editedData;
            setEditedData(rest);
            return;
        }
        setEditedData((prev: any) => {
            return { ...prev, videoUrl }
        })
    }, [videoUrl])
    return (
        <Card cardType='Bordered'>
            <FlexLayout direction='vertical' spacing='tight'>
                <FlexLayout direction='vertical' valign='start' halign='center'>
                    <TextStyles fontweight='extraBold'>Video</TextStyles>
                    <TextStyles>Add a video by video URL</TextStyles>
                </FlexLayout>
                {!isUrl ?
                    <>
                        <FlexLayout spacing='tight' valign='start' >
                            <TextField thickness='thin' placeHolder='Enter Video Url' showHelp='only valid youtube & vimeo links are allowed' onChange={setVideoUrl} />
                            <Button onClick={() => {
                                if (!isValidVideoUrl(videoUrl)) {
                                    setErrorMessage("Enter valid video url");
                                    setIsUrl(false);
                                } else {
                                    setErrorMessage("")
                                    setIsUrl(true);
                                }
                            }}>Fetch</Button>
                        </FlexLayout>
                        {errorMessage.trim() !== "" && <TextStyles textcolor='negative'>{errorMessage}</TextStyles>}
                    </>
                    : <>
                        <FlexLayout valign='center' spacing='tight'>
                            <TextStyles>URL: {videoUrl}</TextStyles>
                            <Trash onClick={() => {
                                setIsUrl(false)
                                setVideoUrl("")
                            }} />
                            <CopyClipboard value={videoUrl} />
                        </FlexLayout>
                        <iframe src={videoUrl} width={350} height={200}></iframe>
                    </>}
            </FlexLayout>
        </Card>
    )
}

export default VideoComponent