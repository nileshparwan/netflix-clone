import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import db from '../firebase';
import './PlanScreen.css';

const PlanScreen = () => {
   const [products, setProducts] = useState([]);
   const [subcription, setSubcription] = useState(null);
   const user = useSelector(selectUser);

   useEffect(() => {
      db.collection("customers")
         .doc(user.uid)
         .collection("subscriptions")
         .get()
         .then(
            (querySnapshot) => {
               querySnapshot.forEach(async (subcription) => {
                  setSubcription({
                     role: subcription.data().role,
                     current_period_end: subcription.data().current_period_end.seconds,
                     current_period_start: subcription.data().current_period_start.seconds,
                  });
               });
            }
         );
   }, [user.uid]);

   useEffect(() => {
      /**
       * this time we use get
       * Reason => because will always remain the same [it will not change]
       * Only when there is contant change in db that we we snapshot
       */
      db
         .collection("products")
         .where("active", '==', true)
         .get()
         .then(querySnapshot => {
            const products = {};
            querySnapshot.forEach(async productDoc => {
               products[productDoc.id] = productDoc.data();
               const priceSnap = await productDoc.ref.collection("prices").get();
               priceSnap.docs.forEach(price => {
                  products[productDoc.id].prices = {
                     priceId: price.id,
                     priceData: price.data()
                  };
               });
            });
            setProducts(products);
         });
   }, []);

   const loadCheckout = async (priceId) => {
      const docRef = await db
         .collection("customers")
         .doc(user.uid)
         .collection("checkout_sessions")
         .add({
            price: priceId,
            success_url: window.location.origin,
            cancel_url: window.location.origin
         });

      docRef.onSnapshot(
         async (snap) => {
            const { error, sessionId } = snap.data();

            if (error) {
               // Show an error to your  customers and 
               // inpect your cloud function logs in the firebase console. 
               alert(`An error occured: ${error.message}`);
            }

            if (sessionId) {
               // we have a session, let's redirect to checkout. 
               //  Init Stripe

               const stripe = await loadStripe("pk_test_51IJ0YlIyFdM68iKHOl4Cpz08n73pi3lPSwj9Gz7DaJgL1h5GhZ88gKPVtJ35T5xpmbQAjQ43IHPm6p6ygLXtSlbG00l4N2RmMe");
               stripe.redirectToCheckout({ sessionId });
            }
         }
      );
   };

   return (
      <div className="planScreen">
         {
            subcription && (
               <p>Renewal Date: { new Date(subcription.current_period_end * 1000).toLocaleDateString()}</p>
            )
         }
         {
            /**
             * productId here is the keys
             * productData is the value
             */
            Object.entries(products).map(([productId, productData]) => {

               // add some logic to check if the user subcription is active. 
               const isCurrentPackage = productData.name?.toLowerCase().includes(subcription?.role);

               return (

                  <div key={productId} className={`${isCurrentPackage && "planScreen__plan--disabled"} planScreen__plan`}>
                     <div className="planScreen__info">
                        <h5>{productData.name}</h5>
                        <h6>{productData.description}</h6>
                     </div>

                     <button onClick={() => loadCheckout(productData.prices.priceId)}>
                        {isCurrentPackage ? "Current Package" : "Subscribe"}
                     </button>
                  </div>

               );

            })
         }
      </div>
   );
};

export default PlanScreen;
