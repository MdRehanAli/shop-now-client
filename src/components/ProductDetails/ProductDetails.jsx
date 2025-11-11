import React, { use, useRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useLoaderData } from 'react-router';

const ProductDetails = () => {

    const { _id: productId } = useLoaderData();

    const bidModalRef = useRef(null)
    const { user } = use(AuthContext);

    const handleBidModalOpen = () => {
        bidModalRef.current.showModal()
    }

    const handleBidSubmit = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const bid = event.target.bid.value;

        console.log(productId, name, email, bid);

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
                                    <input type="text" name='name' className="input" defaultValue={user.displayName} />

                                    {/* email  */}
                                    <label className="label">Email</label>
                                    <input type="email" name='email' className='input' readOnly defaultValue={user.email} />

                                    {/* bid amount  */}
                                    <label className="label">Bid</label>
                                    <input type="text" name='bid' className='input' placeholder='Your Bid' />

                                    <button className="btn btn-neutral mt-4">Place your Bid</button>
                                </fieldset>
                            </form>

                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
            </div>

            {/* Bids for products */}
        </div>
    );
};

export default ProductDetails;