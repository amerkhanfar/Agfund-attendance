"use server";
import { prisma } from "../db";

const updateData = async (id: string) => {
  try {
    await prisma.attendee.update({
      where: {
        id: id,
      },
      data: {
        status: "Attended",
      },
    });
  } catch (error) {}
};

export const updatePending = async (id: string) => {
  try {
    await prisma.attendee.update({
      where: {
        id: id,
      },
      data: {
        status: "Pending",
      },
    });
  } catch (error) {}
};

export default updateData;
