import { Machine } from "xstate";

export const galleryMachine = Machine({
  initial: "start",
  states: {
    start: {
      on: {
        SEARCH: "loading"
      }
    },
    loading: {
      onEntry: ["search"],
      on: {
        SEARCH_SUCCESS: {
          gallery: {
            actions: ["updateItems"]
          }
        },
        SEARCH_FAILURE: "error",
        CANCEL_SEARCH: "gallery"
      }
    },
    error: {
      on: {
        SEARCH: "loading"
      }
    },
    gallery: {
      on: {
        SEARCH: "loading",
        SELECT_PHOTO: "photo",
        CLEAR_GALLERY: {
          start: {
            actions: ["clearState"]
          }
        }
      }
    },
    photo: {
      onEntry: ["setPhoto"],
      on: {
        EXIT_PHOTO: "gallery"
      }
    }
  }
});
