"use server";

export async function getStatusList() {
  try {
    const apiData = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/soap-api`,
      {
        cache: "no-store",
      }
    );
    return await apiData.json();
  } catch (error) {
    return null;
  }
}
