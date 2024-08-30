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
        { id: 3, name: 'Alice Johnson', position: 'Project Manager', year: '1988', status: 'Active', assignedTickets: 8, action: 'delete' },
        { id: 4, name: 'Robert Brown', position: 'QA Engineer', year: '1991', status: 'Active', assignedTickets: 3, action: 'delete' },
        { id: 5, name: 'Emily Davis', position: 'Developer', year: '1994', status: 'Active', assignedTickets: 4, action: 'delete' },
        { id: 6, name: 'Michael Wilson', position: 'UI/UX Designer', year: '1990', status: 'Inactive', assignedTickets: 1, action: 'delete' },
        { id: 7, name: 'Olivia Moore', position: 'Business Analyst', year: '1992', status: 'Active', assignedTickets: 6, action: 'delete' },
        { id: 8, name: 'William Taylor', position: 'Data Scientist', year: '1995', status: 'Active', assignedTickets: 7, action: 'delete' },
        { id: 9, name: 'Sophia Anderson', position: 'Content Strategist', year: '1989', status: 'Inactive', assignedTickets: 3, action: 'delete' },
        { id: 10, name: 'James Thomas', position: 'System Administrator', year: '1985', status: 'Active', assignedTickets: 5, action: 'delete' },
        { id: 11, name: 'Charlotte Martinez', position: 'Marketing Manager', year: '1997', status: 'Active', assignedTickets: 9, action: 'delete' },
        { id: 12, name: 'Liam Garcia', position: 'Database Administrator', year: '1990', status: 'Inactive', assignedTickets: 2, action: 'delete' },
        { id: 13, name: 'Ava Hernandez', position: 'Full Stack Developer', year: '1994', status: 'Active', assignedTickets: 6, action: 'delete' },
        { id: 14, name: 'Noah Wilson', position: 'Software Engineer', year: '1992', status: 'Active', assignedTickets: 4, action: 'delete' },
        { id: 15, name: 'Isabella Brown', position: 'Graphic Designer', year: '1993', status: 'Inactive', assignedTickets: 1, action: 'delete' },
        { id: 16, name: 'Ethan Johnson', position: 'Sales Engineer', year: '1987', status: 'Active', assignedTickets: 8, action: 'delete' },
        { id: 17, name: 'Mia Lee', position: 'Product Owner', year: '1995', status: 'Active', assignedTickets: 7, action: 'delete' },
        { id: 18, name: 'Lucas Anderson', position: 'IT Support Specialist', year: '1991', status: 'Inactive', assignedTickets: 2, action: 'delete' },
        { id: 19, name: 'Amelia Wilson', position: 'Business Development', year: '1988', status: 'Active', assignedTickets: 9, action: 'delete' },
        { id: 20, name: 'Henry Davis', position: 'Network Engineer', year: '1992', status: 'Active', assignedTickets: 5, action: 'delete' },
        { id: 21, name: 'Olivia Harris', position: 'Marketing Coordinator', year: '1993', status: 'Inactive', assignedTickets: 2, action: 'delete' },
        { id: 22, name: 'Daniel Clark', position: 'Sales Manager', year: '1991', status: 'Active', assignedTickets: 3, action: 'delete' },
        { id: 23, name: 'Ella Lewis', position: 'Business Analyst', year: '1989', status: 'Active', assignedTickets: 4, action: 'delete' },
        { id: 24, name: 'Ethan Adams', position: 'Developer', year: '1995', status: 'Inactive', assignedTickets: 1, action: 'delete' },
        { id: 25, name: 'Sophia Scott', position: 'Designer', year: '1992', status: 'Active', assignedTickets: 5, action: 'delete' },
        { id: 26, name: 'Michael Turner', position: 'Product Manager', year: '1994', status: 'Active', assignedTickets: 6, action: 'delete' },
        { id: 27, name: 'Isabella Lee', position: 'Data Analyst', year: '1996', status: 'Inactive', assignedTickets: 2, action: 'delete' },
        { id: 28, name: 'Liam Walker', position: 'UI Developer', year: '1988', status: 'Active', assignedTickets: 7, action: 'delete' },
        { id: 29, name: 'Amelia Young', position: 'Network Administrator', year: '1990', status: 'Inactive', assignedTickets: 3, action: 'delete' },
        { id: 30, name: 'James King', position: 'Content Writer', year: '1987', status: 'Active', assignedTickets: 8, action: 'delete' }
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
        // Create a new user object with an id based on the length of the current users array
        const newUserData = { id: users.length + 1, ...newUser };
        setUsers(prevUsers => [...prevUsers, newUserData]);
        setNewUser({ name: '', position: '', year: '', status: '', assignedTickets: 0 });
        handleCloseModal();
    }

    function clickMe(params) {
        alert(params);
    }
    // Define options for the Select component
    const ticketOptions = Array.from({ length: 11 }, (_, i) => ({
        value: i,
        label: i.toString()
    }));



    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-700">Users</h1>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <Button
                    className="flex items-center justify-center"
                    loading={false}
                    type={'button'}
                    onClick={handleAddNewUserClick}
                >
                    Add New User
                </Button>

                <Table
                    dataChecked={dataChecked}
                    setDataChecked={setDataChecked}
                    data={users}
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
                                    className={`px-2 py-1 rounded-full text-sm font-semibold ${text === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}
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

            {/* Modal Component */}
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

                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            name="position"
                            label="Position"
                            type="position"
                            className="rounded-md w-full"
                            required={true}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            name="year"
                            label="Year"
                            type="year"
                            className="rounded-md w-full"
                            required={true}
                        />
                    </div>
                    <div className="mb-4">

                        <Select
                            options={[
                                { value: 'Active', label: 'Active' },
                                { value: 'Inactive', label: 'Inactive' },
                            ]}
                            // value=""  
                            onChange={handleChange}
                            label="Status"
                            name="status"
                            required={true}
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
