const endpoint = "https://opensheet.elk.sh/1GyEIrrtCg-5Fd9IJPKUBch8zRO4pSXgxsUH4nmKpVkY/2";

export interface Pdp {
    id: string;
    __typename: string;
    slug: string;
    title: string;
    description: string;
    ogImage: {
        url: string;
    };
    components: Array<{
        __typename: string;
        id: string;
        title: string;
    }>;
}

export default async function getPdp(product: string, status: string): Promise<Pdp | null> {
    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        const pdpData = data.find((item: any) => item.slug === product && item.status === status);
        if (!pdpData) return null;

        const pdp: Pdp = {
            id: pdpData.id,
            __typename: pdpData.__typename,
            slug: pdpData.slug,
            title: pdpData.title,
            description: pdpData.description,
            ogImage: {
                url: pdpData.ogImage.url,
            },
            components: pdpData.components.map((component: any) => ({
                __typename: component.__typename,
                id: component.id,
                title: component.title,
            })),
        };

        return pdp;
    } catch (error) {
        console.error(error);
        return null;
    }
}
