import { Accordion, Button, Card, FlexLayout, List, TextField, TextStyles, Upload, Uploadnew } from '@cedcommerce/ounce-ui'
import { useEffect, useState } from 'react';
import { Crosshair, Eye, HelpCircle, Trash } from 'react-feather'
import { TOKEN } from '../../environment/environment';
import SortableList, { SortableItem } from 'react-easy-sort';
import { arrayMoveImmutable } from 'array-move';

interface ImageLinkType {
    url: string,
    content: string
}

function ImageComponent({ data, editedData, setEditedData }: any) {
    const [unsortedImagesLink, setUnsortedImagesLink] = useState<ImageLinkType[]>([])
    const [imagesLink, setImagesLink] = useState<ImageLinkType[]>([])
    // console.log(imagesLink, "links");
    const [toggleReorder, setToggleReorder] = useState(false);
    const [isHelpAccordianOpen, setIsHelpAccordianOpen] = useState(false);
    const [fetchImageLink, setFetchImageLink] = useState("");
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        setEditedData((prev: any) => {
            return { ...prev, imagesLink }
        })
    }, [imagesLink])

    useEffect(() => {
        const allImagesLink = data?.map((d: any) => {
            return d?.main_image ?? d?.variant_image
        })
        let allUniqueImages: any = Array.from(new Set(allImagesLink))
        allUniqueImages = allUniqueImages.map((d: any, i: number) => {
            return { url: d, caption: i }
        })
        setImagesLink(allUniqueImages);
        setUnsortedImagesLink(allUniqueImages);
    }, [data])

    const uploadImage = async (e: any) => {
        console.log(e, "test");
        const formData = new FormData()
        e.fileList.forEach((file: any) => {
            // console.log(file, "upload");
            formData.append("images[]", file)
        })
        console.log(formData, "test");

        const config = {
            "appCode": "eyJzaG9waWZ5Ijoic2hvcGlmeV9taWNoYWVsIiwibWljaGFlbCI6Im1pY2hhZWxfd29vX3Nob3BmaXkifQ ==",
            appTag: "michael",
            "Content-type": "multipart/form-data",
            Authorization: `Bearer ${TOKEN}`,
            "Ced-Source-Id": "86",
            "Ced-Source-Name": "shopify",
            "Ced-Target-Id": "93",
            "Ced-Target-Name": "michael"
        }
        const response = await fetch("https://connector-dev.demo.cedcommerce.com/home-connector/public/michaelhome/product/uploadImage", {
            method: "POST",
            body: formData,
            headers: config,
        })
        const data = await response.json();
        console.log(data, "upload");
    }

    const handleImageDelete = (link: string) => {
        setImagesLink(prev => prev.filter(d => d.url !== link))
        setUnsortedImagesLink(prev => prev.filter(d => d.url !== link))
    }

    const onSortEnd = (oldIndex: number, newIndex: number) => {
        setImagesLink((array) => arrayMoveImmutable(array, oldIndex, newIndex));
    };

    function isImgUrl(url: string) {
        const img = new Image();
        img.src = url;
        return new Promise((resolve) => {
            img.onerror = () => resolve(false);
            img.onload = () => resolve(true);
        });
    }

    return (
        <Card cardType='Bordered'>
            <FlexLayout direction='vertical' spacing='tight'>
                <FlexLayout halign='fill' valign='center' wrap='noWrap'>
                    <FlexLayout direction='vertical' valign='start' halign='center'>
                        <TextStyles fontweight='extraBold'>Images</TextStyles>
                        <TextStyles>Add images by image URLs or by uploading files</TextStyles>
                    </FlexLayout>
                    {toggleReorder ?
                        <FlexLayout spacing='tight'>
                            <Button type='Outlined' onClick={() => {
                                setImagesLink(unsortedImagesLink)
                                setToggleReorder(false)
                            }}>Cancel</Button>
                            <Button type='Outlined' onClick={() => {
                                setUnsortedImagesLink(imagesLink)
                                setToggleReorder(false)
                            }}>Apply</Button>
                        </FlexLayout>
                        :
                        <Button type='Plain' icon={<Crosshair />} onClick={() => setToggleReorder(true)}>Re-order</Button>
                    }
                </FlexLayout>
                <FlexLayout spacing='tight' valign='center'>
                    <TextField thickness='thin' placeHolder='Enter Image Url' onChange={(e) => setFetchImageLink(e)} />
                    <Button onClick={() => {
                        setFetchImageLink("");
                        isImgUrl(fetchImageLink)
                            .then(resp => {
                                if (resp) {
                                    setImagesLink((prev: any) => {
                                        return [...prev, { url: fetchImageLink, caption: Math.floor(Math.random() * 87466997).toString() }]
                                    })
                                    setErrorMessage("")
                                } else {
                                    setErrorMessage("Image URL does not exist")
                                }
                            })
                    }}>Fetch</Button>
                </FlexLayout>
                {errorMessage.trim() !== "" && <TextStyles textcolor='negative'>{errorMessage}</TextStyles>}
                {/* images reorder */}
                {!toggleReorder ?
                    <FlexLayout spacing='tight' valign='center'>
                        {imagesLink.map((imgLink: any) => {
                            return <div className="thumbnail" key={imgLink.url}>
                                <div className='thumb-options'>
                                    <a href={imgLink.url} target="_blank"><Eye color='white' /></a>
                                    <Trash color='white' onClick={() => handleImageDelete(imgLink.url)} />
                                </div>
                                <img src={imgLink.url} alt={imgLink.url} width={100} height={100} />
                            </div>
                        })}
                        <Uploadnew
                            className="avatar-uploader"
                            listType="picture-card"
                            name="Avtar"
                            uploadbutton
                            multiple
                            onChange={(e: any) => {
                                // uploadImage(e)
                            }}
                        />
                    </FlexLayout> :
                    <FlexLayout>
                        <Accordion active={isHelpAccordianOpen} boxed icon iconAlign="left" onClick={() => { setIsHelpAccordianOpen(prev => !prev) }} title="Help">
                            <TextStyles>As michaels only allows maximum 6 images, only first 6 images will be uploaded to michaels. you can always reorder your images.</TextStyles>
                            <br />
                            <TextStyles fontweight='extraBolder'>How to change image order</TextStyles>
                            <List>
                                {["Select & hold on any image.", "Drag you image to your desired location, and release.", "Click on apply to save your changes."].map((list: any) => {
                                    return <TextStyles key={list}>{list}</TextStyles>
                                })}
                            </List>
                        </Accordion>
                        <Card cardType='Bordered'>
                            <FlexLayout spacing='tight' valign="center">
                                <SortableList onSortEnd={onSortEnd}>
                                    <div style={{ display: "flex" }}>
                                        {imagesLink.map((imgLink) => (
                                            <SortableItem key={imgLink.url}>
                                                <img src={imgLink.url} alt={imgLink.url} width={100} height={100} />
                                            </SortableItem>
                                        ))}
                                    </div>
                                </SortableList>
                            </FlexLayout>
                        </Card>
                    </FlexLayout>}
            </FlexLayout>
        </Card>
    )
}

export default ImageComponent