import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';
import React, { Fragment, type PropsWithChildren } from 'react';

import Text from '../typography/text';

interface ModalProps {
  closeIcon?: boolean;
  isBorderBottomTitle?: boolean;
  isCloseOnClickOutside?: boolean;
  isOpen: boolean;
  setIsOpen?: (isOpen: boolean) => void;        
  marginTop?: number | string;
  title?: string;
  isMaxWidth?: boolean;
  maxWidth?: string;
  clearDataAndCloseModal?: () => void;
  isBoldTitle?: boolean;
  crossIconSize?: string;
}

const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  isBorderBottomTitle = false,
  children,
  closeIcon = true,
  isCloseOnClickOutside = true,
  isOpen,
  setIsOpen,
  title,
  marginTop = 4,
  isMaxWidth = false,
  maxWidth,
  clearDataAndCloseModal,
  isBoldTitle = false,
  crossIconSize = 'size-5',
}) => {
  const panelWidthClass = isMaxWidth && maxWidth ? maxWidth : 'max-w-lg';
  const bodyMarginTop =
    typeof marginTop === 'number' ? `${marginTop * 0.25}rem` : marginTop;

  const closeModal = () => {
    setIsOpen?.(false);
    clearDataAndCloseModal?.();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={isCloseOnClickOutside ? closeModal : () => {}}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className={`relative mb-[10vh] mt-[20vh] w-full ${panelWidthClass} rounded-2xl bg-white dark:bg-black border border-primary-200 dark:border-primary-900 p-6 text-left align-middle shadow-xl transition-all md:m-0`}>
                <Dialog.Title
                  as="h3"
                  className={`flex justify-between ${
                    isBorderBottomTitle && 'border-b-[1px] border-grey250'
                  } pb-1`}
                >
                  <Text font={isBoldTitle ? 'LabelMedium' : 'ParagraphMedium'} tabletFont={isBoldTitle ? 'LabelLarge' : 'ParagraphLarge'}>
                    {title}
                  </Text>
                  {closeIcon && (
                    <button
                      type="button"
                      aria-label="Close modal"
                      onClick={closeModal}
                      className="cursor-pointer justify-self-end"
                    >
                      <X className={`${crossIconSize} text-grey250`} />
                    </button>
                  )}
                </Dialog.Title>
                <div style={{ marginTop: bodyMarginTop }}>{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
