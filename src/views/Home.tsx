// import { Button } from "@/components/ui"

const Home = () => {
    return <div className="flex h-screen bg-gray-100">
    <div className="flex-1">
      <header className="flex items-center justify-between h-16 px-6 bg-white border-b">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold text-gray-800">Dashboard Overview</h2>
        </div>
        <div className="flex items-center space-x-4">
          {/* <Button active={true} color="indigo-600">
          button className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"> 
            Add Item
          </button> 
          </Button>*/}
        </div>
      </header>
  
      <main className="py-6 space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="p-6 bg-white rounded shadow">
            <h3 className="text-sm font-semibold text-gray-500">Total Schools</h3>
            <p className="mt-2 text-3xl font-bold text-gray-800">200</p>
          </div>
          <div className="p-6 bg-white rounded shadow">
            <h3 className="text-sm font-semibold text-gray-500">Active Schools</h3>
            <p className="mt-2 text-3xl font-bold text-gray-800">50</p>
          </div>
          <div className="p-6 bg-white rounded shadow">
            <h3 className="text-sm font-semibold text-gray-500">Deactive Schools</h3>
            <p className="mt-2 text-3xl font-bold text-gray-800">150</p>
          </div>
        </div>
  
        <div className="bg-white rounded shadow">
          <div className="p-4 border-b">
            <h3 className="text-sm font-semibold text-gray-800">List Pending Bills</h3>
          </div>
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-sm font-semibold text-gray-500">No.</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-500">Logo</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-500">School Name</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-500">Plan</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-500">Billing Cycle</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-500">Bill Date</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-500">Bill Amount(₹)</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-6 py-4 text-xs text-gray-700">1</td>
                <td className="px-6 py-4 text-xs text-gray-700"><img alt="Logo"/></td>
                <td className="px-6 py-4 text-xs text-gray-600">School Name</td>
                <td className="px-6 py-4 text-xs text-gray-600">Basic</td>
                <td className="px-6 py-4 text-xs text-gray-700">2024-09-28 - 2024-10-28</td>
                <td className="px-6 py-4 text-xs text-gray-700">2024-09-28</td>
                <td className="px-6 py-4 text-xs text-gray-700">280.54</td>
                <td className="px-2 py-4 text-xs text-white"><p className=" text-center p-2 w-full rounded bg-red-700">Unpaid</p></td>


              </tr>
              <tr className="border-b">
              <td className="px-6 py-4 text-xs text-gray-700">1</td>
                <td className="px-6 py-4 text-xs text-gray-700"><img alt="Logo"/></td>
                <td className="px-6 py-4 text-xs text-gray-600">School Name</td>
                <td className="px-6 py-4 text-xs text-gray-600">Basic</td>
                <td className="px-6 py-4 text-xs text-gray-700">2024-09-28 - 2024-10-28</td>
                <td className="px-6 py-4 text-xs text-gray-700">2024-09-28</td>
                <td className="px-6 py-4 text-xs text-gray-700">280.54</td>
                <td className="px-2 py-4 text-xs text-white"><p className=" text-center p-2 w-full rounded bg-green-700">Paid</p></td>

              </tr>
              <tr>
              <td className="px-6 py-4 text-xs text-gray-700">1</td>
                <td className="px-6 py-4 text-xs text-gray-700"><img alt="Logo"/></td>
                <td className="px-6 py-4 text-xs text-gray-600">School Name</td>
                <td className="px-6 py-4 text-xs text-gray-600">Basic</td>
                <td className="px-6 py-4 text-xs text-gray-700">2024-09-28 - 2024-10-28</td>
                <td className="px-6 py-4 text-xs text-gray-700">2024-09-28</td>
                <td className="px-6 py-4 text-xs text-gray-700">280.54</td>
                <td className="px-2 py-4 text-xs text-white"><p className=" text-center p-2 w-full rounded bg-yellow-700">Completed</p></td>

              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  </div>
  
}

export default Home
