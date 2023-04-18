import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface FilesState {
  loaded: boolean;
  files: {
    folderId: number;
    id: number;
    content: string;
    name: string;
    codeName: string;
    size: number;
    createdAt: string;
    updatedAt: string;
    type: string;
    mimeType: string;
  }[];
}

const initialState: FilesState = {
  loaded: false,
  files: [],
};

export const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    uploadFiles: (state, { payload }) => {
      state.files = payload;
    },
    deleteFileReducer: (state, { payload }: { payload: number }) => {
      const index = state.files?.findIndex(({ id }) => id === payload);
      if (index >= 0) {
        state.files?.splice(index, 1);
      }
    },
    updateFileReducer: (
      state,
      {
        payload: { fileId, name },
      }: { payload: { fileId: number; name: string } }
    ) => {
      const index = state.files?.find(({ id }) => id === fileId);
      if (index) index.name = name;
    },
  },
});

export const asyncLoadFiles = async (dispatch: (arg: any) => void) => {
  try {
    const response = await axios.get("files/all");
    if (response.data) {
      dispatch(uploadFiles(response.data));
    }
  } catch (err) {
    return err;
  }
};

export const deleteFile = async (dispatch: (arg: any) => void, id: number) => {
  try {
    const response = await axios.delete(`Files/${id}`);
    if (response.status === 200) {
      dispatch(deleteFileReducer(id));
      return response.status;
    }
  } catch (err) {
    console.log(err);
  }
};
export const updateFile = async (
  dispatch: (arg: any) => void,
  name: string,
  id: number
) => {
  try {
    const response = await axios.patch(`files/${id}`, { name });
    if (response.status === 200) {
      dispatch(updateFileReducer({ fileId: id, name }));
    }
  } catch (err) {
    console.log(err);
  }
};

// Action creators are generated for each case reducer function
export const { deleteFileReducer, updateFileReducer, uploadFiles } =
  filesSlice.actions;

export default filesSlice.reducer;
