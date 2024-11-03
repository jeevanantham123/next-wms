"use server";

const { cookies } = require("next/headers");

export const userLogout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("token");
};
