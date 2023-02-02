import { Card, FlexLayout } from '@cedcommerce/ounce-ui'
import CheckOptions from './CheckOptions'
import TagsInfo from './TagsInfo';

function BasicInfo({ data }: any) {
    return (
        <Card cardType='Subdued' title="Basic Information">
            <FlexLayout direction='vertical' spacing='loose'>
                <Card cardType='Bordered'>
                    <FlexLayout spacing='tight' direction='vertical'>
                        <CheckOptions title="Product Name" row={data && data[0]} objKey="title" />
                        <CheckOptions title="Brand" row={data && data[0]} objKey="brand" />
                        <CheckOptions title="Description" row={data && data[0]} objKey="description" />
                    </FlexLayout>
                </Card>
                <Card cardType='Bordered'>
                    <TagsInfo tags={data && (data[0].edited.tags ?? data[0].tags)} />
                </Card>
            </FlexLayout>
        </Card>
    )
}

export default BasicInfo