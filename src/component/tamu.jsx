'use client'

import { useSearchParams } from "next/navigation"

export default function Tamu() {
    const searchParams = useSearchParams();
    const tamu = searchParams.get('tamu');

    return(
        <p className='font-great-vibes text-[#ae8f7a] md:text-5xl text-4xl my-3'>{tamu || "Tamu Undangan"}</p>
    )
}