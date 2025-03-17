import { DragEventHandler, useState } from "react";
import {
  Accept,
  DropEvent,
  DropzoneOptions,
  ErrorCode,
  FileError,
  FileRejection,
  useDropzone,
} from "react-dropzone";
import { Button } from "./button";
import { Images, X } from "lucide-react";
import { getImageDimensions } from "@/utils/getImageDimensions";

interface ImageInputProps {
  imagesAccept?: string[];
  initialFile?: File;
  maxHeight?: number;
  maxWidth?: number;
  onDragEnter?: DragEventHandler<HTMLElement>;
  onDragLeave?: DragEventHandler<HTMLElement>;
  onDragOver?: DragEventHandler<HTMLElement>;
  onRemove?: (removedFile: File) => void;
}

type Props = Omit<
  DropzoneOptions,
  "accept" | "multiple" | "onDragEnter" | "onDragLeave" | "onDragOver"
> &
  ImageInputProps;

export const ImageInput = (props: Props) => {
  const {
    initialFile,
    maxHeight,
    maxWidth,
    onDrop: onDropProps,
    onError: onErrorProps,
    onDropRejected: onDropRejectedProps,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onRemove,
    imagesAccept = [],
    ...rest
  } = props;
  const accept: Accept = { "image/*": imagesAccept };
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>(
    initialFile ? [initialFile] : []
  );

  function checkIsValidResolution(
    resolution: {
      height: number;
      width: number;
    } = { height: 0, width: 0 }
  ) {
    const { height, width } = resolution;
    const isValidHeight =
      maxHeight == undefined || height <= (maxHeight as unknown as number);
    const isValidWidth =
      maxWidth == undefined || width <= (maxWidth as unknown as number);
    const isValidResolution = isValidHeight && isValidWidth;
    return isValidResolution;
  }

  const onDrop = <T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => {
    setAcceptedFiles(acceptedFiles);
    if (maxHeight == undefined && maxWidth == undefined) {
      onDropProps?.(acceptedFiles, fileRejections, event);
      return;
    }
    const image = acceptedFiles[0];
    getImageDimensions(image)
      .then((resp) => {
        const isValid = checkIsValidResolution(resp);
        if (!isValid) {
          const message = `The height of the image is greater than ${maxHeight}px or the width of the image is greater than ${maxWidth}px`;
          const fileError: FileError = {
            code: ErrorCode.FileTooLarge,
            message,
          };
          const fileRejection: FileRejection = {
            errors: [fileError],
            file: image,
          };
          onDropProps?.([], [fileRejection], event);
        } else onDropProps?.(acceptedFiles, fileRejections, event);
      })
      .catch((err) => {
        console.error("Error retrieving image dimensions", err);
      });
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept,
    onDrop,
    multiple: false,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onError: onErrorProps,
    onDropRejected: onDropRejectedProps,
    ...rest,
  });
  const displayedFile = acceptedFiles[0];
  const image = displayedFile ? URL.createObjectURL(displayedFile) : null;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { refKey, ...restInputProps } = getInputProps();
  const { disabled } = rest;

  return (
    <div className="container h-[124px] w-[124px]">
      {image ? (
        <div className="group relative">
          <img
            src={image}
            alt="Uploaded preview"
            className={`h-[124px] w-[124px] rounded-md ${
              disabled
                ? ""
                : "transition-transform duration-300 group-hover:shadow-md group-hover:scale-105"
            }`}
          />
          {!disabled && (
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-0.5 right-0.5 invisible group-hover:visible transition-transform duration-300 group-hover:scale-110"
              onClick={() => {
                setAcceptedFiles([]);
                onRemove?.(displayedFile);
              }}
            >
              <X />
            </Button>
          )}
        </div>
      ) : (
        <div
          {...getRootProps({
            className: `dropzone group h-[124px] w-[124px] flex items-center justify-center rounded-md border border-input ${
              disabled ? "" : "hover:border-ring cursor-pointer"
            }`,
          })}
        >
          <Images
            size={28}
            strokeWidth={1.25}
            className={`text-ring/70 ${
              disabled ? "" : "group-hover:text-ring"
            }`}
          />
          <input {...restInputProps} />
        </div>
      )}
    </div>
  );
};
