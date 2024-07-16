import { Button, Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../../..';

export default function CardExamples() {
  return (
    <>
      <Card className="sm:col-span-2">
        <CardHeader className="pb-3">Hello World</CardHeader>
      </Card>
      <Card className="sm:col-span-2">
        <CardHeader className="pb-3">
          <CardTitle>Psalms Layer-by-Layer</CardTitle>
          <CardDescription className="max-w-lg text-balance leading-relaxed flex">
            Unpacking the meaning of the Psalms for translators
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button>More information</Button>
        </CardFooter>
      </Card>
    </>
  );
}
