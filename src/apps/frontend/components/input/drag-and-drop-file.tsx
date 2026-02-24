import { faFolderOpen, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import Flex from '../flex/flex.component';
import FormControl from '../form-control';
import Text from '../typography/text';

interface DragAndDropFileProps {
  error: string;
  fileFormat: string[];
  files: File[];
  isImageUpload?: boolean;
  onDrop: (file: File[]) => void;
  noOfFilesToUplad?: number;
}

const DragAndDropFile: React.FC<DragAndDropFileProps> = ({
  error,
  fileFormat,
  files,
  isImageUpload = false,
  onDrop,
  noOfFilesToUplad = 1,
}) => {
  const [imgPreviews, setImgPreviews] = useState<{ id: string; url: string }[]>([]);

  const {
    getRootProps, getInputProps, open, isDragActive,
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      const filesToSend = files && !(files?.length > noOfFilesToUplad)
        ? [...files, ...acceptedFiles]
        : acceptedFiles;
      onDrop(filesToSend);
      if (isImageUpload && filesToSend?.length <= noOfFilesToUplad) {
        const newPreviews = acceptedFiles?.map((file) => ({
          id: `${file.name}-${file.lastModified}`,
          url: URL.createObjectURL(file),
        }));
        setImgPreviews((prev) => [...prev, ...newPreviews]);
      } else {
        setImgPreviews([]);
      }
    },
    accept: isImageUpload
      ? {
        'application/image': fileFormat || ['.jpeg', '.png', '.jpg'],
      }
      : {
        'application/vnd.ms-excel': [],
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            [],
        'text/csv': [],
      },
  });

  useEffect(() => {
    if (!files?.length) {
      setTimeout(() => {
        open();
      }, 100);
      setImgPreviews([]);
    }
  }, []);

  const handleRemoveFile = (index: number) => {
    const updatedFiles = files?.filter((_, i) => i !== index);
    const updatedPreviews = imgPreviews?.filter((_, i) => i !== index);

    onDrop(updatedFiles);
    setImgPreviews(updatedPreviews);
  };

  return (
    <div className="size-full">
      <div className="border border-dotted border-black py-3">
        <div
          {...(getRootProps(), {
            onClick: (event) => {
              if (files?.length > 0) {
                event.preventDefault();
                event.stopPropagation();
              } else {
                open();
              }
            },
          })}
          className="flex min-h-35 w-full items-center justify-center outline-none"
        >
          <input {...getInputProps()}/>
          <Flex
            direction="column"
            tabletDirection="column"
            justifyContent="center"
            tabletJustifyContent="center"
            alignItems="center"
            tabletAlignItems="center"
            gap={1}
          >
            {!imgPreviews?.length && (
              <FontAwesomeIcon icon={faFolderOpen} size="2x" />
            )}
            {imgPreviews?.length > 0 && (
              <div className="size-full">
                <div className="flex size-full flex-wrap items-center justify-center gap-3 px-2">
                  {imgPreviews?.map((preview, index) => (
                    <div
                      className="relative h-25 w-[30%] rounded-sm border-[1px] border-grey50 pb-2"
                      key={preview.id}
                    >
                      <div className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full border-2 border-red-600 bg-red-600">
                        <FontAwesomeIcon
                          icon={faXmark}
                          className="size-full cursor-pointer text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFile(index);
                          }}
                        />
                      </div>
                      <img
                        src={preview.url}
                        alt="preview"
                        className="size-full rounded-sm object-contain p-3"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {!imgPreviews?.length && (
              <>
                <Text>
                  {isDragActive
                    ? 'Drop the files here ...'
                    : 'Drag and drop your files here'}
                </Text>
                <div className="flex w-full flex-col justify-center">
                  <Text
                    color="text-grey50"
                    font="ParagraphXSmall"
                    textAlign="center"
                  >
                    Supported file formats - {fileFormat.join(', ')}
                  </Text>
                  <Text
                    color="text-grey50"
                    font="ParagraphXSmall"
                    textAlign="center"
                  >
                    Maximum file size - 10 MB
                  </Text>
                </div>
                <FormControl error={error}></FormControl>
              </>
            )}
          </Flex>
        </div>
      </div>
      {files?.length > 0
      && files?.length < noOfFilesToUplad
      && <a onClick={() => open()} className='mt-3 cursor-pointer text-primary underline'>Add more</a>}
    </div>
  );
};

export default DragAndDropFile;
