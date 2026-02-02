
// import { useEffect, useState } from "react";
// import axios from "axios";

// const AdminPage = () => {
//   const token = localStorage.getItem("token");

//   // ================= STATES =================
//   const [users, setUsers] = useState([]);
//   const [investments, setInvestments] = useState([]);
//   const [withdrawals, setWithdrawals] = useState([]);
//   const [wallets, setWallets] = useState([]);

//   // Manual credit
//   const [username, setUsername] = useState("");
//   const [amount, setAmount] = useState("");
//   const [description, setDescription] = useState("");

//   useEffect(() => {
//     fetchUsers();
//     fetchInvestments();
//     fetchWithdrawals();
//     fetchWallets();
//   }, []);

//   const headers = {
//     Authorization: `Bearer ${token}`
//   };

//   // ================= API CALLS =================

//   const fetchUsers = async () => {
//     const res = await axios.get(
//       "https://api.localnairainvest.com/admin/users",
//       { headers }
//     );
//     setUsers(res.data);
//   };

//   const fetchInvestments = async () => {
//     const res = await axios.get(
//       "https://api.localnairainvest.com/admin/investments",
//       { headers }
//     );
//     setInvestments(res.data);
//   };

//   const fetchWithdrawals = async () => {
//     const res = await axios.get(
//       "https://api.localnairainvest.com/admin/withdrawals",
//       { headers }
//     );
//     setWithdrawals(res.data);
//   };

//   const fetchWallets = async () => {
//     const res = await axios.get(
//       "https://api.localnairainvest.com/admin/wallets",
//       { headers }
//     );
//     setWallets(res.data);
//   };

//   const manualCredit = async () => {
//     if (!username || !amount) {
//       alert("Username and amount required");
//       return;
//     }

//     await axios.post(
//       "https://api.localnairainvest.com/admin/credit",
//       { username, amount: Number(amount), description },
//       { headers }
//     );

//     alert("Credit added successfully");
//     setUsername("");
//     setAmount("");
//     setDescription("");
//     fetchUsers();
//   };

//   // ================= WITHDRAW ACTIONS =================

//   const approveWithdrawal = async (id) => {
//     await axios.post(
//       `https://api.localnairainvest.com/admin/withdraw/approve/${id}`,
//       {},
//       { headers }
//     );
//     fetchWithdrawals();
//     fetchUsers();
//   };

//   const rejectWithdrawal = async (id) => {
//     await axios.post(
//       `https://api.localnairainvest.com/admin/withdraw/reject/${id}`,
//       {},
//       { headers }
//     );
//     fetchWithdrawals();
//   };

//   const daysRemaining = (maturityDate) => {
//     const diff = new Date(maturityDate) - new Date();
//     return Math.ceil(diff / (1000 * 60 * 60 * 24));
//   };

//   const sendReminder = async (username) => {
//   if (!window.confirm(`Send reminder to ${username}?`)) return;

//   try {
//     await axios.post(
//   "https://api.localnairainvest.com/remind",
//   { username },
//   { headers }
//        );


//     alert("Reminder sent successfully");
//   } catch (err) {
//     alert("Failed to send reminder");
//   }
// };


//   // ================= UI =================

//   return (
//     <div className="p-6 space-y-12">
//       <h1 className="text-3xl font-bold">Admin Dashboard</h1>

//       {/* ================= MANUAL CREDIT ================= */}
//       <section className="border p-4 rounded">
//         <h2 className="text-xl font-semibold mb-3">Manual Credit</h2>

//         <div className="flex flex-wrap gap-2">
//           <input
//             className="border p-2"
//             placeholder="Username"
//             value={username}
//             onChange={e => setUsername(e.target.value)}
//           />

//           <input
//             className="border p-2"
//             placeholder="Amount"
//             type="number"
//             value={amount}
//             onChange={e => setAmount(e.target.value)}
//           />

