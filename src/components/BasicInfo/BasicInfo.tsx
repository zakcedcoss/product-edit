import { Card, FlexLayout } from '@cedcommerce/ounce-ui'
import { useEffect, useState } from 'react';
import CheckOptions from './CheckOptions'
import TagsInfo from './TagsInfo';

function BasicInfo({ data, editedData, setEditedData }: any) {
    const [basicInfoData, setBasicInfoData] = useState({})

    useEffect(() => {
        if (Object.keys(basicInfoData).length !== 0) {
            setEditedData((prev: any) => {
                return { ...prev, basicInfoData }
            })
        } else {
            const { basicInfoData, ...rest } = editedData;
            setEditedData(rest)
        }
    }, [basicInfoData])
    return (
        <Card cardType='Subdued' title="Basic Information">
            <FlexLayout direction='vertical' spacing='loose'>
                <Card cardType='Bordered'>
                    <FlexLayout spacing='tight' direction='vertical'>
                        <CheckOptions title="Product Name" row={data && data[0]} objKey="title" basicInfoData={basicInfoData} setBasicInfoData={setBasicInfoData} />
                        <CheckOptions title="Brand" row={data && data[0]} objKey="brand" basicInfoData={basicInfoData} setBasicInfoData={setBasicInfoData} />
                        <CheckOptions title="Description" row={data && data[0]} objKey="description" basicInfoData={basicInfoData} setBasicInfoData={setBasicInfoData} />
                    </FlexLayout>
                </Card>
                <Card cardType='Bordered'>
                    <TagsInfo tags={data && (data[0].edited.tags ?? data[0].tags)} basicInfoData={basicInfoData} setBasicInfoData={setBasicInfoData} />
                </Card>
            </FlexLayout>
        </Card>
    )
}

export default BasicInfo