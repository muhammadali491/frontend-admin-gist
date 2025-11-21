import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletedJoin, fetchJoin } from "../features/Join/JoinSlice";
import Loading from "../components/Loading";
import NotAvailable from "../components/NotAvailable";
import { saveAs } from "file-saver";
import { deletedMessage, fetchMessage } from "../features/Message/MessageSlice";
import MessageCard from "../components/MessageCard";

const Messages = () => {
  const dispatch = useDispatch();
  const { message, status } = useSelector((state) => state.message);

  useEffect(() => {
    dispatch(fetchMessage());
  }, [dispatch]);

  // Hooks first, no conditionals
  const myMessage = message?.data?.message || [];

  if (status === "loading") return <Loading />;
  if (status === "failed") return <div>Error loading message.</div>;
  if (myMessage.length === 0) return <NotAvailable item="message" />;

  const handleDelete = (id) => {
    console.log("id to delete : ", id);
    dispatch(deletedMessage(id))
      .unwrap()
      .then(() => {
        dispatch(fetchMessage());
      })
      .catch((err) => console.error("Failed to delete message:", err));
  };

  return (
    <>
      {myMessage.map((m) => (
        <MessageCard key={m._id} msg={m} onDelete={handleDelete} />
      ))}
    </>
  );
};

export default Messages;
