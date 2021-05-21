import React, { useEffect } from "react";
import { Table, Tag, Button, Space } from "antd";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { apiURL } from "../config";
import { setLoanData, setUserData } from "../redux/action";
import "antd/dist/antd.css";
import styles from "../css/Dashboard.module.css";
const Dashboard = () => {
  const history = useHistory();
  const columns = [
    {
      title: "Applicant Name",
      dataIndex: "applicantName",
      key: "applicantName",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
      key: "contactNumber",
    },
    {
      title: "Amount",
      dataIndex: "loanAmount",
      key: "loanAmount",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (startDate) => {
        return <div>{startDate.split("T")[0]}</div>;
      },
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (endDate) => {
        return <div>{endDate.split("T")[0]}</div>;
      },
    },
    {
      title: "EMI",
      dataIndex: "emi",
      key: "emi",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status) => {
        let color;
        if (status === "Pending") {
          color = "blue";
        } else if (status === "Approved") {
          color = "green";
        } else {
          color = "red";
        }
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
  ];

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      fetch(`${apiURL}/getUserLoans`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json().then((body) => ({ status: res.status, body })))
        .then((res) => {
          dispatch(setLoanData(res.body));
          history.push(`/dashboard`);
        })
        .catch((err) => console.log(err));
    } else {
      history.push(`/login`);
    }
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    dispatch(
      setUserData({
        email: "",
        name: "",
        loans: [],
      })
    );
    dispatch(setLoanData([]));
  };

  const handleApprove = (data) => {
    const token = window.localStorage.getItem("token");
    fetch(`${apiURL}/approveLoan/?_id=${data._id}&&type=${data.type}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((res) => {
        const temp = state.loans.map((loan) => {
          if (loan._id === res._id) return res;
          return loan;
        });
        console.log(res, temp);
        dispatch(setLoanData(temp));
      });
  };

  return (
    <div>
      {state.admin ? (
        <Table
          bordered
          className={styles.table}
          columns={[
            ...columns,
            {
              title: "Action",
              key: "action",
              render: (record) => {
                console.log(record);
                return (
                  <div className={styles.actions}>
                    <Button
                      disabled={record.status !== "Pending"}
                      onClick={() => handleApprove({ loan: record, _id: record._id, type: "Approve" })}
                    >
                      Approve
                    </Button>
                    <Button
                      disabled={record.status !== "Pending"}
                      danger
                      onClick={() => handleApprove({ loan: record, _id: record._id, type: "Reject" })}
                    >
                      Reject
                    </Button>
                  </div>
                );
              },
            },
          ]}
          dataSource={state.loans}
        />
      ) : (
        <Table bordered className={styles.table} columns={columns} dataSource={state.loans} />
      )}
      <div className={styles.btn}>
        {!state.admin ? (
          <Link to="/applyForLoan">
            <Button className={styles.btn1} type="primary">
              Apply for a Loan
            </Button>
          </Link>
        ) : null}
        <Link to="/login">
          <Button className={styles.btn1} type="primary" danger onClick={handleLogOut}>
            Log Out
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
