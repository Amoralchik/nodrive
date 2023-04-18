import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface FoldersState {
  loaded: boolean;
  folders: {
    name: string;
    id: number;
  }[];
  selected: number;
}

const initialState: FoldersState = {
  loaded: true,
  folders: [],
  selected: 0,
};

export const foldersSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    openFolder: (state, { payload }: { payload: { id: number } }) => {
      state.selected = payload.id;
    },
    loadFolders: (state, { payload }) => {
      state.folders = payload;
    },
    addFolder: (state, { payload }) => {
      state.folders = [
        ...state.folders,
        {
          name: payload.name,
          id: payload.id,
        },
      ];
    },
    updateFolders: (state, { payload }) => {
      const folder = state.folders.find(({ id }) => id === payload.id);
      if (folder) folder.name = payload.name;
    },
    deleteFolders: (state, { payload }) => {
      const folderIndex = state.folders.findIndex(
        ({ id }) => id === payload.id
      );
      if (folderIndex !== -1) {
        state.folders.splice(folderIndex, 1);
      }
    },
  },
});

export const asyncLoadFolders = async (dispatch: (arg0: any) => void) => {
  try {
    const response = await axios.get("users/archive");
    if (response.data) {
      dispatch(loadFolders(response.data));
    }
  } catch (err) {
    dispatch(loadFolders([]));
  }
};

export const createFolder = async (
  dispatch: (arg0: any) => void,
  name: string
) => {
  try {
    const response = await axios.post("folders", { name });
    if (response.data) {
      dispatch(addFolder(response.data));
    }
  } catch (err) {
    console.log(err);
  }
};
export const deleteFolder = async (
  dispatch: (arg0: any) => void,
  id: number
) => {
  try {
    const response = await axios.delete(`folders/${id}`);
    if (response.status === 200) {
      dispatch(openFolder({ id: 0 }));
      dispatch(deleteFolders({ id }));
    }
  } catch (err) {
    console.log(err);
  }
};
export const updateFolder = async (
  dispatch: (arg0: any) => void,
  name: string,
  id: number
) => {
  try {
    const response = await axios.patch(`folders/${id}`, { name });
    if (response.status === 200) {
      dispatch(updateFolders({ id, name }));
    }
  } catch (err) {
    console.log(err);
  }
};

// Action creators are generated for each case reducer function
export const {
  openFolder,
  loadFolders,
  addFolder,
  updateFolders,
  deleteFolders,
} = foldersSlice.actions;

export default foldersSlice.reducer;
