import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';

const BASE_URL = import.meta.env.VITE_API_URL || '';

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, uid, email, event_id, fee } = location.state || { name:'', uid:'', email:'', event_id:'evt-2', fee: 50 };

  const [transactionId, setTransactionId] = useState('');
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleCompleteRegistration = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('uid', uid);
    formData.append('email', email);
    formData.append('event_id', event_id);
    formData.append('transaction_id', transactionId);
    if(file) formData.append('screenshot', file);

    try {
      const res = await fetch(`${BASE_URL}/api/register`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setSubmitting(false);

      if (data.success) {
        alert("Registration Successful!");
        navigate('/');
      } else {
        alert("Error: " + data.message);
      }
    } catch (err) {
      setSubmitting(false);
      alert("Registration failed due to network error.");
    }
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen pb-24 md:pb-0">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-12 space-y-4">
          <div className="inline-block bg-secondary-container text-on-secondary-container px-4 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold">
            Final Step
          </div>
          <h2 className="text-[3.5rem] leading-none font-extrabold tracking-tight text-primary uppercase italic">
            Secure Your Slot
          </h2>
          <p className="text-on-surface-variant max-w-md text-lg">
            Complete your transaction of ₹{fee} to enter the arena. Your entry will be verified by admins.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5 space-y-8">
            <div className="bg-surface-container-low rounded-lg p-6 space-y-4">
              <h3 className="font-bold uppercase tracking-widest text-xs text-primary">Instructions</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="bg-primary-container text-on-primary-container w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">1</div>
                  <p className="text-sm font-medium text-on-surface">Open payment app and send ₹{fee}</p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-primary-container text-on-primary-container w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">2</div>
                  <p className="text-sm font-medium text-on-surface">Copy Transaction ID</p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-primary-container text-on-primary-container w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">3</div>
                  <p className="text-sm font-medium text-on-surface">Upload a screenshot below</p>
                </li>
              </ul>
              
              <div className="mt-8 p-4 bg-surface-container-highest rounded-2xl flex flex-col items-center">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=suyognikam903@okaxis&pn=Suyog" alt="UPI QR Code" className="w-64 max-w-full rounded-2xl shadow-xl border-4 border-primary/20 aspect-square object-contain bg-white mb-4" />
                <p className="text-xs font-bold tracking-widest uppercase text-primary">Scan with UPI App</p>
                <p className="text-[10px] text-on-surface-variant font-medium mt-1">suyognikam903@okaxis</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 bg-surface-container-lowest rounded-xl p-8 shadow-lg space-y-8">
            <form onSubmit={handleCompleteRegistration} className="space-y-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-primary font-bold text-sm uppercase tracking-widest px-1">Transaction ID</label>
                  <input 
                    required value={transactionId} onChange={e=>setTransactionId(e.target.value)}
                    className="w-full bg-surface-container-high border-none rounded-lg px-6 py-5 font-semibold outline-none" 
                    placeholder="Enter TXN ID" type="text" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-primary font-bold text-sm uppercase tracking-widest px-1">Proof of Payment</label>
                  <input type="file" required onChange={e=>setFile(e.target.files[0])} className="w-full bg-surface-container-high border-none rounded-lg p-4 font-semibold outline-none" />
                </div>
              </div>

              <div>
                <Button variant="secondary" fullWidth className="py-6 text-xl" type="submit" disabled={submitting}>
                  {submitting ? 'Processing...' : 'Complete Registration'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
