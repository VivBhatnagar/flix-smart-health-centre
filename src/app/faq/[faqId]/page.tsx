'use client';

import { use, useEffect, useState } from "react";
import type {FaqDetailType} from "@common/Interface/faq";
import { FaqDetail } from "@components/FaqDetail/faqDetail";
import { getFaqById } from "@lib/utils";
import { useRouter } from "next/navigation";

export default function FaqDetailsPage({params}: {params: Promise<{faqId: string}>}) {
    const {faqId} = use(params);
    const router = useRouter();
    const [faqData,setFaqData] = useState<FaqDetailType>({id:'', userId: 0, title: '', body: ''});
    
    /**
     * Fetches the faq details based on the given faqId from the faqDetail API
     * and sets the faqData state with the received data.
     * @param {string} faqId - ID of the faq to fetch details for.
     */
    const getFaqDetails = async(faqId:string) => {
        const faqData = await getFaqById(faqId)
        setFaqData(faqData);
    }
    
    useEffect(() => {
        getFaqDetails(faqId)
    }, [faqId]);

    if(!faqData.id) return <p className="flex justify-center items-center">Loading...</p>;

    return (
       <>
            <button aria-label="Back Button"
                className="bg-white border-green-200 text-primary px-4 py-2 rounded m-4 cursor-pointer hover:bg-green-100"
                onClick={() => router.back()}
            >
                ⬅ Back
            </button>
         {faqData.id && (<section className="bg-white rounded border border-green-200 backdrop-opacity-5">
         <FaqDetail key={faqData.id} faqDetail={faqData} />
         </section>)
        }
        </>)
}