import { AlertTitle } from '@mui/material';
import { AlertCircle, Terminal } from 'lucide-react';
import { Alert, AlertDescription } from '../../..';

export default function ExampleAlerts() {
  return (
    <>
      <p>Note: Spacing and font sizes seems to differ from what is on the shadcn website 🤷</p>
      <br />
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>You can add components to your app using the cli.</AlertDescription>
      </Alert>
      <Alert variant="destructive" className="pr-max-w-64">
        <AlertCircle />
        <AlertTitle>Settings are incomplete</AlertTitle>
        <AlertDescription>
          Results from the Capitalization check may be misleading because settings are incomplete
        </AlertDescription>
      </Alert>
      <Alert className="pr-max-w-64">
        <AlertDescription>
          Alert! With only AlertDescription, this looks like a Card 🤔
        </AlertDescription>
      </Alert>
      <Alert className="pr-max-w-64">
        Alert! With nothing else in it, this looks like a Card 🤔
      </Alert>
    </>
  );
}
