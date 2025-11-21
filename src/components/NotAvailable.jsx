const NotAvailable = ({ item }) => {
  return (
    <div className="section ">
      <h3>
        No {item} <span>Available </span>
      </h3>
      <p>Please check back later or contact support for assistance.</p>
    </div>
  );
};

export default NotAvailable;
