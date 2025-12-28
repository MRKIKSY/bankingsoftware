

import React, { useEffect, useState, useCallback } from "react";
import API from "../api";
import AdminApproveButton from "../components/AdminApproveButton";


export default function AdminPage({ token }) {
  const [users, setUsers] = useState([]);
  const [pendingTx, setPendingTx] = useState([]);
  const [pendingInvestments, setPendingInvestments] = useState([]);

  const [creditUser, setCreditUser] = useState("");
  const [creditAmount, setCreditAmount] = useState("");
  const [creditDesc, setCreditDesc] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);
  const [userDetail, setUserDetail] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);

  /* ================= FETCHERS ================= */
  const fetchAllUsers = useCallback(() => {
    fetch(`${API}/admin/users`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setUsers)
      .catch(console.error);
  }, [token]);

  const fetchPendingTx = useCallback(() => {
    fetch(`${API}/admin/pending`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setPendingTx)
      .catch(console.error);
  }, [token]);

  const fetchPendingInvestments = useCallback(() => {
    fetch(`${API}/invest/admin/pending`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setPendingInvestments)
      .catch(console.error);
  }, [token]);

  useEffect(() => {
    fetchAllUsers();
    fetchPendingTx();
    fetchPendingInvestments();
  }, [fetchAllUsers, fetchPendingTx, fetchPendingInvestments]);

  /* ================= MANUAL CREDIT ================= */
  const submitCredit = (e) => {
    e.preventDefault();
    if (!creditUser || !creditAmount) return;

    fetch(`${API}/admin/credit`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: creditUser,
        amount: parseFloat(creditAmount),
        description: creditDesc,
      }),
    })
      .then(() => {
        setCreditUser("");
        setCreditAmount("");
        setCreditDesc("");
        fetchAllUsers();
      })
      .catch(console.error);
  };

  /* ================= USER DETAIL ================= */
  const openUser = (username) => {
    setSelectedUser(username);
    setLoadingUser(true);

    fetch(`${API}/admin/user/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserDetail(data);
        setLoadingUser(false);
      })
      .catch(() => setLoadingUser(false));
  };

  const closeUser = () => {
    setSelectedUser(null);
    setUserDetail(null);
  };

  /* ================= UI ================= */
  return (
    <div className="p-8 space-y-12">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* MANUAL CREDIT */}
      <section className="bg-white p-6 rounded-xl shadow border">
        <h2 className="text-xl font-semibold mb-4">Manual Credit</h2>
        <form onSubmit={submitCredit} className="grid grid-cols-3 gap-4">
          <input
            className="border p-2 rounded"
            placeholder="Username"
            value={creditUser}
            onChange={(e) => setCreditUser(e.target.value)}
            required
          />
          <input
            className="border p-2 rounded"
            placeholder="Amount"
            type="number"
            value={creditAmount}
            onChange={(e) => setCreditAmount(e.target.value)}
            required
          />
          <input
            className="border p-2 rounded col-span-3"
            placeholder="Description (optional)"
            value={creditDesc}
            onChange={(e) => setCreditDesc(e.target.value)}
          />
          <button className="bg-green-600 text-white p-2 rounded col-span-3">
            Add Credit
          </button>
        </form>
      </section>

      {/* USERS OVERVIEW */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Users Overview</h2>
        <div className="overflow-x-auto rounded-xl border bg-white shadow">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Username</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Wallet</th>
                <th className="p-3">Credits</th>
                <th className="p-3">Debits</th>
                <th className="p-3">Balance</th>
                <th className="p-3">Transactions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr
                  key={u.username}
                  onClick={() => openUser(u.username)}
                  className="border-t hover:bg-gray-50 cursor-pointer"
                >
                  <td className="p-3 font-medium">{u.username}</td>
                  <td className="p-3">{u.email || "—"}</td>
                  <td className="p-3 truncate max-w-[220px]">{u.address || "—"}</td>
                  <td className="p-3 text-green-600">€{u.total_credits}</td>
                  <td className="p-3 text-red-600">€{u.total_debits}</td>
                  <td className="p-3 font-semibold">€{u.balance}</td>
                  <td className="p-3">{u.transactions_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* SEND REMINDER */}
<section>
  <h2 className="text-xl font-semibold mb-4">Send Reminder</h2>
  <div className="bg-white rounded-xl border shadow divide-y p-4 space-y-2">
    {users.map((u) => (
      <div key={u.username} className="flex justify-between items-center">
        <span>{u.username}</span>
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded"
          onClick={() => {
            fetch(`${API}/remind`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ username: u.username }),
            })
              .then((r) => r.json())
              .then((data) => {
                alert(data.message || "Reminder sent!");
              })
              .catch((err) => {
                console.error(err);
                alert("Failed to send reminder");
              });
          }}
        >
          Send Reminder
        </button>
      </div>
    ))}
  </div>
</section>

    
      </section>
   

      {/* PENDING WITHDRAWALS */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Pending Withdrawals</h2>
        <div className="bg-white rounded-xl border shadow divide-y">
          {pendingTx.map((tx) => (
            <div key={tx._id} className="flex justify-between items-center p-3">
              <span>{tx.user_id}</span>
              <span>€{tx.amount}</span>
              <AdminApproveButton
                label="Approve"
                onApprove={() =>
                  fetch(`${API}/admin/approve/${tx._id}`, {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}` },
                  }).then(fetchPendingTx)
                }
              />
            </div>
          ))}
        </div>
      </section>

      {/* PENDING INVESTMENTS */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Pending Investments</h2>
        <div className="bg-white rounded-xl border shadow divide-y">
          {pendingInvestments.map((inv) => (
            <div key={inv._id} className="flex justify-between items-center p-3">
              <span>{inv.user}</span>
              <span>€{inv.amount}</span>
              <span>{inv.days} days ({inv.percent}%)</span>
              <AdminApproveButton
                label="Approve"
                onApprove={() =>
                  fetch(`${API}/invest/admin/approve/${inv._id}`, {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}` },
                  }).then(() => {
                    fetchPendingInvestments();
                    fetchAllUsers();
                  })
                }
              />
            </div>
          ))}
        </div>
      </section>

      {/* USER MODAL */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-6xl rounded-xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between mb-4">
              <h2 className="text-2xl font-bold">User: {selectedUser}</h2>
              <button onClick={closeUser}>✕</button>
            </div>

            {loadingUser ? (
              <p>Loading...</p>
            ) : (
              userDetail && (
                <div className="space-y-2">
                  <p><b>Wallet:</b> {userDetail.user?.address || "-"}</p>
                  <p><b>Total Credits:</b> €{userDetail.credits || 0}</p>
                  <p><b>Total Debits:</b> €{userDetail.debits || 0}</p>
                  <p className="text-lg font-bold">Balance: €{userDetail.balance || 0}</p>

                  <h3 className="font-semibold mt-4">Transactions</h3>
                  <div className="border rounded-lg divide-y">
                    {(userDetail.transactions || []).map((tx) => (
                      <div key={tx._id} className="grid grid-cols-5 p-2 text-sm">
                        <span>{tx.type}</span>
                        <span>€{tx.amount}</span>
                        <span>{tx.status}</span>
                        <span className="truncate">{tx.description || "-"}</span>
                        <span className="text-gray-500">{new Date(tx.created_at).toLocaleDateString()}</span>
                      </div>
                    ))}
                  </div>

                  <h3 className="font-semibold mt-4">Approved Investments</h3>
                  <div className="border rounded-lg divide-y">
                    {(userDetail.investments || []).map((inv) => (
                      <div key={inv._id} className="grid grid-cols-4 p-2 text-sm">
                        <span>{inv.days} days</span>
                        <span>€{inv.amount}</span>
                        <span className="text-green-700">€{inv.expected_return}</span>
                        <span className="text-green-600 font-semibold">{inv.status.toUpperCase()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
