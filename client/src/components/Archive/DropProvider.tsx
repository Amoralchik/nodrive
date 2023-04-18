import { Progress } from "@mantine/core";
import { RootState } from "@store/index";
import { asyncLoadFiles } from "@store/slices/files";
import { IconUpload } from "@tabler/icons-react";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";

export function DropProvider({ children }: { children: React.ReactNode }) {
  const [isUpload, setUpload] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const dispatch = useDispatch();

  const folders = useSelector(
    (state: RootState) => state.foldersReducer.folders
  );
  const selectedFolders = useSelector(
    (state: RootState) => state.foldersReducer.selected
  );

  const onDrop = useCallback(
    async (acceptedFiles: any) => {
      setUpload(true);
      const formData = new FormData();
      acceptedFiles.forEach((element: any) => {
        formData.append(`files`, element);
      });
      await axios.post(
        `folders/upload/${folders[selectedFolders]?.name}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (event) => {
            if (event.total)
              setUploadProgress(Math.round((80 * event.loaded) / event.total));
          },
        }
      );
      setUploadProgress(90);
      await asyncLoadFiles(dispatch);
      setUploadProgress(100);
      setTimeout(() => {
        setUpload(false);
      }, 500);
    },
    [folders, selectedFolders]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
  });

  return (
    <div {...getRootProps()} className="h-full">
      {isUpload && (
        <div className="my-2">
          <Progress value={uploadProgress} />
        </div>
      )}
      {isDragActive && (
        <label
          htmlFor="dropzone-file"
          className="md:h-full flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <IconUpload size="1.05rem" stroke={1.5} className="text-gray-500" />

            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              Drop the files here ...
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
        </label>
      )}
      {!isDragActive && children}
    </div>
  );
}
