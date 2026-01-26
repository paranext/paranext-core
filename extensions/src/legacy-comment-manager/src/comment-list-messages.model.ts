/** Tell the comment list to scroll to a specific thread */
type CommentListMessageSelectThread = {
  method: 'selectThread';
  threadId: string;
};

/** Message types that can be received from the Comment List web view controller */
export type CommentListWebViewMessage = CommentListMessageSelectThread;
