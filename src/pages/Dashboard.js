import React, { useEffect, useState, useCallback } from "react";
import API from "../api";
import Invest from "../components/Invest";
import Pay from "../components/pay";
import MoveBalance from "../components/MoveBalance";

export default function Dashboard({ token, user }) {
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [investments, setInvestments] = useState([]);

  const [showInvest, setShowInvest] = useState(false);
  const [showPay, setShowPay] = useState(false);
  const [showMove, setShowMove] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);

  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawMsg, setWithdrawMsg] = useState("");

  const [plan, setPlan] = useState(null);
  const [amount, setAmount] = useState("");
  const [msg, setMsg] = useState("");

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };

  /* ================= LOADERS ================= */

  const loadBalance = useCallback(async () => {
    const res = await fetch(`${API}/balance`, { headers });
    setBalance(await res.json());
  }, [token]);

  const loadTransactions = useCallback(async () => {
    const res = await fetch(`${API}/transactions`, { headers });
    setTransactions(await res.json());
  }, [token]);

  const loadInvestments = useCallback(async () => {
    const res = await fetch(`${API}/invest/my`, { headers });
    setInvestments(await res.json());
  }, [token]);

  useEffect(() => {
    loadBalance();
    loadTransactions();
    loadInvestments();
  }, [loadBalance, loadTransactions, loadInvestments]);

  /* ================= PAYSTACK ================= */

  function proceedToPay() {
    setMsg("");

    if (!plan || !amount || Number(amount) <= 0) {
      setMsg("Enter a valid amount");
      return;
    }

    setShowPay(true);
  }

  /* ================= WITHDRAW ================= */

  async function submitWithdraw() {
    setWithdrawMsg("");

    if (!withdrawAmount || Number(withdrawAmount) <= 0) {
      setWithdrawMsg("Enter a valid amount");
      return;
    }

    if (Number(withdrawAmount) > balance.balance) {
      setWithdrawMsg("Insufficient balance");
      return;
    }

    const res = await fetch(`${API}/withdraw`, {
      method: "POST",
      headers,
      body: JSON.stringify({ amount: Number(withdrawAmount) })
    });

    const data = await res.json();

    if (!res.ok) {
      setWithdrawMsg(data.error || "Withdrawal failed");
      return;
    }

    setWithdrawMsg("Withdrawal request submitted");
    setWithdrawAmount("");
    setShowWithdraw(false);

    loadBalance();
    loadTransactions();
  }

  /* ================= MOVE TO BALANCE ================= */

  async function moveToBalance(id) {
    const res = await fetch(`${API}/invest/move-to-balance/${id}`, {
      method: "POST",
      headers
    });

    const data = await res.json();
    setMsg(data.detail || "Updated");

    loadBalance();
    loadTransactions();
    loadInvestments();
  }

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-600">Welcome, {user.username}</p>
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-xl p-6 shadow-sm">
  <h2 className="text-lg font-semibold text-indigo-800 mb-3">
    📌 Platform Rules, Investment Terms & Bonuses
  </h2>

  <ul className="space-y-3 text-sm text-gray-700 leading-relaxed">
    <li>
      <b>1.</b> You are permitted to operate <b>ONLY ONE account</b>, which must be
      linked to your <b>personal bank details and account number</b>.  
      <span className="text-red-600 font-semibold">
        Multiple accounts will result in an immediate and permanent BAN.
      </span>
    </li>

    <li>
      <b>2.</b> You may create <b>multiple investments</b> at any time.  
      <ul className="list-disc ml-6 mt-1">
        <li>7-day investments mature exactly <b>7 days</b> after payment confirmation</li>
        <li>14-day investments mature exactly <b>14 days</b> after payment confirmation</li>
        <li>21-day investments mature exactly <b>21 days</b> after payment confirmation</li>
      </ul>
    </li>

    <li>
      <b>3.</b> 🎁 <b>₦5,000 SIGN-UP BONUS</b> — when you invest <b>₦20,000</b> or more
    </li>

    <li>
      <b>4.</b> 🎁 <b>₦10,000 SIGN-UP BONUS</b> — when you invest <b>₦50,000</b> or more
    </li>

    <li>
      <b>5.</b> 🎁 <b>₦15,000 SIGN-UP BONUS</b> — when you invest <b>₦100,000</b> or more
    </li>

    <li>
      <b>6.</b> To claim your <b>SIGN-UP BONUS</b>, ensure you have an
      <b> active investment</b>, then click the link below and message the admin
      with your <b>username</b>.
    </li>

    <li className="text-red-700 font-semibold">
      ⚠️ Withdrawals can ONLY be paid to the bank account you registered with.
      This is a <b>NO-FRAUD ZONE</b>.
    </li>

    <li className="text-gray-800 font-medium">
      By using this platform, you agree not to use our services for any fraudulent
      or illegal activities.
    </li>
  </ul>

  <div className="mt-4">
  <a
    href="https://wa.me/447591683924"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-800 transition"
  >
    📩 Contact Admin to Claim Bonus
  </a>
