"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import updateData, { updatePending } from "./update";
import { useRouter } from "next/navigation";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  seat: string;
  status: string;
  name: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: "seat",
    header: "Seat",
  },

  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Status
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },

    cell: ({ row }) => {
      const payment = row.original.status;
      return (
        <div>
          {payment == "Attended" ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  style={{
                    background: "#E1FCEF",
                    width: "80px",
                    display: "flex",
                    borderRadius: "7px",
                    padding: "5px 0px",
                    justifyContent: "center",
                    color: "#14804A",
                  }}
                  variant='ghost'
                  className='h-8 w-8 p-0'>
                  Arrived
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuLabel>Status</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={async () => {
                    await updateData(row.original);
                    location.reload();
                  }}>
                  Arrived
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={async () => {
                    await updatePending(row.original);
                    location.reload();
                  }}>
                  Absent
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          ) : payment === "away" ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  style={{
                    background: "#E8E8E8",

                    width: "80px",
                    display: "flex",
                    borderRadius: "7px",
                    padding: "5px 0px",
                    justifyContent: "center",
                    color: "#757575",
                  }}
                  variant='ghost'
                  className='h-8 w-8 p-0'>
                  -
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuLabel>Status</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={async () => {
                    await updateData(row.original);
                    location.reload();
                  }}>
                  Arrived
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={async () => {
                    await updatePending(row.original);
                    location.reload();
                  }}>
                  Absent
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  style={{
                    background: "#c60e0e",
                    width: "80px",
                    display: "flex",
                    borderRadius: "7px",
                    padding: "5px 0px",
                    justifyContent: "center",
                    color: "white",
                  }}
                  variant='ghost'
                  className='h-8 w-8 p-0'>
                  Absent
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuLabel>Status</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={async () => {
                    await updateData(row.original);
                    location.reload();
                  }}>
                  Arrived
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={async () => {
                    await updatePending(row.original);
                    location.reload();
                  }}>
                  Absent
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      );
    },
  },
];
