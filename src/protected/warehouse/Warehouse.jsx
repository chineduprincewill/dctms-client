import React, { useContext, useEffect, useState } from 'react'
import PageTitle from '../../common/PageTitle'
import { PiWarehouse } from 'react-icons/pi'
import { AppContext } from '../../context/AppContext'
import { formatDate } from '../../apis/functions'
import { AiOutlineEdit, AiOutlineSearch } from 'react-icons/ai'
import { MdOutlineSend } from 'react-icons/md'
import LoadingBars from '../../common/LoadingBars'
import RecordsTable from '../../common/RecordsTable'
import { fetchAllInventory } from '../../apis/InventoriesActions'
import NewInventory from './components/forms/NewInventory'
import { BsClockHistory } from 'react-icons/bs'
import DispatchHistoryDialog from '../dispatches/components/DispatchHistoryDialog'

const Warehouse = () => {

    const { token, user, record, logout } = useContext(AppContext);
    const [addInventory, setAddInventory] = useState(false);
    const [inventories, setInventories] = useState();
    const [error, setError] = useState();
    const [fetching, setFetching] = useState(false);
    const [tool_id, setTool_id] = useState();
    const [batch_no, setBatch_no] = useState();
    const [created_at, setCreated_at] = useState();
    const [historyDialog, setHistoryDialog] = useState(false);
    const [itemname, setItemname] = useState();

    const columns = [
        {
            name: "Batch No",
            selector: (row) => row?.batch_no,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid py-2 space-y-1'>
                    <span className='text-sm'>{row?.batch_no}</span>
                </div>
            )
        },
        {
            name: "Item",
            selector: (row) => row?.name,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid'>
                    <span className='capitalize text-sm'>{row?.name}</span>
                </div>
            )
        },
        {
            name: "Qty",
            selector: (row) => row?.quantity,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid py-2 space-y-1'>
                    <span className='text-sm'>{row?.quantity} {row?.packtype}</span>
                    <span className='text-sm'>{row?.unit_quantity} pcs</span>
                </div>
            )
        },
        {
            name: "Recepient",
            selector: (row) => row?.receivedby,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid py-2 space-y-1'>
                    <span className='text-sm'>{row?.receivedby && row?.receivedby}</span>
                    <span className='text-sm'>{row?.datereceived && formatDate(row?.datereceived)}</span>
                </div>
            )
        },
        {
            name: "Remaining",
            selector: (row) => row?.dispatched,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid'>
                    <span className='text-sm'>{row?.unit_quantity - row.dispatched} pcs</span>
                </div>
            )
        },
        {
            name: "Last updated",
            selector: (row) => row?.email,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid py-2 space-y-1'>
                    <span className='text-sm'>{formatDate(row?.created_at)}</span>
                    <span className='text-xs'>{row?.email}</span>
                </div>
            )
        },
        {
            name: "",
            button: true,
            cell: (row) => (
                <div className='flex space-x-2 items-center'>
                {
                    row.dispatched > 0 &&
                        <div 
                            className='max-w-max rounded-full hover:bg-gray-200 dark:bg-gray-700 p-1 cursor-pointer'
                            onClick={() => fetchHistory(row?.tool_id, row?.batch_no, row?.created_at, row?.name)}
                        >
                            <BsClockHistory 
                                size={12}
                                title='dispatch history'
                            />
                        </div>
                }
                {
                    user && JSON.parse(user)?.groupname === 'APIN' ?
                        <AiOutlineEdit 
                            size={15} 
                            className='cursor-pointer hover:bg-gray-200 hover:rounded-md hover:p-0.5' 
                            title='Edit inventory'
                        /> :
                        <AiOutlineSearch 
                            size={15} 
                            className='cursor-pointerhover:bg-gray-200 hover:rounded-md hover:p-0.5' 
                            title='View inventory'
                        />
                }
                {
                    user && JSON.parse(user)?.role === 'store keeper' &&
                        <MdOutlineSend 
                            size={15} 
                            className={`cursor-pointer hover:bg-gray-200 hover:rounded-md hover:p-0.5`} 
                            title='dispatch inventory'
                        />
                }
                </div>
            ),
        },
    ];

    if(inventories?.status === "Token is Expired"){
        logout();
    }

    const fetchHistory = (tool_id, batch_no, created_at, itemname) => {

        setTool_id(tool_id);
        setBatch_no(batch_no);
        setCreated_at(created_at);
        setItemname(itemname)
        setHistoryDialog(true);


    }

    useEffect(() => {
        fetchAllInventory(token, setInventories, setError, setFetching)
    }, [record])

    let icon = <PiWarehouse size={20} />
    return (
        <div className='w-full m-0 p-4'>
            <div className='w-full flex justify-between items-center'>   
                <PageTitle icon={icon} />
                {
                    user && JSON.parse(user)?.groupname === 'APIN' &&
                    <button 
                        className='px-4 py-2 rounded-md bg-[#a8d13a] hover:bg-[#85a62a] text-black text-sm capitalize'
                        onClick={() => setAddInventory(true)}
                    >
                        add inventory
                    </button>
                }
            </div>
            <div className='w-full mt-8 mb-4'>
            {
                fetching ? <LoadingBars /> :
                inventories && inventories.length > 0 ? 
                    <RecordsTable columns={columns} data={inventories} /> :
                    <div className='w-full text-red-500 capitalize p-2 rounded-md bg-red-100 dark:bg-gray-700'>No inventory record found!</div>
            }
            {
                addInventory && <NewInventory setAddInventory={setAddInventory} />
            }
            {
                historyDialog && <DispatchHistoryDialog tool_id={tool_id} batch_no={batch_no} created_at={created_at} itemname={itemname} setHistoryDialog={setHistoryDialog} />
            }
            </div>
        </div>
    )
}

export default Warehouse