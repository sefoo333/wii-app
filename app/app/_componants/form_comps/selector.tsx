import React from 'react'
import Question from './question'
import Rate from './rate'

function Selector(props: any) {
    return (
        <div>
            {props.kind === "que" ? (
                <Question kind={props.kind} id={props.id} name={props.name} />
            ) : (
                <Rate kind={props.kind} id={props.id} name={props.name} />
            )}
        </div>
    )
}

export default Selector
