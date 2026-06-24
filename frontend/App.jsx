import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';

function App() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [logs, setLogs] = useState([]); 

  const fetchLogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/logs');
      setLogs(response.data);
    } catch (error) {
      console.error("❌ Frontend Fetch Logs Error:", error.message);
    }
  };
  useEffect(() => {
    fetchLogs();
  }, []);

  const handleCheckSecurity = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post('http://localhost:5000/api/v1/check', { prompt });
      setResult(response.data);
      fetchLogs(); 
    } catch (error) {
      setResult({
        status: 'ERROR',
        triggeredBy: 'Network Failure',
        message: 'Could not connect to the GuardRail Security Server.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-start p-6 font-sans space-y-8">
      
      {/* 🛡️ UPPER SECTION: USER INPUT PORTAL */}
      <div className="max-w-4xl w-full bg-slate-800 rounded-xl shadow-2xl p-8 border border-slate-700">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2 flex items-center gap-2">
          🛡️ GuardRail.AI
        </h1>
        <p className="text-slate-400 text-sm mb-6">
          Enterprise Security Middleware - Secure LLM Prompt Validation Gateway
        </p>

        <form onSubmit={handleCheckSecurity} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Enter LLM Prompt / Query Box
            </label>
            <textarea
              className="w-full h-28 p-4 bg-slate-950 text-slate-100 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono text-sm placeholder-slate-600 resize-none"
              placeholder="Type your prompt here (e.g., test with passwords, secret keys or system bypass queries)..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-bold transition-all duration-200 ${
              loading 
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20'
            }`}
          >
            {loading ? 'Evaluating Core AI Safety Layers...' : 'Scan & Fire Security Check'}
          </button>
        </form>

        {result && (
          <div className="mt-6 pt-6 border-t border-slate-700 space-y-4">
            {result.status === 'SAFE' ? (
              <div className="p-4 bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 rounded-lg flex flex-col gap-1">
                <span className="font-bold text-lg flex items-center gap-2">🟢 PROMPT ALLOWED</span>
                <p className="text-sm text-slate-300">{result.message}</p>
              </div>
            ) : (
              <div className="p-4 bg-rose-950/50 border border-rose-500/30 text-rose-400 rounded-lg flex flex-col gap-1">
                <span className="font-bold text-lg flex items-center gap-2">🔴 ACTION BLOCKED</span>
                <p className="text-sm text-slate-300">{result.message}</p>
                <div className="mt-2 text-xs bg-black/30 p-2 rounded text-slate-400 font-mono">
                  Triggered By: <span className="text-rose-300 font-bold">{result.triggeredBy}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 📊 LOWER SECTION: REAL-TIME COMPLIANCE AUDIT DASHBOARD */}
      <div className="max-w-4xl w-full bg-slate-800 rounded-xl shadow-2xl p-8 border border-slate-700">
        <h2 className="text-xl font-bold text-slate-200 mb-2 flex items-center gap-2">
          📊 Security Audit Compliance Logs
        </h2>
        <p className="text-slate-400 text-xs mb-4">
          Live streaming audit trail straight from MongoDB Atlas Cloud Ecosystem.
        </p>

        <div className="overflow-x-auto rounded-lg border border-slate-700 bg-slate-950">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-900 border-b border-slate-700 text-slate-400 uppercase tracking-wider text-xs font-semibold">
                <th className="p-4">Prompt / User Query</th>
                <th className="p-4">Status</th>
                <th className="p-4">Trigger Source</th>
                <th className="p-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-slate-600 font-mono">
                    No compliance logs detected in the system repository.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log._id} className="hover:bg-slate-900/50 transition-colors duration-150">
                    <td className="p-4 font-mono text-xs max-w-xs truncate text-slate-300" title={log.userPrompt}>
                      {log.userPrompt}
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        log.status === 'SAFE' 
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/20' 
                          : 'bg-rose-950 text-rose-400 border border-rose-500/20'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-slate-400 text-xs">
                      {log.triggeredBy}
                    </td>
                    <td className="p-4 text-xs text-slate-500 font-mono">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

// React Mounting Engine
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

export default App;
