import { FlexLayout, TextField, TextStyles } from '@cedcommerce/ounce-ui';
import { useState } from 'react'
import { Check, Edit2, RefreshCcw } from 'react-feather';

function GridEditor({ price, setPrice, barcode, setBarcode, i, objKey }: any) {
  console.log(price, barcode, "vvv");

  const [isEditing, setIsEditing] = useState(false)
  return (
    <>
      {isEditing ?
        <FlexLayout valign="center" wrap="noWrap">
          <TextField thickness="thin" value={objKey === "price" ? (price?.[i]?.now ?? 0) : (barcode?.[i]?.now ?? 0)} onChange={(e) => {
            if (objKey === "price") {
              const p = [...price];
              p[i].now = e
              setPrice(p)
            } else {
              const b = [...barcode];
              b[i].now = e
              setBarcode(b)
            }
          }} />
          <Check onClick={() => setIsEditing(false)} />
        </FlexLayout>
        : <FlexLayout spacing="tight" valign="center" wrap="noWrap">
          <TextStyles fontweight="light">{objKey === "price" ? (price?.[i]?.now ?? 0) : (barcode?.[i]?.now ?? 0)}</TextStyles>
          <Edit2 size={16} onClick={() => {
            setIsEditing(true);
            if (objKey === "price") {
              const p = [...price];
              p[i].prev = p[i].now
              setPrice(p)
            } else {
              const b = [...barcode];
              b[i].prev = b[i].now
              setBarcode(b)
            }
          }} />
          <RefreshCcw size={16} onClick={() => {
            if (objKey === "price") {
              const p = [...price];
              p[i].now = p[i].prev
              setPrice(p)
            } else {
              const b = [...barcode];
              b[i].now = b[i].prev
              setBarcode(b)
            }
          }} />
        </FlexLayout>
      }
    </>
  )
}

export default GridEditor