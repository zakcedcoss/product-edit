import { useEffect, useState } from "react"
import { Card, FlexLayout, Radio, TextField, TextStyles, Wysiwyg } from "@cedcommerce/ounce-ui";
// import ReactQuill from "react-quill";
// import 'react-quill/dist/quill.snow.css';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

function CheckOptions({ title, row, objKey, basicInfoData, setBasicInfoData }: any) {
    const [originalData, setOriginalData] = useState("");
    const [value, setValue] = useState(1)
    const [text, setText] = useState<string>("")
    const [onEditorStateChange, setOnEditorStateChange] = useState<any>();

    const getEditorValue = (val: string) => {
        const draft = htmlToDraft(
            "<React.Fragment>" + val + "</React.Fragment>"
        );
        const { contentBlocks, entityMap } = draft;
        const contentState = ContentState.createFromBlockArray(
            contentBlocks,
            entityMap
        );
        return EditorState.createWithContent(contentState);
    };

    useEffect(() => {
        if (value === 1) {
            const { [title]: _, ...rest } = basicInfoData;
            setBasicInfoData(rest);
            return;
        }
        setBasicInfoData((prev: any) => {
            return { ...prev, [title]: value === 1 ? originalData : text }
        })
    }, [value, text])


    useEffect(() => {
        if (row) {
            setText(row.edited[objKey] ?? row[objKey])
            setOriginalData(row.edited[objKey] ?? row[objKey])
            setOnEditorStateChange(getEditorValue(row.edited[objKey] ?? row[objKey]))
        }
    }, [row])

    return (
        <FlexLayout direction="vertical" spacing="tight">
            <TextStyles>{title}</TextStyles>
            <Radio checked={value === 1} labelVal={`set Shopify ${objKey} as Michaels ${objKey}`}
                onClick={() => setValue(1)}
                value={value}
            />
            <Radio checked={value === 2} labelVal={`set custom as Michaels ${objKey}`}
                onClick={() => setValue(2)}
                value={value}
            />
            {title === "Description" ?
                value === 1 ? <Card cardType="Bordered"><div dangerouslySetInnerHTML={{ __html: originalData }}></div></Card>
                    : <Wysiwyg
                        editorState={onEditorStateChange}
                        onEditorStateChange={(newState: any) => {
                            setOnEditorStateChange(newState);
                        }}
                    />
                : <Card cardType="Subdued"> <TextField disabled={value !== 2} placeHolder={text} showHelp={`${objKey} should be less than 250 characters`} value={value === 1 ? originalData : text} onChange={setText} /></Card>
            }
        </FlexLayout>
    )
}

export default CheckOptions