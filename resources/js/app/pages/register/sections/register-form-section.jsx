import React, { useState } from 'react';
import Input from '@/app/_components/input';
import axios from 'axios';
import { router } from '@inertiajs/react';

export default function RegisterFormSection() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    async function handleSubmit(e) {
        e.preventDefault();
 
        try {
            const response = await axios.post('/api/register', {
                name: fullName,
                email,
                password,
                password_confirmation: confirmPassword
            });
            
            alert(response.data.message);
            router.visit('/login')
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            }
        }
    }

    return (
        <div>
            <form className="mt-6 flex flex-col gap-5" onSubmit={handleSubmit}>
                <Input
                    onChange={(e) => setFullName(e.target.value)}
                    value={fullName}
                    required={true}
                    name="text"
                    label="Enter Your Full Name"
                    type="text"
                    className="rounded-md w-full"
                    error={errors.name}
                />

                <Input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required={true}
                    name="email"
                    label="Email Address"
                    type="email"
                    className="rounded-md w-full"
                    error={errors.email}
                />

                <Input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required={true}
                    name="password"
                    label="Password"
                    type="password"
                    className="rounded-md w-full"
                    error={errors.password}
                />

                <Input
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    required={true}
                    name="confirm_password"
                    label="Confirm Password"
                    type="password"
                    className="rounded-md w-full"
                    error={errors.password_confirmation}
                />

                <button
                    type="submit"
                    className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
                >
                    Register
                </button>
            </form>
        </div>
    );
}


// import React from 'react'
// import Button from '@/app/_components/button'
// import Input from '@/app/_components/input'

// export default function RegisterFormSections() {
//     return (
//         <div>   <form className="mt-6 flex flex-col gap-5" action="#" method="POST">
//             <Input
//                 onChange={(e) => onChange(e)}
//                 value=""
//                 required={true}
//                 name="text"
//                 label="Enter Your Full Name"
//                 type="text"
//                 className="rounded-md w-full"
//             />

//             <Input
//                 onChange={(e) => onChange(e)}
//                 value=""
//                 required={true}
//                 name="email"
//                 label="Email Address"
//                 type="email"
//                 className="rounded-md w-full"
//             />


//             <Input
//                 onChange={(e) => onChange(e)}
//                 value=""
//                 required={true}
//                 name="password"
//                 label="Password"
//                 type="password"
//                 className="rounded-md w-full"
//             />

//             <Input
//                 onChange={(e) => onChange(e)}
//                 value=""
//                 required={true}
//                 name="confirm_password"
//                 label="Confirm Password"
//                 type="password"
//                 className="rounded-md w-full"
//             />

//             <button
//                 type="submit"
//                 className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
//             >
//                 Register
//             </button>
//         </form>
//         </div>
//     )
// }
