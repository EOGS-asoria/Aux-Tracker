import Button from '@/app/_components/button';
import Input from '@/app/_components/input';
import React, { useState } from 'react';

export default function ViewProfileSections() {
    const [profileImage, setProfileImage] = useState(null);
    const [username, setUsername] = useState('John Doe');
    const [email, setEmail] = useState('johndoe@example.com');
    const [password, setPassword] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    // Toggle visibility after the component mounts
    React.useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setProfileImage(URL.createObjectURL(file));
    };

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        alert('Profile updated successfully!');
        // Logic for updating profile
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        alert('Password updated successfully!');
        // Logic for changing password
    };

    return (
        <div
            className={`max-w-2xl mx-auto p-4 transition-transform duration-700 ease-in-out ${isVisible ? 'translate-x-0' : '-translate-x-full'
                }`}
        >
            <h2 className="text-2xl font-semibold mb-4">Profile Settings</h2>

            <div className="bg-white shadow rounded-lg p-4 mb-6">
                <h3 className="text-lg font-medium mb-4">Profile Picture</h3>
                <div className="flex items-center space-x-4">
                    <img
                        src={profileImage || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
                        alt="Profile"
                        className="h-16 w-16 rounded-full object-cover"
                    />
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                </div>
            </div>

            <form onSubmit={handleProfileUpdate} className="bg-white shadow rounded-lg p-4 mb-6">
                <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                <div className="mb-4">
                    <Input
                        name="username"
                        label="Username"
                        type="text"
                        className="rounded-md w-full"
                        required={true}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <Input
                        name="email"
                        label="Email"
                        type="email"
                        className="rounded-md w-full"
                        required={true}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <Button
                    className="flex items-center justify-center"
                    loading={false}
                    type={'submit'}
                >
                    Update Profile
                </Button>
            </form>

            <form onSubmit={handlePasswordChange} className="bg-white shadow rounded-lg p-4">
                <h3 className="text-lg font-medium mb-4">Change Password</h3>
                <div className="mb-4">
                    <Input
                        name="new_password"
                        label="New Password"
                        type="password"
                        className="rounded-md w-full"
                        required={true}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <Button
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                    loading={false}
                    type={'submit'}
                >
                    Change Password
                </Button>
            </form>
        </div>
    );
}
