import { Button, Card, FlexLayout, Radio, Tag, TextField, TextStyles, ToolTip } from '@cedcommerce/ounce-ui'
import { useEffect, useState } from 'react'
import { Info } from 'react-feather'

function TagsInfo({ tags }: any) {
    const [originalAcceptedTags, setOriginalAcceptedTags] = useState<string[]>([]);
    const [editAcceptedTags, setEditAcceptedTags] = useState<string[]>([]);
    const [unAcceptedTags, setUnAcceptedTags] = useState<string[]>([])
    const [tagVal, setTagVal] = useState(1)
    const [text, setText] = useState("")

    useEffect(() => {
        setText("");
    }, [tagVal])

    useEffect(() => {
        if (tags) {
            setUnAcceptedTags(tags.slice(-1))
            setOriginalAcceptedTags(tags.slice(0, tags.length - 1))
            setEditAcceptedTags(tags.slice(0, tags.length - 1))
        }
    }, [tags])

    return (
        <FlexLayout direction="vertical" spacing="tight" desktopWidth='100'>
            <TextStyles>Tags</TextStyles>
            <Radio checked={tagVal === 1} labelVal={`set Shopify title as Michaels tags`} onClick={() => { setTagVal(1) }} />
            <Radio checked={tagVal === 2} labelVal={`set custom as Michaels tags`} onClick={() => { setTagVal(2) }} />
            {tagVal === 2 && <FlexLayout spacing='tight' valign='center'>
                <TextField disabled={tagVal !== 2} placeHolder={text} value={text} onChange={setText} />
                <Button type='Outlined' thickness='large' onClick={() => {
                    setEditAcceptedTags((prev: any) => {
                        return [...prev, text]
                    })
                    setText("");
                }}>Add</Button>
            </FlexLayout>}
            {/*  accepted tags */}
            <FlexLayout valign='center' spacing='tight'>
                <TextStyles>Accepted Tags</TextStyles>
                <ToolTip open helpText="Maximum 10 tags are allowed, and each tag have a maxiumum 15 characters limit" popoverContainer="body" position="right" type="light">
                    <Button type='Plain' icon={<Info size={16} />} thickness="thin"></Button>
                </ToolTip>
            </FlexLayout>
            <Card cardType='Subdued'>
                <FlexLayout spacing='tight'>
                    {tagVal === 1 && originalAcceptedTags?.map((tag: any) => {
                        return <Tag key={tag}>{tag}</Tag>

                    })}
                    {tagVal === 2 && editAcceptedTags?.map((tag: any) => {
                        return <Tag key={tag} destroy={() => {
                            setEditAcceptedTags((prev: any) => {
                                return prev.filter((data: any) => data !== tag)
                            })
                        }}>{tag}</Tag>

                    })}
                </FlexLayout>
            </Card>
            {/* unaccepted tags */}
            <FlexLayout valign='center' spacing='tight'>
                <TextStyles>Un-Accepted Tags</TextStyles>
                <ToolTip open helpText="These tags are either more than 15 characters, or limit for max 10 acceptable tags has reached" popoverContainer="body" position="right" type="light">
                    <Button type='Plain' icon={<Info size={16} />} thickness="extraThin"></Button>
                </ToolTip>
            </FlexLayout>
            <Card cardType='Subdued'>
                <FlexLayout spacing='tight'>
                    {unAcceptedTags?.map((tag: any) => {
                        return <Tag key={tag}>{tag}</Tag>

                    })}
                </FlexLayout>
            </Card>
        </FlexLayout>
    )
}

export default TagsInfo