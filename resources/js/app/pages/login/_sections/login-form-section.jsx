import React, { useState } from 'react';
import Input from '@/app/_components/input';
import Button from '@/app/_components/button';
import axios from 'axios';
import { Link } from '@inertiajs/react';
export default function LoginFormSection() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await axios.post('/api/login', {
                email,
                password
            });

            alert(response.data.message);
            Inertia.visit('/dashboard'); // Use Inertia to navigate to dashboard
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            }
        }
    } 

    return (

        <form className="mt-6 flex flex-col gap-5" onSubmit={handleSubmit}>
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


            <Button
                type="submit"
                className="flex items-center justify-center"
                loading={false}
            >
                Submit
            </Button>
        </form>
    );
}


// import React, { useState } from 'react';
// import Button from '@/app/_components/button'
// import Input from '@/app/_components/input'
// import { Link } from '@inertiajs/react';

// export default function LoginFormSection() {
//     function onChange(params) {



//     }
//     return (
//         <form className="mt-6 flex flex-col gap-5" action="#" method="POST">

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
//                 required={true}
//                 name="password"
//                 label="Password"
//                 type="password"
//                 className="rounded-md w-full"
//             />

//             <div className="text-right mt-2">
//                 <Link href="/forgot_password" className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">
//                     Forgot Password?
//                 </Link>
//             </div>

//             {/* <button
//                 type="submit"
//                 className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
//               >
//                 Log In
//               </button> */}

//             <Button
//                 onClick={(e) => onChange(e)}
//                 className="flex items-center justify-center"
//                 loading={false}
//                 type="submit"
//             >
//                 Submit
//             </Button>



//         </form>
//     )
// }
