export type ComponentProperty = { name: string; type: string; default: string; values: string };
export type PropertiesTableProps = { properties: ComponentProperty[] };

function th(name: string) {
  return <th className="pr-px-4 pr-py-2 pr-text-left pr-font-thin">{name}</th>;
}

function td(value: string) {
  return <td className="pr-px-4 pr-py-2">{value}</td>;
}

export default function PropertiesTable({ properties }: PropertiesTableProps) {
  return (
    <table className="pr-w-full pr-border-collapse">
      <thead>
        <tr className="pr-border-b">
          {th('Prop')}
          {th('Type')}
          {th('Default')}
          {th('Values')}
        </tr>
      </thead>
      <tbody>
        {properties.map((property: ComponentProperty) => {
          return (
            <tr className="pr-border-b">
              {td(property.name)}
              {td(property.type)}
              {td(property.default)}
              {td(property.values)}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