</div>

</div>


        {/* BALANCES */}
        {balance && (
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-gray-500">Available</p>
              <p className="text-2xl font-bold text-green-700">
                ₦{balance.balance.toLocaleString()}
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-gray-500">Locked</p>
              <p className="text-2xl font-bold text-orange-600">
                ₦{balance.locked_balance.toLocaleString()}
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-gray-500">Total Credits</p>
              ₦{balance.total_credits.toLocaleString()}
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-gray-500">Total Debits</p>
              ₦{balance.total_debits.toLocaleString()}
            </div>
          </div>
        )}

        {/* ACTION BUTTONS */}
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() => setShowInvest(true)}
            className="bg-indigo-700 text-white px-6 py-3 rounded-xl"
          >
            Invest
          </button>

          <button
            onClick={() => setShowMove(true)}
            className="bg-green-700 text-white px-6 py-3 rounded-xl"
          >
            Move Balance
          </button>

          <button
            onClick={() => setShowWithdraw(true)}
            className="bg-red-600 text-white px-6 py-3 rounded-xl"
          >
            Withdraw
          </button>
        </div>

        {/* WITHDRAW MODAL */}
        {showWithdraw && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Withdraw Funds</h2>

              <input
                className="border w-full px-3 py-2 mb-3"
                placeholder="Amount (₦)"
                value={withdrawAmount}
                onChange={e => setWithdrawAmount(e.target.value)}
              />

              {withdrawMsg && (
                <p className="text-sm text-red-600 mb-2">
                  {withdrawMsg}
                </p>
              )}

              <div className="flex gap-3">
                <button
                  onClick={submitWithdraw}
                  className="flex-1 bg-red-600 text-white py-2 rounded"
                >
                  Submit
                </button>

                <button
                  onClick={() => setShowWithdraw(false)}
                  className="flex-1 border py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* INVEST MODAL */}
        {showInvest && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-md">
              <Invest
                onClose={() => setShowInvest(false)}
                onSelect={(days, percent) =>
                  setPlan({ days, percent })
                }
              />

              {plan && (
                <>
                  <input
                    className="border w-full px-3 py-2 mt-4"
                    placeholder="Amount (₦)"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                  />

                  <button
                    onClick={proceedToPay}
                    className="w-full bg-green-600 text-white py-3 rounded mt-4"
                  >
                    Proceed to Pay
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {showMove && balance && (
          <MoveBalance
            token={token}
            balance={balance.balance}
            onClose={() => setShowMove(false)}
            onSuccess={() => {
              loadBalance();
              loadTransactions();
              loadInvestments();
            }}
          />
        )}

        {showPay && (
          <Pay
            token={token}
            amount={Number(amount)}
            days={plan.days}
            percent={plan.percent}
            onClose={() => setShowPay(false)}
          />
        )}

        {/* INVESTMENTS */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">My Investments</h2>

          {investments.length === 0 ? (
            <p className="text-gray-500">No investments</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th>Plan</th>
                  <th>Amount</th>
                  <th>Return</th>
                  <th>Status</th>
                  <th>Maturity</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {investments.map(inv => (
                  <tr key={inv._id} className="border-t">
                    <td>{inv.days} days</td>
                    <td>₦{inv.amount.toLocaleString()}</td>
                    <td className="text-green-700">
                      ₦{inv.expected_return?.toLocaleString()}
                    </td>
                    <td>{inv.status}</td>
                    <td>
                      {new Date(inv.maturity_date).toLocaleString()}
                    </td>
                    <td>
                      {inv.status === "completed" &&
                        !inv.moved_to_balance && (
                          <button
                            onClick={() => moveToBalance(inv._id)}
                            className="bg-indigo-600 text-white px-3 py-1 rounded"
                          >
                            Move to Balance
                          </button>
                        )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* TRANSACTIONS */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Transactions</h2>

          {transactions.length === 0 ? (
            <p className="text-gray-500">No transactions</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(tx => (
                  <tr key={tx._id} className="border-t">
                    <td>{tx.type}</td>
                    <td>₦{tx.amount.toLocaleString()}</td>
                    <td>{tx.status}</td>
                    <td>{new Date(tx.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {msg && <p className="text-center text-blue-600">{msg}</p>}
      </div>
    </div>
  );
}
