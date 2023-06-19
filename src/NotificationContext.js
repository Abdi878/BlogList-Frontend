import { createContext, useReducer } from "react";

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "created":
      const createdUser = action.payload;
      return `A new blog ${createdUser.title} by ${createdUser.author} has been added`;
    case "invalid":
      return "Invalid User";
    case "like":
      return "Added Like";
    case "blank":
      return "";
    case "missing":
      return "Missing Author/Title";
    case "delete":
      const deletedUser = action.payload;
      return `${deletedUser.title} by ${deletedUser.author} has been deleted`;
    case "comment":
      return "Added Comment";
    default:
      break;
  }
};

export const NotificationProvider = ({ children }) => {
  const [notification, notifdispatch] = useReducer(notificationReducer, "");
  const blankNotif = () => {
    setTimeout(() => {
      notifdispatch({ type: "blank" });
    }, 5000);
  };

  const likeNotif = () => {
    notifdispatch({ type: "like" });
    blankNotif();
  };
  const invalidNotif = () => {
    notifdispatch({ type: "invalid" });
    blankNotif();
  };
  const createdNotif = (user) => {
    notifdispatch({ type: "created", payload: user });
    blankNotif();
  };
  const missingNotif = () => {
    notifdispatch({ type: "missing" });
    blankNotif();
  };
  const deleteNotif = (user) => {
    notifdispatch({ type: "delete", payload: user });
    blankNotif();
  };
  const commentNotif = () => {
    notifdispatch({ type: "comment" });
    blankNotif();
  };

  return (
    <NotificationContext.Provider
      value={{
        notification,
        notifdispatch,
        likeNotif,
        invalidNotif,
        createdNotif,
        blankNotif,
        missingNotif,
        deleteNotif,
        commentNotif
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