//           <input
//             className="border p-2"
//             placeholder="Description"
//             value={description}
//             onChange={e => setDescription(e.target.value)}
//           />

//           <button
//             onClick={manualCredit}
//             className="bg-black text-white px-4 py-2 rounded"
//           >
//             Credit User
//           </button>
//         </div>
//       </section>

//       {/* ================= USERS ================= */}
//       <section>
//         <h2 className="text-xl font-semibold mb-3">Users Overview</h2>

//         <table className="w-full border">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border p-2">Username</th>
//               <th className="border p-2">Email</th>
//               <th className="border p-2">Balance</th>
//               <th className="border p-2">Credits</th>
//               <th className="border p-2">Debits</th>
//               <th className="border p-2">Action</th>

//             </tr>
//           </thead>
//           <tbody>
//             {users.map(u => (
//              <tr key={u.username}>
//   <td className="border p-2">{u.username}</td>
//   <td className="border p-2">{u.email}</td>
//   <td className="border p-2">₦{u.balance}</td>
//   <td className="border p-2">₦{u.total_credits}</td>
//   <td className="border p-2">₦{u.total_debits}</td>

//   <td className="border p-2">
//     <button
//       onClick={() => sendReminder(u.username)}
//       className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
//     >
//       Send Reminder
//     </button>
//   </td>
// </tr>

//             ))}
//           </tbody>
//         </table>
//       </section>

//       {/* ================= INVESTMENTS ================= */}
//       <section>
//         <h2 className="text-xl font-semibold mb-3">Investments & Maturity</h2>

//         <table className="w-full border">
//           <thead className="bg-indigo-100">
//             <tr>
//               <th className="border p-2">User</th>
//               <th className="border p-2">Amount</th>
//               <th className="border p-2">Days</th>
//               <th className="border p-2">Return</th>
//               <th className="border p-2">Status</th>
//               <th className="border p-2">Days Left</th>
//             </tr>
//           </thead>
//           <tbody>
//             {investments.map(inv => {
//               const remaining = daysRemaining(inv.maturity_date);
//               return (
//                 <tr key={inv._id}>
//                   <td className="border p-2">{inv.user}</td>
//                   <td className="border p-2">₦{inv.amount}</td>
//                   <td className="border p-2">{inv.days}</td>
//                   <td className="border p-2">₦{inv.expected_return}</td>
//                   <td className="border p-2">{inv.status}</td>
//                   <td className="border p-2">{remaining > 0 ? remaining : 0}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </section>

//       {/* ================= WITHDRAWALS ================= */}
//       <section>
//         <h2 className="text-xl font-semibold mb-3">Withdrawal Requests</h2>

//         <table className="w-full border">
//           <thead className="bg-red-100">
//             <tr>
//               <th className="border p-2">User</th>
//               <th className="border p-2">Amount</th>
//               <th className="border p-2">Status</th>
//               <th className="border p-2">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {withdrawals.map(w => (
//               <tr key={w._id}>
//                 <td className="border p-2">{w.user_id}</td>
//                 <td className="border p-2">₦{w.amount}</td>
//                 <td className="border p-2">{w.status}</td>
//                 <td className="border p-2 space-x-2">
//                   {w.status === "pending" && (
//                     <>
//                       <button
//                         onClick={() => approveWithdrawal(w._id)}
//                         className="bg-green-600 text-white px-3 py-1 rounded"
//                       >
//                         Approve
//                       </button>
//                       <button
//                         onClick={() => rejectWithdrawal(w._id)}
//                         className="bg-red-600 text-white px-3 py-1 rounded"
//                       >
//                         Reject
//                       </button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </section>

//       {/* ================= WALLETS ================= */}
//       <section>
//         <h2 className="text-xl font-semibold mb-3">User Wallets</h2>

