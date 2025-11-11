import React, { use, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';

const ProductDetails = () => {

    const { _id: productId } = useLoaderData();
    const [bids, setBids] = useState([])

    const bidModalRef = useRef(null)
    const { user } = use(AuthContext);

    useEffect(() => {
        fetch(`http://localhost:5000/products/bids/${productId}`)
            .then(res => res.json())
            .then(data => {
                console.log("Bids for this products", data);
                setBids(data);
            })
    }, [productId])

    const handleBidModalOpen = () => {
        bidModalRef.current.showModal()
    }

    const handleBidSubmit = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const bid = event.target.bid.value;

        console.log(productId, name, email, bid);

        const newBid = {
            product: productId,
            buyer_name: name,
            buyer_email: email,
            buyer_image: user?.photoURL,
            bid_price: bid,
            status: 'pending'
        }

        fetch('http://localhost:5000/bids', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newBid)
        })
            .then(res => res.json())
            .then(data => {
                console.log("after placing bid", data);
                if (data.insertedId) {
                    bidModalRef.current.close();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your bid has been Placed",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    // Add the new bid to the state  and sorting.
                    newBid._id = data.insertedId;
                    const newBids = [...bids, newBid];
                    newBids.sort((a, b) => b.bid_price - a.bid_price)
                    setBids(newBids)
                }
            })

    }

    return (
        <div>
            {/* Product info  */}
            <div>
                <div>
                    <h1>Product name:</h1>
                </div>
                <div>
                    <button onClick={handleBidModalOpen} className='btn btn-primary'>I want to buy this product</button>

                    <dialog ref={bidModalRef} className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Give the best offer!</h3>
                            <p className="py-4">Offer something seller can not resist</p>

                            <form onSubmit={handleBidSubmit}>
                                <fieldset className="fieldset">
                                    <label className="label">Name</label>
                                    <input type="text" name='name' className="input" defaultValue={user?.displayName} />

                                    {/* email  */}
                                    <label className="label">Email</label>
                                    <input type="email" name='email' className='input' readOnly defaultValue={user?.email} />

                                    {/* bid amount  */}
                                    <label className="label">Bid</label>
                                    <input type="text" name='bid' className='input' placeholder='Your Bid' />

                                    <button className="btn btn-neutral mt-4">Place your Bid</button>
                                </fieldset>
                            </form>

                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn">Cancel</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
            </div>

            {/* Bids for products */}

            <div>
                <h3 className='text-3xl'>Bids for this product: <span className='text-primary'> {bids.length}</span></h3>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    SL No.
                                </th>
                                <th>Buyer Name:</th>
                                <th>Buyer Email</th>
                                <th>Bid Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                bids.map((bid, index) => <tr key={bid._id}>
                                    <th> {index + 1} </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{bid.buyer_name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {bid.buyer_email}
                                    </td>
                                    <td>{bid.bid_price}</td>
                                    <th>
                                        <button className="btn btn-ghost btn-xs">details</button>
                                    </th>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;