import type { InterestResource } from '@/utils/api/types'
import { Fragment, useMemo } from 'react'
import { Link } from 'react-router'

interface InterestsBlockProps {
    interests: InterestResource[]
}

function createInterestBlock(interests: InterestResource[]): Record<string, InterestResource[]>{
    const interestBlock: Record<string, InterestResource[]> = {}
    interests.forEach((interest) => {
        if(!interest.category) return
        if(interest.category.isCountry) return
        const block: InterestResource[] = interestBlock[interest?.category?.name] || []
        block.push(interest)
    })
    return interestBlock
}

export function InterestsBlock({interests}: InterestsBlockProps) {
    const interestsBLocks = useMemo(() => createInterestBlock(interests), [interests])
    const rowOfKeys = useMemo(() => {
        const rowOfKeys: string[][] = []
        Object.keys(interestsBLocks).forEach((name, index) => {
            if(index % 2 == 0){
                rowOfKeys.push([name])
            }else{
                rowOfKeys[rowOfKeys.length- 1].push(name)
            }
        })
        return rowOfKeys
    }, [interestsBLocks])
    return (
        <div className="friends__content">
            <h3>Интересы</h3>
            <div className="friends__interests">
                {
                    Object.keys(interestsBLocks).length === 0 ? (
                        <p>Интересы пока не выбраны</p>
                    ) : rowOfKeys.map((row, index) => (
                        
                        <div className="friends__interests-row" key = { index }>
                            {
                                row.map((name) => (
                                    <Fragment key = { name }>
                                        <div className="friends__interests-item">
                                            <h4>
                                                <img src = "" alt="" />
                                                { name }
                                            </h4>
                                        </div>
                                        <div className="friends__actions">
                                            { 
                                                interestsBLocks[name].map((interest) => (
                                                    <Link key = { interest.id } to="#">{interest.name}</Link>
                                                ))
                                            }
                                        </div>
                                    </Fragment>
                                ))
                            }
                        </div>

                    ))
                }
            </div>
        </div>
    )
}
