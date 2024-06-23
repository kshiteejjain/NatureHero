import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import Header from "../../components/Header/Header";
import { firestore } from '../../utils/Firebase';
import { collection, query, getDocs } from "firebase/firestore";

import './Admin.css';

type Props = {
    id?: string,
    email?: string,
    phone?: number,
    termsChecked?: boolean,
    timeStamp?: string,
    paymentDetails?: any
};

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [users, setUsers] = useState<Props[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [userDetails, setUserDetails] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        const fetchUsers = async () => {
            const db = firestore;
            const usersCollection = collection(db, 'AtalBotanicalUsers');
            const q = query(usersCollection);
            const querySnapshot = await getDocs(q);
            const usersData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUsers(usersData);
        };

        fetchUsers();
    }, []);

    const handleSearchTermChange = (event: any) => {
        setSearchTerm(event.target.value);
    };

    const filteredUsers = users.filter((user) =>
        user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setIsLoading(true)
        if (userDetails?.email === 'admin@atalbotanicalgarden.com' && userDetails?.password === 'atal@jaiHo!001**') {
            setIsAdmin(true)
            setIsLoading(false)
        }else{
           alert('Invalid username and password');
           setIsLoading(false)
           return
        }
    };

    return (
        <>
            <Header />
            {isLoading && <Loader />}
            <div className="dashboard-wrapper">
                {isAdmin ?
                    <><h1>Dashboard</h1><div className="table-wrapper">
                        <div className="table-headers">
                            <h2>User Details [{users?.length}]</h2>
                            <div>Search: <input type="search" value={searchTerm} onChange={handleSearchTermChange} /></div>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <td>User Id</td>
                                    <td>Email</td>
                                    <td>Phone</td>
                                    <td>Terms Checked</td>
                                    <td>Registered Date</td>
                                    <td>Payment Id</td>
                                    <td>Payment</td>
                                    <td>Payment Status</td>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers
                                    .filter(user => user?.email !== 'admin@atalbotanicalgarden.com')
                                    .map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.email}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.termsChecked ? 'Yes' : 'No'}</td>
                                            <td>{user?.timeStamp?.split('T')[0]?.split('-').reverse().join('-')}</td>
                                            <td>{user.paymentDetails?.payload?.payment?.entity?.id}</td>
                                            <td>{user.paymentDetails?.payload?.payment?.entity?.fee}</td>
                                            <td>{user.paymentDetails?.payload?.payment?.entity?.status === 'captured' ? 'Paid' : 'Not Paid'}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div></>
                    :
                    <div className="signup-form">
                        <h2>Admin Login</h2>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <label htmlFor='email'>Email</label>
                                <input
                                    type="email"
                                    value={userDetails.email}
                                    className="form-control"
                                    onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='password'>Password</label>
                                <input
                                    type="password"
                                    value={userDetails.password}
                                    className="form-control"
                                    onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                                    required
                                />
                            </div>

                            <button type="submit" className="primary-btn">Submit</button>
                        </form>
                    </div>
                }
            </div>
        </>
    )
}

export default Dashboard;
