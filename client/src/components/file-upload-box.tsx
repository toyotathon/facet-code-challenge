import React from "react";
import { FC } from "react";
import { Box } from "grommet";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";

interface FileUploadBoxProps {
  file?: File;
  onFileDrop: (file: File[]) => void;
}

export const FileUploadBox: FC<FileUploadBoxProps> = ({ file, onFileDrop }) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "text/csv",
    onDrop: onFileDrop,
  });
  const [acceptedFile] = acceptedFiles;

  return (
    <UploadBox
      justify="center"
      align="center"
      background="light-2"
      {...getRootProps()}
    >
      <input
        {...getInputProps({
          multiple: false,
        })}
      />
      {file && acceptedFile
        ? `Selected file: ${acceptedFile.name}`
        : "Drop file here, or click to select file."}
    </UploadBox>
  );
};

const UploadBox = styled(Box)`
  cursor: pointer;
  margin: 20px;
  height: 25%;
`;
