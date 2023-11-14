import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import "../globals.css";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      seat: "D55",
      status: "pending",
      name: "mmmm",
    },
    {
      id: "728ed52f",
      seat: "D55",
      status: "pending",
      name: "mmmm",
    },
    {
      id: "728ed52f",
      seat: "D55",
      status: "pending",
      name: "mmmm",
    },
    {
      id: "728ed52f",
      seat: "D55",
      status: "pending",
      name: "amer",
    },

    {
      id: "728ed52f",
      seat: "D55",
      status: "pending",
      name: "amer",
    },

    // ...
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className=' '>
      <div className='containers'>
        <img src='/prize-logo.png' alt='prize logo' width={120} height={200} />
        <h1>Attendance List</h1>
        <img src='/agfund-logo.png' alt='prize logo' width={120} height={200} />
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
