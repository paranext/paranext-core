import {useState} from 'react'
import {foo,bar} from './somewhere'

function TestComponent({title}: {title?: string}) {
    const [state,setState] = useState(0)
    
    return (
        <div style={{color:'red',backgroundColor:'blue'}}>
            <label>
                {title || "Test input"}
                <input type="text"/>
            </label>
        </div>
    )
}

const obj = {
    foo: 'bar',
    baz: 'qux'
}
