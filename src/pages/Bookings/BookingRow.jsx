

const BookingRow = ({ booking, handleDelete, handleBookingConfirm }) => {
    const { customerName, _id, service, price, email, date, img, status} = booking;
   
    return (

        <tr>
            <th>
                <button onClick={() => handleDelete(_id)} className="btn btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </th>
            <td>

                <div className="avatar flex items-center gap-2">
                    <div className=" rounded  w-24 h-24">
                        <img src={img} alt="Avatar Tailwind CSS Component" />
                    </div>

                    <div className="mt-4">
                        <div className="font-bold">{customerName}</div>
                        <div className="text-sm opacity-50">{date}</div>
                    </div>
                </div>
            </td>
            <td>
                {service}
            </td>
            <td>{email}</td>
            <td>{price}</td>
            <th>
               {status === "confirm" ? <span className="font-bold text-primary">Confirmed</span>:
               <button onClick={() => handleBookingConfirm(_id)} className="btn btn-ghost btn-xs">Confirm</button>}
            </th>
        </tr>

    );
};

export default BookingRow;