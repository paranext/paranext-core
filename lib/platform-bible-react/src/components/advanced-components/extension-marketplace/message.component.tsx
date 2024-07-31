interface MessageProps {
  message: string;
}
/**
 * This component displays a message to the user.
 * @param message The message to display.
 * @returns {JSX.Element} - Returns the message component that displays the message to the user.
 */
export default function Message({ message }: MessageProps) {
  return (
    <div className="pr-flex pr-justify-center pr-items-center pr-mt-20 pr-mb-20">
      <div className="pr-w-3/4 pr-bg-gray-100 pr-rounded-lg pr-p-8 pr-text-center">
        <p className="pr-text-lg pr-text-gray-800">{message}</p>
      </div>
    </div>
  );
}
