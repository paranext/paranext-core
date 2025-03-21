interface NoExtensionsFoundProps {
  /** Optional unique identifier */
  id?: string;
  /** The message to display */
  message: string;
}
/**
 * This component displays a message to the user when no extensions are found in the marketplace.
 *
 * @param NoExtensionsFoundProps
 * @returns {JSX.Element} - Returns the message component that displays the message to the user.
 */
export function NoExtensionsFound({ id, message }: NoExtensionsFoundProps) {
  return (
    <div id={id} className="tw-mb-20 tw-mt-20 tw-flex tw-items-center tw-justify-center">
      <div className="tw-w-3/4 tw-rounded-lg tw-bg-gray-100 tw-p-8 tw-text-center">
        <p className="tw-text-lg tw-text-gray-800">{message}</p>
      </div>
    </div>
  );
}

export default NoExtensionsFound;
