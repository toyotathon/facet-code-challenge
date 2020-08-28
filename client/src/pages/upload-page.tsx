import React, { FC, useState, useCallback } from "react";
import { Box, Button, Text } from "grommet";
import styled from "styled-components";
import { UploadService } from "../requests/upload-service";
import { FileUploadBox } from "../components/file-upload-box";
import { Link } from "@reach/router";

interface UploadPageProps {
  path: string;
}

export const UploadPage: FC<UploadPageProps> = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [file, setFile] = useState<File>();
  const handleOnDrop = useCallback((file: File[]) => setFile(file[0]), []);
  const handleClickUploadButton = useCallback(async () => {
    if (file) {
      try {
        await UploadService.uploadFile(file);
        setSuccess(true);
        setError(false);
      } catch (e) {
        setSuccess(false);
        setError(true);
      }
    }
  }, [file]);

  return (
    <Box fill justify="center">
      <Box justify="center" align="center">
        {success && (
          <Link to="/data">
            <Text color="status-ok">
              Upload successful! Click here to see your data.
            </Text>
          </Link>
        )}
        {error && (
          <Text color="status-error">
            Upload failed, please try again.
          </Text>
        )}
      </Box>
      <FileUploadBox file={file} onFileDrop={handleOnDrop} />
      <UploadButton
        alignSelf="center"
        disabled={!file}
        label="Upload"
        onClick={handleClickUploadButton}
        primary
      />
    </Box>
  );
};

const UploadButton = styled(Button)`
  width: 200px;
`;
