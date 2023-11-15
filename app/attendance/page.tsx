"use client";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import "../globals.css";
import { useEffect, useState } from "react";
import axios from "axios";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      seat: "D55",
      status: "Pending",
      name: "Amer Bassam Saeed Khanfar Saeed Khanfar",
    },
    {
      id: "728ed52f",
      seat: "D55",
      status: "Pending",
      name: "mmmm",
    },
    {
      id: "728ed52f",
      seat: "D55",
      status: "Attended",
      name: "mmmm",
    },
    {
      id: "728ed52f",
      seat: "D55",
      status: "Pending",
      name: "amer",
    },

    {
      id: "728ed52f",
      seat: "D55",
      status: "Attended",
      name: "amer",
    },
  ];
}

export default function DemoPage() {
  const [data, setData] = useState<any>([]);
  const getData = async () => {
    try {
      const attendance = await axios.get(
        "https://sdg-signture-default-rtdb.firebaseio.com/attendance.json",
      );
      const attendanceData = attendance.data;
      const transformedData = Object.keys(attendanceData).map((key) => {
        const item = attendanceData[key];
        return {
          id: key.slice(1), // Assuming you want to remove the '-' from the id
          seat: item.seat,
          status: item.status === "Pending" ? "Pending" : "Attended",
          name: item.name,
        };
      });
      setData(transformedData);
    } catch (error) {}
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className=' '>
      <div className='containers'>
        <img src='/Prize-logo.png' alt='prize logo' width={120} height={200} />
        <h1 className='heading'>ATTENDANCE LIST</h1>
        <img src='/Agfund-logo.png' alt='prize logo' width={120} height={200} />
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
