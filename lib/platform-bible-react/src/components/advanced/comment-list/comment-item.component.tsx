import clsx from "clsx";
import { CommentItemProps } from "./comment-list.types";
import { formatReplacementString } from "platform-bible-utils";
import MarkdownRenderer from "../extension-marketplace/markdown-renderer.component";

export function CommentItem({
                                 comment,
                                 formatDate,
                                 isReply = false,
                                 localizedStrings
                               }: CommentItemProps) {

  const displayDate = formatDate
    ? formatDate(comment.date)
    : comment.date.toLocaleDateString();

  const userLabel = !isReply && comment.assignedUser
    ? formatReplacementString(localizedStrings?.['%comment_assigned_to%']
      ?? 'Assigned to {assignedUser}', {
      assignedUser: comment.assignedUser,
      })
    : comment.user;

  return (
    <div
      className={clsx(
        "p-2 rounded-md",
        isReply ? "ml-4 bg-slate-50 text-sm" : "bg-white shadow-sm"
      )}
    >
      <div className="flex items-center gap-2">
        <strong className="text-gray-900">{userLabel}</strong>
        <span className="text-xs text-gray-500">{displayDate}</span>
      </div>
      <div className="mt-1 text-gray-700">
        <MarkdownRenderer markdown={comment.contents} />
      </div>
    </div>
  );
}
