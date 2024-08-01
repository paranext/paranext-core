interface NoExtensionsFoundProps {
  message: string;
}
/**
 * This component displays a message to the user when no extensions are found in the marketplace.
 *
 * @param message The message to display.
 * @returns {JSX.Element} - Returns the message component that displays the message to the user.
 */
export default function NoExtensionsFound({ message }: NoExtensionsFoundProps) {
  return (
    <div className="pr-mb-20 pr-mt-20 pr-flex pr-items-center pr-justify-center">
      <div className="pr-w-3/4 pr-rounded-lg pr-bg-gray-100 pr-p-8 pr-text-center">
        <p className="pr-text-lg pr-text-gray-800">{message}</p>
      </div>
    </div>
  );
}
