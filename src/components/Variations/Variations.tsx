import { Button, Card, CheckBox, FlexLayout, Grid, Modal, Switcher, TextField, TextStyles, ToolTip } from "@cedcommerce/ounce-ui"
import { useEffect, useState } from "react"
import { Check, Edit2, Info, RefreshCcw } from "react-feather"

function Variations({ data }: any) {
    const dataSource = data && data?.slice(1)?.map((d: any) => {
        return {
            key: d.edited.source_product_id ?? d.source_product_id,
            variant_title: d.variant_title,
            image_url: (d.edited.main_image || d.edited.variant_image) ?? (d.main_image || d.variant_image),
            price: (d.edited.price ?? d.price),
            barcode: d.edited.barcode ?? d.barcode,
            variant_ignore: d.edited.variant_ignore ?? d.variant_ignore ?? false
        }
    })

    const [price, setPrice] = useState<{ prev: string, now: string }[]>([])
    const [barcode, setBarcode] = useState<{ prev: string, now: string }[]>([])
    const [isEditing, setIsEditing] = useState<{ price: boolean, barcode: boolean }[]>([])
    const [variantSwitcher, setVariantSwitcher] = useState<boolean[]>([]);
    const [variantIndex, setVariantIndex] = useState(-1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalBoxChecked, setIsModalBoxChecked] = useState(false);

    const columns = [
        {
            align: 'left',
            dataIndex: 'variant_title',
            key: 'variant_title',
            title: 'Color / Size / Material',
            width: 150
        },
        {
            align: 'center',
            dataIndex: 'image_url',
            key: 'image_url',
            title: 'Image',
            width: 100,
            render: (img: string) => {
                return <img src={img} alt={img} width={50} height={50} />
            }
        },
        {
            align: 'center',
            dataIndex: 'price',
            key: 'price',
            title: 'Price',
            width: 100,
            render: (pr: number, _: any, i: number) => {
                return <>
                    {isEditing[i]?.price ?
                        <FlexLayout valign="center" wrap="noWrap">
                            <TextField thickness="thin" value={price?.[i]?.now} onChange={(e) => {
                                const p = [...price];
                                p[i].now = e
                                setPrice(p)
                            }} />
                            <Check onClick={() => setIsEditing(prev => {
                                return prev.map((d: any, idx: number) => {
                                    if (i === idx) return { ...d, price: false }
                                    return d
                                })
                            })} />
                        </FlexLayout>
                        : <FlexLayout spacing="tight" valign="center" halign="center" wrap="noWrap">
                            <TextStyles fontweight="light">{price?.[i]?.now}</TextStyles>
                            <Edit2 size={16} onClick={() => {
                                setIsEditing(prev => {
                                    return prev.map((d: any, idx: number) => {
                                        if (i === idx) return { ...d, price: true }
                                        return d
                                    })
                                })
                                const p = [...price];
                                p[i].prev = p[i].now
                                setPrice(p)
                            }} />
                            <RefreshCcw size={16} onClick={() => {
                                const p = [...price];
                                p[i].now = p[i].prev
                                setPrice(p)
                            }} />
                        </FlexLayout>
                    }
                </>
            }
        },
        {
            align: 'center',
            dataIndex: 'barcode',
            key: 'barcode',
            title: 'Barcode',
            width: 100,
            render: (br: string, _: any, i: number) => {
                return <>
                    {isEditing[i]?.barcode ?
                        <FlexLayout valign="center" wrap="noWrap">
                            <TextField thickness="thin" value={barcode[i].now} onChange={(e) => {
                                const b = [...barcode];
                                b[i].now = e
                                setBarcode(b)
                            }} />
                            <Check onClick={() => setIsEditing(prev => {
                                return prev.map((d: any, idx: number) => {
                                    if (i === idx) return { ...d, barcode: false }
                                    return d
                                })
                            })} />
                        </FlexLayout>
                        : <FlexLayout spacing="tight" valign="center" halign="center" wrap="noWrap">
                            <TextStyles fontweight="light">{barcode?.[i]?.now}</TextStyles>
                            <Edit2 size={16}
                                onClick={() => {
                                    setIsEditing(prev => {
                                        return prev.map((d: any, idx: number) => {
                                            if (i === idx) return { ...d, barcode: true }
                                            return d
                                        })
                                    })
                                    const b = [...barcode];
                                    b[i].prev = b[i].now
                                    setBarcode(b)
                                }} />
                            <RefreshCcw size={16} onClick={() => {
                                const b = [...barcode];
                                b[i].now = b[i].prev
                                setBarcode(b)
                            }} />
                        </FlexLayout>
                    }
                </>
            }
        },
        {
            align: 'center',
            dataIndex: 'ignore_variant',
            key: 'ignore_variant',
            title: <FlexLayout valign="center">
                <TextStyles>Ignore Variant</TextStyles>
                <ToolTip
                    open={false}
                    helpText="Let's you select the variants that you don't want to be published on Michaels."
                    popoverContainer="body"
                    position="left" type="dark">
                    <Button icon={<Info size={16} />} type="Plain" thickness="thin" />
                </ToolTip>
            </FlexLayout>,
            width: 180,
            render: (_: any, __: any, i: number) => {
                return <FlexLayout halign="center" valign="center">
                    <Switcher checked={variantSwitcher[i]} onChange={() => {
                        setVariantIndex(i);
                        setVariantSwitcher(prev => {
                            return prev.map((d: boolean, idx: number) => {
                                if (idx === i) return !d;
                                return d;
                            })
                        })
                        if (!variantSwitcher[i]) {
                            setIsModalOpen(true);
                        }
                    }} /></FlexLayout>
            }
        },

    ]

    useEffect(() => {
        if (dataSource) {
            const allPrice = dataSource.map((d: any) => {
                return { prev: d.price, now: d.price }
            })
            setPrice(allPrice)
            const allBarcode = dataSource.map((d: any) => {
                return { prev: d.barcode, now: d.barcode }
            })
            setBarcode(allBarcode)
            const allEdited = dataSource.map((d: any) => {
                return { price: false, barcode: false }
            })
            setIsEditing(allEdited)
            const allSwitcher = dataSource.map((d: any) => {
                return d.variant_ignore
            })
            setVariantSwitcher(allSwitcher);
        }
    }, [data])

    return (
        <Card title="Variations" cardType="Subdued">
            <Grid
                columns={columns}
                dataSource={dataSource}
                scrollX={600}
            />
            <Modal
                open={isModalOpen}
                close={() => {
                    setIsModalOpen(false);
                    setVariantSwitcher(prev => {
                        return prev.map((d: boolean, idx: number) => {
                            if (idx === variantIndex) return false;
                            return d;
                        })
                    })
                }}
                heading="This variant is active on Michaels"
                modalSize="small"
                primaryAction={{
                    content: 'Confirm',
                    onClick: () => {
                        setIsModalOpen(false);
                        setVariantSwitcher(prev => {
                            return prev.map((d: boolean, idx: number) => {
                                if (idx === variantIndex) return true;
                                return d;
                            })
                        })
                    }
                }}>
                <FlexLayout spacing="tight">
                    <TextStyles>This variant is uploaded on Michaels, ignoring it might lead to the variant getting removed from the marketplace.</TextStyles>
                    <CheckBox checked={isModalBoxChecked} labelVal="Don't show again" onClick={() => setIsModalBoxChecked(prev => !prev)} />
                </FlexLayout>
            </Modal>
        </Card>
    )
}

export default Variations