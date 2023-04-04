import { Typography } from '@material-tailwind/react'
import React from 'react'

export default function Loading() {
    return (
        <div className='h-screen w-screen grid place-content-center'>
            <Typography className='animate-ping'>Loading...</Typography>
        </div>
    )
}
