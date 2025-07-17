// Test file for ESLint auto-fix
import { useState } from 'react';

interface Props {
  title?: string;
}

function TestComponent({ title }: Props) {
  const [count, setCount] = useState(0);

  return (
    <div style={{ color: 'red', backgroundColor: 'blue' }}>
      <label>
        {title || 'Test input'}
        <input
          type="text"
          onChange={() => setCount(count + 1)}
          placeholder={`Changed ${count} times`}
        />
      </label>
    </div>
  );
}

export default TestComponent;
