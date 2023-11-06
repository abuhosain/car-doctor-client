import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";

 

const Services = () => {
    const [services, setServices] = useState([]);
    useEffect(() => {
        fetch(' https://car-doctor-server-bpwwszfl3-abu-hosains-projects.vercel.app/services')
        .then(res => res.json())
        .then(data => setServices(data))
    }, [])
    return (
        <div className="my-6">
            <div className="text-center mt-4">
                <h3 className="text-3xl text-orange-300">Services</h3>
                <h2 className="text-5xl font-bold">Our Services Area</h2>
                <p>the majority have suffered alteration in some form, by injected humour, or randomised words which do not look even slightly believable. </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-5">
                {
                    services.map(service => <ServiceCard service={service} key={service.service_id}></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;