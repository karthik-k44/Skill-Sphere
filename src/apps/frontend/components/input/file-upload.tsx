import { faFile } from '@fortawesome/free-regular-svg-icons';
import { faXmark, faPaperclip, faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { downloadAttachment } from '../../redux/actions';
import { useAppDispatch } from '../../redux/hook';
import { Attachment } from '../../types';
import Spinner from '../spinner/spinner';
import Text from '../typography/text';

import Input from './index';

interface FileUploadProps {
  cancelUpload?: (index?: number) => void;
  error?: string;
  isLoading?: boolean;
  isMultiple?: boolean;
  placeholder?: string;
  singleValue?: string;
  uploadAttachment?: (fileToUpload: File) => Promise<void>;
  value?: Attachment[];
}

const FileUpload: React.FC<FileUploadProps> = ({
  cancelUpload,
  error,
  isLoading = false,
  isMultiple = true,
  placeholder = 'Attachments (Optional)',
  singleValue,
  uploadAttachment,
  value,
}) => {
  const hiddenInputFileRef = React.useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const handleHiddenInputFile = () => {
    if (hiddenInputFileRef.current) {
      hiddenInputFileRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList: FileList | null = event.target.files;
    if (fileList && fileList.length > 0) {
      const selectedFile: File = fileList[0];
      uploadAttachment(selectedFile).catch(() => {});
    }
  };

  const handleDownloadAttachment = async (resourceId: number) => {
    await dispatch(downloadAttachment(resourceId?.toString()));
  };

  const handleDownload = (id: number) => {
    handleDownloadAttachment(id).catch(() => {});
  };

  return (
    <div>
      {isLoading ? (
        <div className='flex w-full items-center justify-center py-4'>
          <Spinner />
        </div>
      ) : (
        <Input
          value={''}
          placeholder={placeholder}
          readOnly
          onClick={handleHiddenInputFile}
          endEnhancer={
            <div className="-rotate-45 cursor-pointer">
              <FontAwesomeIcon icon={faPaperclip} onClick={handleHiddenInputFile}/>
            </div>
          }
        />
      )}
      {isMultiple ? (
        <div>
          {value?.length > 0
            && value?.map((attachment, index) => (
              <div className="flex flex-wrap items-center gap-2 py-2">
                <div
                  key={index}
                  className="flex items-center gap-2 rounded-md border border-grey50 p-2"
                >
                  <div className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faFile} />
                    <Text font={'LabelSmall'} color={'text-grey50'}>
                      {attachment.originalFileName}
                    </Text>
                  </div>
                  <div className="flex cursor-pointer items-center justify-center" title='Download'>
                    <FontAwesomeIcon icon={faDownload} onClick={() => handleDownload(attachment.id)} className='text-primary'/>
                  </div>
                  <div className="flex cursor-pointer items-center justify-center" title='Remove'>
                    <FontAwesomeIcon icon={faXmark} color={'red'} onClick={() => cancelUpload(index)}/>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div>
          {singleValue?.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 py-2">
              <div className="flex gap-2 rounded-md border border-grey50 p-2 ">
                <div className="flex items-center gap-1">
                  <FontAwesomeIcon icon={faFile} />
                  <Text font={'LabelSmall'} color={'text-grey50'}>
                    {singleValue}
                  </Text>
                </div>
                <div className="flex cursor-pointer items-center justify-center">
                  <FontAwesomeIcon icon={faXmark} color={'red'} onClick={() => cancelUpload()}/>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="hidden">
        <Input
          error={error}
          name="attachment"
          type="file"
          inputRef={hiddenInputFileRef}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default FileUpload;
