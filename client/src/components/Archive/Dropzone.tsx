import { RootState } from "@store/index";
import { asyncLoadFiles } from "@store/slices/files";
import { IconUpload } from "@tabler/icons-react";
import axios from "axios";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";

export function Dropzone() {
  const dispatch = useDispatch();
  const folders = useSelector(
    (state: RootState) => state.foldersReducer.folders
  );
  const selectedFolders = useSelector(
    (state: RootState) => state.foldersReducer.selected
  );

  const onDrop = useCallback(
    async (acceptedFiles: any) => {
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
        }
      );
      await asyncLoadFiles(dispatch);
    },
    [folders, selectedFolders]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noDrag: true,
    noClick: false,
  });

  return (
    <div {...getRootProps()} className="h-full">
      <label
        htmlFor="dropzone-file"
        className="md:min-h-full flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 px-2"
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
          <IconUpload size="1.05rem" stroke={1.5} className="text-gray-500" />

          <p className="text-sm text-gray-500">
            Click here to upload your files
          </p>
        </div>
      </label>
    </div>
  );
}
