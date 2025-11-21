import { FaRegUserCircle } from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa6";

const MessageCard = ({ msg, onDelete }) => {
  return (
    <div className="card round-large white margin padding">
      {/* Header */}
      <div className="row padding-small">
        <div className="col s10">
          <h4 className="margin-bottom text-dark-gray" style={{ margin: 0 }}>
            {msg.subject}
          </h4>
        </div>

        {/* Delete Button */}
        <div className="col s2 right-align">
          <button
            className="button round-large red small"
            onClick={() => onDelete(msg._id)}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Body */}
      <p className="margin-top text-dark-gray small">{msg.message}</p>

      {/* Footer */}
      <div className="row margin-top">
        <span className="col s6 text-gray small">
          <FaRegUserCircle /> {msg.name}
        </span>
        <span className="col s6 text-gray small">
          <FaPhoneVolume /> {msg.phone}
        </span>
      </div>
    </div>
  );
};

export default MessageCard;
