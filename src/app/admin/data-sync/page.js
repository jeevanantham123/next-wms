import DataTable from "./components/data-table";

export default function Dashboard() {
  return (
    <div className="container px-0 min-h-screen mx-auto py-[40px]">
      <div className="bg-white shadow-md rounded-md w-full min-h-screen">
        <div className="flex flex-col p-[18px]">
          <div className="text-[18px] text-pt font-medium">
            Data Synchronization
          </div>
          <div className="text-[14px] mt-1 text-st">
            Keep track of User and their security ratings.
          </div>
        </div>
        <div className="bg-[#F9FAFB] text-[14px] p-[18px] text-st w-full">
          Title of date synchronisation
        </div>
        <DataTable />
      </div>
    </div>
  );
}
