import React, { useState } from 'react';
import Table from '@/app/_components/table';
import Button from '@/app/_components/button';
import Modal from '@/app/_components/modal';
import Input from '@/app/_components/input';
import Select from '@/app/_components/select';

export default function UsersTableSection() {
    const [dataChecked, setDataChecked] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', position: '', year: '', status: '', assignedTickets: 0 });
    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', position: 'Developer', year: '1993', status: 'Active', assignedTickets: 5, action: 'delete' },
        { id: 2, name: 'Jane Smith', position: 'Designer', year: '1996', status: 'Inactive', assignedTickets: 2, action: 'delete' },
        { id: 3, name: 'Alice Johnson', position: 'Product Manager', year: '1988', status: 'Active', assignedTickets: 3, action: 'delete' },
        { id: 4, name: 'Bob Brown', position: 'Marketing Specialist', year: '1985', status: 'Active', assignedTickets: 4, action: 'delete' },
        { id: 5, name: 'Charlie Davis', position: 'Sales Representative', year: '1992', status: 'Inactive', assignedTickets: 1, action: 'delete' },
        { id: 6, name: 'Diana Evans', position: 'HR Manager', year: '1990', status: 'Active', assignedTickets: 6, action: 'delete' },
        { id: 7, name: 'Edward Garcia', position: 'CTO', year: '1980', status: 'Active', assignedTickets: 10, action: 'delete' },
        { id: 8, name: 'Fiona Harris', position: 'UX Designer', year: '1987', status: 'Inactive', assignedTickets: 0, action: 'delete' },
        { id: 9, name: 'George King', position: 'Data Analyst', year: '1995', status: 'Active', assignedTickets: 7, action: 'delete' },
        { id: 10, name: 'Hannah Lee', position: 'Customer Support', year: '1998', status: 'Inactive', assignedTickets: 3, action: 'delete' },
        { id: 11, name: 'Ian Mitchell', position: 'Finance Director', year: '1983', status: 'Active', assignedTickets: 8, action: 'delete' },
        { id: 12, name: 'Jasmine Nelson', position: 'Content Strategist', year: '1991', status: 'Active', assignedTickets: 4, action: 'delete' },
        { id: 13, name: 'Kevin O’Connor', position: 'Operations Manager', year: '1989', status: 'Inactive', assignedTickets: 2, action: 'delete' },
        { id: 14, name: 'Laura Perez', position: 'Product Designer', year: '1994', status: 'Active', assignedTickets: 9, action: 'delete' },
        { id: 15, name: 'Michael Quinn', position: 'Web Developer', year: '1997', status: 'Active', assignedTickets: 5, action: 'delete' },
        { id: 16, name: 'Nora Roberts', position: 'SEO Specialist', year: '1986', status: 'Inactive', assignedTickets: 1, action: 'delete' },
        { id: 17, name: 'Oliver Scott', position: 'Chief Marketing Officer', year: '1982', status: 'Active', assignedTickets: 12, action: 'delete' },
        { id: 18, name: 'Paula Thomas', position: 'Software Engineer', year: '1999', status: 'Active', assignedTickets: 6, action: 'delete' },
        { id: 19, name: 'Quincy Underwood', position: 'Business Analyst', year: '1990', status: 'Inactive', assignedTickets: 2, action: 'delete' },
        { id: 20, name: 'Rachel Vance', position: 'Administrative Assistant', year: '1988', status: 'Active', assignedTickets: 4, action: 'delete' },
        { id: 21, name: 'Steven Wright', position: 'DevOps Engineer', year: '1994', status: 'Active', assignedTickets: 7, action: 'delete' },
        { id: 22, name: 'Tina Adams', position: 'Business Development Manager', year: '1989', status: 'Inactive', assignedTickets: 3, action: 'delete' },
        { id: 23, name: 'Ursula Lewis', position: 'System Administrator', year: '1991', status: 'Active', assignedTickets: 8, action: 'delete' },
        { id: 24, name: 'Victor Martinez', position: 'Graphic Designer', year: '1995', status: 'Active', assignedTickets: 4, action: 'delete' },
        { id: 25, name: 'Wendy Cooper', position: 'Social Media Manager', year: '1992', status: 'Inactive', assignedTickets: 2, action: 'delete' }

    ]);

    function handleAddNewUserClick() {
        setIsModalOpen(true);
    }

    function handleCloseModal() {
        setIsModalOpen(false);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setNewUser(prevState => ({ ...prevState, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        const newUserData = { id: users.length + 1, ...newUser };
        setUsers(prevUsers => [...prevUsers, newUserData]);
        setNewUser({ name: '', position: '', year: '', status: '', assignedTickets: 0 });
        handleCloseModal();
    }

    function clickMe(params) {
        alert(params);
    }

    const ticketOptions = Array.from({ length: 11 }, (_, i) => ({
        value: i,
        label: i.toString()
    }));

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-700">Users</h1>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                    <Button
                        className="flex items-center justify-center"
                        loading={false}
                        type="button"
                        onClick={handleAddNewUserClick}
                    >
                        Add New Agent
                    </Button>
                </div>
                <Table
                    dataChecked={dataChecked}
                    setDataChecked={setDataChecked}
                    data={users} // Pass original users data
                    columns={[
                        {
                            title: "Name",
                            key: "name",
                            render: (text, record) => (
                                <div className="flex items-center">
                                    <img
                                        src={`https://i.pravatar.cc/40?img=${record.id}`}
                                        alt={record.name}
                                        className="h-10 w-10 rounded-full mr-3"
                                    />
                                    <span>{record.name}</span>
                                </div>
                            )
                        },
                        {
                            title: "Position",
                            key: "position",
                        },
                        {
                            title: "Year",
                            key: "year",
                        },
                        {
                            title: "Status",
                            key: "status",
                            render: (text) => (
                                <span
                                    className={`px-2 py-1 rounded-full text-sm font-semibold ${text === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                                >
                                    {text}
                                </span>
                            )
                        },
                        {
                            title: "Assigned Tickets",
                            key: "assignedTickets",
                            render: (text) => <span>{text}</span>
                        },
                        {
                            title: "Action",
                            key: "action",
                            render: (_, record) => (
                                <div className="flex space-x-4">
                                    <button onClick={() => clickMe(record.id)} className="text-blue-500 hover:underline">Edit</button>
                                    <button onClick={() => clickMe(record.id)} className="text-red-500 hover:underline">Delete</button>
                                </div>
                            )
                        }
                    ]}
                    isCheckbox={true}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>

            <Modal open={isModalOpen} setOpen={setIsModalOpen} width="sm:max-w-md top-20">
                <h2 className="text-lg font-semibold mb-4">Add New User</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Input
                            name="name"
                            label="Name"
                            type="name"
                            className="rounded-md w-full"
                            required={true}
                            value={newUser.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            name="position"
                            label="Position"
                            type="position"
                            className="rounded-md w-full"
                            required={true}
                            value={newUser.position}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            name="year"
                            label="Year"
                            type="number"
                            className="rounded-md w-full"
                            required={true}
                            value={newUser.year}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <Select
                            options={[
                                { value: 'Active', label: 'Active' },
                                { value: 'Inactive', label: 'Inactive' },
                            ]}
                            onChange={handleChange}
                            label="Status"
                            name="status"
                            required={true}
                        // value={newUser.status}
                        />
                    </div>
                    <div className="mb-4">
                        <Select
                            options={ticketOptions}
                            value={newUser.assignedTickets}
                            onChange={(e) => handleChange({ target: { name: 'assignedTickets', value: parseInt(e.target.value, 10) } })}
                            label="Number"
                            name="number"
                            required={true}
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <Button type="button" onClick={handleCloseModal} className="bg-gray-200 hover:bg-gray-300">Cancel</Button>
                        <Button type="submit" className="bg-indigo-500 text-white hover:bg-indigo-600">Add User</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
