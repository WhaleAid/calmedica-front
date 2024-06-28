"use client"
import { AnimatedTree } from 'react-tree-graph';

export default function mindmap() {

    const data = {
        name: 'Parent',
        children: [
            {
                name: 'Child One',
                children: [
                    {
                        name: 'Grandchild One'
                    },
                    {
                        name: 'Grandchild Two'
                    }
                ]
            },
            {
                name: 'Child Two',
                children: [
                    {
                        name: 'Grandchild Three',
                        children: [
                            {
                                name: 'Great Grandchild One'
                            },
                            {
                                name: 'Great Grandchild Two'
                            }
                        ]
                    }
                ]
            }
        ]
    }

    return (
        <div className='flex'>
            <h1>Mindmap</h1>
            <div className='m-auto overflow-auto w-full'>
                <AnimatedTree
                    data={data}
                    height={800}
                    width={1000}
                    textProps={{ y: -40, x: -30 }}
                    className='overflow-x-visible'
                />
            </div>
        </div>
    )
}