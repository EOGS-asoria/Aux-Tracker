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
    const [newUser, setNewUser] = useState({
        name: '',
        position: '',
        account: '',
        site: '',
        status: ''
    });
    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', position: 'Developer', account: 'Account1', site: 'San Carlos Site', status: 'Active' },
        { id: 2, name: 'Jane Smith', position: 'Designer', account: 'Account2', site: 'Carcar Site', status: 'Inactive' },
        { id: 3, name: 'Alice Johnson', position: 'Product Manager', account: 'Account3', site: '3rd Site San Carlos', status: 'Active' },
        { id: 4, name: 'Bob Brown', position: 'Marketing Specialist', account: 'Account1', site: 'San Carlos Site', status: 'Active' },
        { id: 5, name: 'Charlie Davis', position: 'Sales Representative', account: 'Account2', site: 'Carcar Site', status: 'Inactive' },
        // Add more users as needed
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
        setNewUser({ name: '', position: '', account: '', site: '', status: '' });
        handleCloseModal();
    }

    function handleStatusChange(userId, newStatus) {
        setUsers(prevUsers => prevUsers.map(user =>
            user.id === userId ? { ...user, status: newStatus } : user
        ));
    }

    function clickMe(id) {
        alert(`Edit or Delete user with ID: ${id}`);
    }

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
                        Add New User
                    </Button>
                </div>
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
                            title: "Account",
                            key: "account",
                        },
                        {
                            title: "Site",
                            key: "site",
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
                            title: "Action",
                            key: "action",
                            render: (_, record) => (
                                <div className="flex space-x-4">
                                    <button onClick={() => clickMe(record.id)} className="text-blue-500 hover:underline">Edit</button>
                                    <button onClick={() => clickMe(record.id)} className="text-red-500 hover:underline">Delete</button>
                                    <button
                                        onClick={() => handleStatusChange(record.id, record.status === 'Active' ? 'Inactive' : 'Active')}
                                        className={`text-${record.status === 'Active' ? 'red' : 'green'}-500 hover:underline`}
                                    >
                                        Mark as {record.status === 'Active' ? 'Inactive' : 'Active'}
                                    </button>
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
                            type="text"
                            className="rounded-md w-full"
                            required={true}
                            value={newUser.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <Select
                            options={[
                                { value: 'Operations Manager', label: 'Operations Manager' },
                                { value: 'Account Manager', label: 'Account Manager' },
                                { value: 'Team Leader', label: 'Team Leader' },
                                { value: 'Agent', label: 'Agent' },
                            ]}
                            value={newUser.position}
                            onChange={(e) => handleChange({ target: { name: 'position', value: e.target.value } })}
                            label="Position"
                            name="position"
                            required={true}
                        />
                    </div>
                    <div className="mb-4">
                        <Select
                            options={[
                                { value: 'Account1', label: 'Account 1' },
                                { value: 'Account2', label: 'Account 2' },
                                { value: 'Account3', label: 'Account 3' },
                            ]}
                            value={newUser.account}
                            onChange={(e) => handleChange({ target: { name: 'account', value: e.target.value } })}
                            label="Account"
                            name="account"
                            required={true}
                        />
                    </div>
                    <div className="mb-4">
                        <Select
                            options={[
                                { value: 'San Carlos Site', label: 'San Carlos Site' },
                                { value: 'Carcar Site', label: 'Carcar Site' },
                                { value: '3rd Site San Carlos', label: '3rd Site San Carlos' },
                            ]}
                            value={newUser.site}
                            onChange={(e) => handleChange({ target: { name: 'site', value: e.target.value } })}
                            label="Site"
                            name="site"
                            required={true}
                        />
                    </div>
                    <div className="mb-4">
                        <Select
                            options={[
                                { value: 'Active', label: 'Active' },
                                { value: 'Inactive', label: 'Inactive' },
                            ]}
                            value={newUser.status}
                            onChange={(e) => handleChange({ target: { name: 'status', value: e.target.value } })}
                            label="Status"
                            name="status"
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
