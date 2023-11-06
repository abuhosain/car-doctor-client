import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import BookingRow from "./BookingRow";
import { useNavigate } from "react-router-dom";



const Bookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();
    const url = ` https://car-doctor-server-bpwwszfl3-abu-hosains-projects.vercel.app/bookings?email=${user?.email}`;
    useEffect(() => {
        fetch(url, {
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.getItem('car-access-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if(!data.error){
                    setBookings(data)
                }else{
                    navigate("/")
                }
            })
    }, [url, navigate])

    const handleDelete = id => {
        const proceed = confirm('Are you sure want to delete')
        if (proceed) {
            fetch(` https://car-doctor-server-bpwwszfl3-abu-hosains-projects.vercel.app/bookings/${id}`, {
                method: "DELETE",
                headers: {
                    "content-type": "applications/json"
                },
                body: JSON.stringify({status:"confirm"} )
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount > 0) {
                        alert("deleted successfully")
                        const remaining = bookings.filter(booking => booking._id !== id);
                        setBookings(remaining);
                    }
                })
        }

    }
    
    const handleBookingConfirm = id => {
        fetch(` https://car-doctor-server-bpwwszfl3-abu-hosains-projects.vercel.app/bookings/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "applications/json"
            },
            body: JSON.stringify(id)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.modifiedCount > 0){
                const remaining = bookings.filter(booking => booking._id !== id);
                const updated = bookings.find(booking => booking._id == id);
                updated.status="confirm";
                const newBookings = [updated, ...remaining];
                setBookings(newBookings);
            }
        })
    }
    return (
        <div>
            <h3>Your bookings:{bookings.length}</h3>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Email</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map(booking => <BookingRow
                                 key={booking._id} 
                                 booking={booking} 
                                 handleDelete={handleDelete} 
                                 handleBookingConfirm={handleBookingConfirm} 
                                 ></BookingRow>)
                        }
                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default Bookings;