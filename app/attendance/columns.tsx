"use client";
import { prisma } from "../db";
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
            <div
              style={{
                background: "#E1FCEF",
                width: "80px",
                display: "flex",
                borderRadius: "7px",
                padding: "5px 0px",
                justifyContent: "center",
                color: "#14804A",
              }}>
              Attended
            </div>
          ) : (
            <div
              style={{
                background: "#E8E8E8",
                width: "80px",
                padding: "5px 0px",
                display: "flex",
                borderRadius: "7px",
                justifyContent: "center",
                color: "#757575",
              }}>
              Pending
            </div>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const attend = row.original.id;
      const router = useRouter();
      const handleRefresh = () => {
        location.reload();
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu </span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Status</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={async () => {
                await updateData(attend);
                location.reload();
              }}>
              Attended
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                await updatePending(attend);
                location.reload();
              }}>
              Pending
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
