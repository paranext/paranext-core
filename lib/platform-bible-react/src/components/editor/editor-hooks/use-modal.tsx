import { ReactNode, useCallback, useMemo, useState } from 'react';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/shadcn-ui/dialog';

export function useEditorModal(): [
  ReactNode | undefined,
  (title: string, showModal: (onClose: () => void) => ReactNode) => void,
] {
  const [modalContent, setModalContent] = useState<
    | {
        closeOnClickOutside: boolean;
        content: ReactNode;
        title: string;
      }
    | undefined
  >(undefined);

  const onClose = useCallback(() => {
    setModalContent(undefined);
  }, []);

  const modal = useMemo(() => {
    if (modalContent === undefined) {
      return undefined;
    }
    const { title, content } = modalContent;
    return (
      <Dialog open onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          {content}
        </DialogContent>
      </Dialog>
    );
  }, [modalContent, onClose]);

  const showModal = useCallback(
    (
      title: string,
      getContent: (onClose: () => void) => ReactNode,
      closeOnClickOutside = false,
    ) => {
      setModalContent({
        closeOnClickOutside,
        content: getContent(onClose),
        title,
      });
    },
    [onClose],
  );

  return [modal, showModal];
}
