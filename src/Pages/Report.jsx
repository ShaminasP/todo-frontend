import { toGetCount, toGetReport } from "../API/userRequest"
import { useState, useEffect } from "react"
import Navbar from "../Components/NavBar"


const Report = () => {
    const token = window.localStorage.getItem('token')
    const [reports, setReports] = useState([])

    const fetchReport = async () => {
        const response = await toGetReport(token)

        if (response.status === 200)
            setReports(response.data)
    }
    useEffect(() => {
        fetchReport()
    }, [])
    return (
        <>
            <Navbar />
            <Counts />
            <div className="relative  md:px-52 overflow-x-auto">
                <table className="w-full  text-sm text-left  text-gray-400">
                    <thead className="text-xs  uppercase  bg-gray-700 text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 md:px-36 py-3">
                                TASK
                            </th>
                            <th scope="col" className="px-6 py-3">
                                STATUS
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report, index) => (
                            <tr key={index} className=" border-b bg-gray-800 border-gray-700">
                                <th scope="row" className="px-6 md:px-36 py-4 font-medium  whitespace-nowrap text-white">
                                    {report.task}
                                </th>
                                <td className="px-6 py-4">
                                    {report.status}
                                </td>

                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>

        </>
    )
}
export default Report

const Counts = () => {
    const [data, setData] = useState([])

    const token = window.localStorage.getItem('token')
    const fetchData = async () => {
        const response = await toGetCount(token)
        if (response?.status === 200) {
            setData(response?.data)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <section className="pt-20 pb-5 px-10 my-6 bg-gray-100 text-gray-800">
            <div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4">
                {data.map(data => (
                    <div key={data?._id} className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-gray-50 text-gray-800">

                        <div className="flex flex-col justify-center align-middle text-center">
                            <p className="text-3xl font-semibold leading-none">{data?.count}</p>
                            <p className="capitalize">{data?._id}</p>
                        </div>
                    </div>
                ))}



            </div>
        </section>
    )
}