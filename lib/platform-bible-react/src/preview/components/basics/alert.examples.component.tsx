import { AlertTitle } from '@mui/material';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '../../..';

export default function ExampleAlerts() {
  return (
    <>
      <Alert className="pr-max-w-64">Alert! Why do I look like a Card? 🤔</Alert>
      <Alert variant="destructive" className="pr-max-w-64">
        {/* not sure, why this is displaying black, in the sandbox it's red 🤷 */}
        <AlertCircle />
        <AlertTitle>Settings are incomplete</AlertTitle>
        <AlertDescription>
          Results from the Capitalization check may be misleading because settings are incomplete
        </AlertDescription>
      </Alert>
    </>
  );
}
