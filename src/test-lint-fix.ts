// Test file for ESLint auto-fix
import {useState} from 'react'
import {foo,bar} from './somewhere'

function TestComponent() {
    const [state,setState] = useState(0)
    
    return (
        <div style={{color: 'red',backgroundColor: 'blue'}}>
            <label>
                Test input
                <input type="text"/>
            </label>
        </div>
    )
}

const obj = {
    foo: 'bar',
    baz: 'qux'
}

export default TestComponent
