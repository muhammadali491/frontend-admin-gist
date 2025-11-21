import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletedJoin, fetchJoin } from "../features/Join/JoinSlice";
import Loading from "../components/Loading";
import NotAvailable from "../components/NotAvailable";
import DataTable from "react-data-table-component";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Addmissions = () => {
  const dispatch = useDispatch();
  const { join, status } = useSelector((state) => state.join);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    dispatch(fetchJoin());
  }, [dispatch]);

  // Hooks first, no conditionals
  const myjoin = join?.data?.join || [];
  const applications = myjoin;

  const filteredData = useMemo(() => {
    return myjoin.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(filterText.toLowerCase())
    );
  }, [filterText, myjoin]);

  if (status === "loading") return <Loading />;
  if (status === "failed") return <div>Error loading join.</div>;
  if (myjoin.length === 0) return <NotAvailable item="join" />;

  const columns = [
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Phone", selector: (row) => row.phone, sortable: true },
    { name: "Course", selector: (row) => row.course, sortable: true },
    { name: "Shift", selector: (row) => row.shift, sortable: true },
    { name: "Message", selector: (row) => row.message },
    {
      name: "Actions",
      cell: (row) => (
        <button
          onClick={() => handleDelete(row._id)}
          style={{
            background: "crimson",
            color: "#fff",
            border: "none",
            padding: "5px 10px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const handleDelete = (id) => {
    console.log("id to delete : ", id);
    dispatch(deletedJoin(id))
      .unwrap()
      .then(() => {
        dispatch(fetchJoin());
      })
      .catch((err) =>
        console.error("Failed to delete addmission request:", err)
      );
  };
  const exportToExcel = (data, fileName = "table") => {
    if (!Array.isArray(data) || data.length === 0) {
      console.error("Export failed: invalid or empty data.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `${fileName}.xlsx`);
  };

  return (
    <div className="section">
      <input
        type="text"
        placeholder="Search..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        style={{
          padding: "8px",
          width: "250px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          marginBottom: "10px",
        }}
      />
      <button
        onClick={() => exportToExcel(applications, "JoinApplications")}
        className="button green round margin"
      >
        Export Excel
      </button>
      <DataTable
        title="Admission Requests"
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        responsive
      />
    </div>
  );
};

export default Addmissions;
