import clsx from "clsx";
import { CommentItem } from "./comment-item.component";
import { CommentThreadProps } from "./comment-list.types";
import { useState } from "react";
import { formatReplacementString } from "platform-bible-utils";

export function CommentThread({
                                 comment,
                                 formatDate,
                                 localizedStrings,
                                 selected: selectedProp = false,
                               }: CommentThreadProps) {

  const [selected, setSelected] = useState(selectedProp);

  const { singleReply, multipleReplies } = {
    singleReply: localizedStrings?.['%comment_thread_single_reply%'] ?? '1 reply',
    multipleReplies: localizedStrings?.['%comment_thread_multiple_replies%'] ?? '{count} replies',
  };

  const replyCount = comment.replies?.length ?? 0;

  const handleClick = () => {
    if (replyCount > 0) {
      setSelected((prev) => !prev);
    }
  };

  return (
    <div
      role="option"
      aria-selected={selected}
      onClick={handleClick}
      className={clsx(
        "p-2 rounded-md transition-shadow",
        selected
          ? "bg-white shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]"
          : "bg-slate-50 border"
      )}>
      <CommentItem comment={comment} formatDate={formatDate} localizedStrings={localizedStrings}/>
{selected ? (
        comment.replies?.map((reply) => (
          <div key={reply.id} className="mt-2">
            <CommentItem comment={reply} formatDate={formatDate} isReply />
          </div>
        ))
      ) : replyCount > 0 ? (
        <div className="ml-4 mt-2 flex items-center text-sm text-gray-500">
          <div
            className="mr-2"
            style={{
              width: "30px",
              height: "0px",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "#CBD5E1",
              background: "#475569",
              opacity: 1,
            }}
          />
          {replyCount === 1
            ? singleReply
            : formatReplacementString(multipleReplies, {
                count: replyCount,
              })}
        </div>
      ) : null}
    </div>
  );
}
