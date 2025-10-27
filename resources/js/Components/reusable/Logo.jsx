import { cn } from '@/lib/utils'
import React from 'react'

const Logo = ({ className }) => {
    return (
        <h1
            className={cn(
                'text-3xl font-bold  font-mono text-primary',
                className
            )}
            >
            Codepermp
        </h1>

    )
}

export default Logo