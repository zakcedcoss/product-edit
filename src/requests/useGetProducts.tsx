import { useEffect, useState } from "react";
import { TOKEN } from "../environment/environment";

const useGetProducts = (url: string) => {
    const [data, setData] = useState<any>([])
    const [isLoading, setIsLoading] = useState(false)

    const getData = async () => {
        setIsLoading(true)
        const config = {
            "appCode": "eyJzaG9waWZ5Ijoic2hvcGlmeV9taWNoYWVsIiwibWljaGFlbCI6Im1pY2hhZWxfd29vX3Nob3BmaXkifQ ==",
            appTag: "michael",
            Authorization: `Bearer ${TOKEN}`,
            "Ced-Source-Id": "86",
            "Ced-Source-Name": "shopify",
            "Ced-Target-Id": "93",
            "Ced-Target-Name": "michael"
        }
        const response = await fetch(url, {
            headers: config
        })
        const data = await response.json();
        // console.log(data);
        setData(data)
        setIsLoading(false)
    }

    useEffect(() => {
        getData();
    }, [url])

    return { data, isLoading };
}

export default useGetProducts;