//         <table className="w-full border">
//           <thead className="bg-green-100">
//             <tr>
//               <th className="border p-2">User</th>
//               <th className="border p-2">Bank</th>
//               <th className="border p-2">Account Name</th>
//               <th className="border p-2">Account Number</th>
//             </tr>
//           </thead>
//           <tbody>
//             {wallets.map(w => (
//               <tr key={w._id}>
//                 <td className="border p-2">{w.username}</td>
//                 <td className="border p-2">{w.bank_name}</td>
//                 <td className="border p-2">{w.account_name}</td>
//                 <td className="border p-2">{w.account_number}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </section>
//     </div>
//   );
// };

// export default AdminPage;

import { useEffect, useState } from "react";
import axios from "axios";

const AdminPage = () => {
  const token = localStorage.getItem("token");

  // ================= STATES =================
  const [users, setUsers] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [wallets, setWallets] = useState([]);

  // Manual credit
  const [username, setUsername] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const headers = {
    Authorization: `Bearer ${token}`
  };

  // ================= API CALLS =================
 const fetchUsers = async () => {
  try {
    const res = await axios.get(
      "https://api.localnairainvest.com/admin/users",
      { headers }
    );

    console.log("ADMIN USERS RESPONSE:", res.data); // ✅ HERE

    setUsers(res.data);
  } catch (err) {
    console.error("Failed to fetch users:", err.response?.data || err.message);
  }
};


  const fetchInvestments = async () => {
    try {
      const res = await axios.get(
        "https://api.localnairainvest.com/admin/investments",
        { headers }
      );
      setInvestments(res.data);
    } catch (err) {
      console.error("Failed to fetch investments:", err.response?.data || err.message);
    }
  };

  const fetchWithdrawals = async () => {
    try {
      const res = await axios.get(
        "https://api.localnairainvest.com/admin/withdrawals",
        { headers }
      );
      setWithdrawals(res.data);
    } catch (err) {
      console.error("Failed to fetch withdrawals:", err.response?.data || err.message);
    }
  };

  const fetchWallets = async () => {
    try {
      const res = await axios.get(
        "https://api.localnairainvest.com/admin/wallets",
        { headers }
      );
      setWallets(res.data);
    } catch (err) {
      console.error("Failed to fetch wallets:", err.response?.data || err.message);
    }
  };

  // ================= EFFECT =================
  useEffect(() => {
    fetchUsers();
    fetchInvestments();
    fetchWithdrawals();
    fetchWallets();
  }, []);

  // ================= ACTIONS =================
  const manualCredit = async () => {
    if (!username || !amount) {
      alert("Username and amount required");
      return;
    }

    try {
      await axios.post(
        "https://api.localnairainvest.com/admin/credit",
        { username, amount: Number(amount), description },
        { headers }
      );
      alert("Credit added successfully");
      setUsername("");
      setAmount("");
      setDescription("");
      fetchUsers();
    } catch (err) {
      alert("Failed to add credit");
      console.error(err);
    }
  };

  const approveWithdrawal = async (id) => {
    try {
      await axios.post(
        `https://api.localnairainvest.com/admin/withdraw/approve/${id}`,
        {},
        { headers }
      );
      fetchWithdrawals();
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const rejectWithdrawal = async (id) => {
    try {
      await axios.post(
        `https://api.localnairainvest.com/admin/withdraw/reject/${id}`,
        {},
        { headers }
      );
      fetchWithdrawals();
    } catch (err) {
      console.error(err);
    }
  };

  const sendReminder = async (username) => {
    if (!window.confirm(`Send reminder to ${username}?`)) return;

    try {
      await axios.post(
        "https://api.localnairainvest.com/remind",
        { username },
        { headers }
      );
      alert("Reminder sent successfully");
    } catch (err) {
      alert("Failed to send reminder");
      console.error(err);
    }
  };

  const daysRemaining = (maturityDate) => {
    const diff = new Date(maturityDate) - new Date();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  // ================= UI =================
  return (
    <div className="p-6 space-y-12">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* ================= MANUAL CREDIT ================= */}
      <section className="border p-4 rounded">
        <h2 className="text-xl font-semibold mb-3">Manual Credit</h2>
        <div className="flex flex-wrap gap-2">
          <input
            className="border p-2"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            className="border p-2"
            placeholder="Amount"
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
          <input
            className="border p-2"
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <button
            onClick={manualCredit}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Credit User
          </button>
        </div>
      </section>

     {/* ================= USERS OVERVIEW WITH PHONE ================= */}
<section>
  <h2 className="text-xl font-semibold mb-3">Users Overview</h2>
  <table className="w-full border">
    <thead className="bg-gray-100">
      <tr>
        <th className="border p-2">Username</th>
        <th className="border p-2">Email</th>
        <th className="border p-2">Phone</th>       {/* ✅ Added */}
        <th className="border p-2">Balance</th>
        <th className="border p-2">Credits</th>
        <th className="border p-2">Debits</th>
        <th className="border p-2">Role</th>        {/* Changed from Action to Role */}
        <th className="border p-2">Action</th>      {/* Optional buttons */}
      </tr>
    </thead>
    <tbody>
      {users.map(u => (
        <tr key={u.username}>
          <td className="border p-2">{u.username}</td>
          <td className="border p-2">{u.email}</td>
          <td className="border p-2">{u.phone || "N/A"}</td> {/* ✅ Display phone */}
          <td className="border p-2">₦{Number(u.balance).toLocaleString()}</td>
          <td className="border p-2">₦{Number(u.total_credits).toLocaleString()}</td>
          <td className="border p-2">₦{Number(u.total_debits).toLocaleString()}</td>
          <td className="border p-2">{u.is_admin ? "Admin" : "User"}</td>
          <td className="border p-2">
            <button
              onClick={() => sendReminder(u.username)}
              className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
            >
              Send Reminder
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</section>


      {/* ================= INVESTMENTS ================= */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Investments & Maturity</h2>
        <table className="w-full border">
          <thead className="bg-indigo-100">
            <tr>
              <th className="border p-2">User</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Days</th>
              <th className="border p-2">Return</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Days Left</th>
            </tr>
          </thead>
          <tbody>
            {investments.map(inv => {
              const remaining = daysRemaining(inv.maturity_date);
              return (
                <tr key={inv._id}>
                  <td className="border p-2">{inv.user}</td>
                  <td className="border p-2">₦{inv.amount}</td>
                  <td className="border p-2">{inv.days}</td>
                  <td className="border p-2">₦{inv.expected_return}</td>
                  <td className="border p-2">{inv.status}</td>
                  <td className="border p-2">{remaining > 0 ? remaining : 0}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      {/* ================= WITHDRAWALS ================= */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Withdrawal Requests</h2>
        <table className="w-full border">
          <thead className="bg-red-100">
            <tr>
              <th className="border p-2">User</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {withdrawals.map(w => (
              <tr key={w._id}>
                <td className="border p-2">{w.user_id}</td>
                <td className="border p-2">₦{w.amount}</td>
                <td className="border p-2">{w.status}</td>
                <td className="border p-2 space-x-2">
                  {w.status === "pending" && (
                    <>
                      <button
                        onClick={() => approveWithdrawal(w._id)}
                        className="bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => rejectWithdrawal(w._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ================= WALLETS ================= */}
      <section>
        <h2 className="text-xl font-semibold mb-3">User Wallets</h2>
        <table className="w-full border">
          <thead className="bg-green-100">
            <tr>
              <th className="border p-2">User</th>
              <th className="border p-2">Bank</th>
              <th className="border p-2">Account Name</th>
              <th className="border p-2">Account Number</th>
            </tr>
          </thead>
          <tbody>
            {wallets.map(w => (
              <tr key={w._id}>
                <td className="border p-2">{w.username}</td>
                <td className="border p-2">{w.bank_name}</td>
                <td className="border p-2">{w.account_name}</td>
                <td className="border p-2">{w.account_number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminPage;
