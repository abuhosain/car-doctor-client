import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const BookService = () => {
    const service = useLoaderData();
    const {user} = useContext(AuthContext);
    const { title, _id, price, img} = service;
    const handleBookService = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const date = form.date.value;
        const email = form.email?.value;
        const amount = form.amount.value;
        const order = {
            customerName: name,
            email,
            date,
            img,
            service: title,
            service_id: _id,
            price: amount
        }
        console.log(order)
        fetch(' https://car-doctor-server-bpwwszfl3-abu-hosains-projects.vercel.app/bookings', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(order)
        })
        .then(res => res.json())
        .then(data => {
            console.log("data", data);
            if(data.insertedId){
                alert("service added")
            }
        })
    }
    return (
        <div>
            <h2 className="text-center text-3xl">Book service:{title}</h2>


            <form onSubmit={handleBookService} className="card-body">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name="name" placeholder="name"   className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" name="email" defaultValue={user?.email} className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Date</span>
                        </label>
                        <input type="date" name="date" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Due Amount</span>
                        </label>
                        <input type="text" name="amount" defaultValue={"$" + price} className="input input-bordered" required />
                    </div>
                </div>

                <div className="form-control mt-6">
                    <input className="btn btn-primary btn-block" type="submit" value="Order Confirm" />
                </div>
            </form>
        </div>
    );
};

export default BookService;