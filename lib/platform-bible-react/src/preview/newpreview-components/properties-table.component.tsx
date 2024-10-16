export type ComponentProperty = { name: string; type: string; default: string; values: string };
export type PropertiesTableProps = { properties: ComponentProperty[] };

function th(name: string) {
  return <th className="tw-px-4 tw-py-2 tw-text-left tw-font-thin">{name}</th>;
}

function td(value: string) {
  return <td className="tw-px-4 tw-py-2">{value}</td>;
}

export default function PropertiesTable({ properties }: PropertiesTableProps) {
  return (
    <table className="tw-w-full tw-border-collapse">
      <thead>
        <tr className="tw-border-b">
          {th('Prop')}
          {th('Type')}
          {th('Default')}
          {th('Values')}
        </tr>
      </thead>
      <tbody>
        {properties.map((property: ComponentProperty) => {
          return (
            <tr className="tw-border-b">
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
