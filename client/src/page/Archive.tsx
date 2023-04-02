import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export function Archive() {
  const onDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
        <button
          type="button"
          className="text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800"
        >
          All categories
        </button>
        {["folder1", "folder2"].map((title) => {
          return (
            <button
              type="button"
              className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800"
            >
              {title}
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div
          {...getRootProps()}
          className="flex items-center justify-center w-full"
        >
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div
              {...getInputProps()}
              className="flex flex-col items-center justify-center pt-5 pb-6"
            >
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <>
                  <div>
                    <svg
                      aria-hidden="true"
                      className="w-10 h-10 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
                </>
              )}
            </div>
          </label>
        </div>
        {[
          "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
          "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
          "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
          "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
          "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
          "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
          "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
          "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
          "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
        ].map((src) => {
          return (
            <div>
              <img className="h-auto max-w-full rounded-lg" src={src} alt="" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
